package main

import (
	"encoding/json"
	"net/http"
	"os"
	"path"
	"strings"

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
	router.Get("/{page}", hs.IndexHandler)
	router.Post("/sign-up", hs.SignUpHandler)
	router.Post("/sign-in", hs.SignInHandler)
	router.Post("/verify-account", hs.VerifyAccountHandler)

	n := negroni.Classic()
	n.UseHandler(router)
	n.Run(":3001")
}

type Response struct {
	Ok   bool        `json:"ok"`
	Data interface{} `json:"data,omitempty"`
	Err  string      `json:"err,omitempty"`
}

func sendOkResponse(res http.ResponseWriter, data interface{}) {
	res.Header().Set("Content-Type", "application/json")
	response := Response{
		Ok:   true,
		Data: data,
	}
	if err := json.NewEncoder(res).Encode(&response); err != nil {
		http.Error(res, err.Error(), http.StatusInternalServerError)
		return
	}
}

func sendErrorResponse(res http.ResponseWriter, message string) {
	res.Header().Set("Content-Type", "application/json")
	response := Response{
		Ok:  false,
		Err: message,
	}
	if err := json.NewEncoder(res).Encode(&response); err != nil {
		http.Error(res, err.Error(), http.StatusInternalServerError)
		return
	}
}

type handlers struct {
	mailService mail.MailService
	authService auth.AuthService
}

func (self *handlers) IndexHandler(res http.ResponseWriter, req *http.Request) {
	fp := path.Join("public", "index.html")
	http.ServeFile(res, req, fp)
}

func (self *handlers) SignUpHandler(res http.ResponseWriter, req *http.Request) {
	params := make(map[string]interface{})
	err := json.NewDecoder(req.Body).Decode(&params)
	if err != nil {
		http.Error(res, err.Error(), http.StatusInternalServerError)
		return
	}

	userEmail := params["email"].(string)
	password := params["password"].(string)
	callback := params["callback"].(string)

	verificationToken, err := self.authService.SignUp("guijs", userEmail, password)
	if err != nil {
		sendErrorResponse(res, err.Error())
		return
	}

	e := email.NewEmail()
	e.From = "puffinframework@mailinator.com"
	e.To = []string{userEmail}
	e.Subject = "Welcome to PuffinFramework"

	html := strings.Join([]string{"<a href='http://localhost:3001/", callback, "/", verificationToken, "'>verify your account</a>"}, "")
	e.HTML = []byte(html)

	if err := self.mailService.Send(e); err != nil {
		http.Error(res, err.Error(), http.StatusInternalServerError)
		return
	}

	sendOkResponse(res, verificationToken)
}

func (self *handlers) SignInHandler(res http.ResponseWriter, req *http.Request) {
	params := make(map[string]interface{})
	err := json.NewDecoder(req.Body).Decode(&params)
	if err != nil {
		http.Error(res, err.Error(), http.StatusInternalServerError)
		return
	}

	userEmail := params["email"].(string)
	password := params["password"].(string)

	sessionToken, err := self.authService.SignIn("guijs", userEmail, password)
	if err != nil {
		sendErrorResponse(res, err.Error())
		return
	}

	sendOkResponse(res, sessionToken)
}

func (self *handlers) VerifyAccountHandler(res http.ResponseWriter, req *http.Request) {
	params := make(map[string]interface{})
	err := json.NewDecoder(req.Body).Decode(&params)
	if err != nil {
		http.Error(res, err.Error(), http.StatusInternalServerError)
		return
	}

	verificationToken := params["token"].(string)

	err = self.authService.VerifyAccount(verificationToken)
	if err != nil {
		sendErrorResponse(res, err.Error())
		return
	}

	sendOkResponse(res, verificationToken)
}
