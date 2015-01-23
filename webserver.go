package main

import (
	"encoding/json"
	"net/http"
	"os"

	"github.com/codegangsta/negroni"
	"github.com/gorilla/pat"
	"github.com/jordan-wright/email"
	"github.com/puffinframework/auth"
	"github.com/puffinframework/config"
	"github.com/puffinframework/event"
	"github.com/puffinframework/mail"
	"github.com/puffinframework/snapshot"
)

func main() {
	os.Setenv(config.ENV_VAR_NAME, config.MODE_TEST)
	es := event.NewLeveldbStore()
	defer es.MustDestroy()
	ss := snapshot.NewLeveldbStore()
	defer ss.MustDestroy()

	hs := &handlers{
		mailService: mail.NewMailService(),
		authService: auth.NewAuthService(es, ss),
	}

	router := pat.New()
	router.Post("/sign-up", hs.SignUpHandler)

	n := negroni.Classic()
	n.UseHandler(router)
	n.Run(":3001")
}

type handlers struct {
	mailService mail.MailService
	authService auth.AuthService
}

func (self *handlers) SignUpHandler(res http.ResponseWriter, req *http.Request) {
	params := make(map[string]interface{})
	err := json.NewDecoder(req.Body).Decode(&params)
	if err != nil {
		http.Error(res, err.Error(), http.StatusInternalServerError)
		return
	}

	paramEmail := params["email"].(string)
	paramPassword := params["password"].(string)

	verificationToken, err := self.authService.SignUp("guijs", paramEmail, paramPassword)
	if err != nil {
		http.Error(res, err.Error(), http.StatusInternalServerError)
		return
	}

	e := email.NewEmail()
	e.From = "puffinframework@mailinator.com"
	e.To = []string{paramEmail}
	e.Subject = "Welcome to PuffinFramework"
	e.HTML = []byte(verificationToken)

	if err := self.mailService.Send(e); err != nil {
		http.Error(res, err.Error(), http.StatusInternalServerError)
		return
	}

	res.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(res).Encode(verificationToken)
	if err != nil {
		http.Error(res, err.Error(), http.StatusInternalServerError)
		return
	}
}
