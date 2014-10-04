package main

import (
	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
)

func main() {
	m := martini.Classic()
	m.Use(render.Renderer())

	m.Get("/", func(r render.Render) {
        r.Redirect("signin")
	})

	m.Get("/signin", func(r render.Render) {
		r.HTML(200, "signin", "", render.HTMLOptions{Layout: "_signedout"})
	})

	m.Get("/signout", func(r render.Render) {
        r.Redirect("signin")
	})

	m.Get("/forgot_password", func(r render.Render) {
		r.HTML(200, "forgot_password", "", render.HTMLOptions{Layout: "_signedout"})
	})

	m.Get("/dashboard", func(r render.Render) {
		r.HTML(200, "dashboard", "", render.HTMLOptions{Layout: "_signedin"})
	})

	m.Get("/games", func(r render.Render) {
		r.HTML(200, "games", "", render.HTMLOptions{Layout: "_signedin"})
	})

	m.Run()
}
