package main

import (
	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
)

func main() {
	m := martini.Classic()
	m.Use(render.Renderer())

	m.Get("/", func(r render.Render) {
        r.Redirect("sign-in")
	})

	m.Get("/sign-in", func(r render.Render) {
		r.HTML(200, "sign-in", "", render.HTMLOptions{Layout: "_signed-out"})
	})

	m.Get("/sign-out", func(r render.Render) {
        r.Redirect("sign-in")
	})

	m.Get("/reset-password", func(r render.Render) {
		r.HTML(200, "reset-password", "", render.HTMLOptions{Layout: "_signed-out"})
	})

	m.Get("/dashboard", func(r render.Render) {
		r.HTML(200, "dashboard", "", render.HTMLOptions{Layout: "_signed-in"})
	})

	m.Get("/games", func(r render.Render) {
		r.HTML(200, "games", "", render.HTMLOptions{Layout: "_signed-in"})
	})

	m.Run()
}
