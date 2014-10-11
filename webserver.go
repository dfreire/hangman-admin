package main

import (
	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
	"net/http"
	"strings"
)

func main() {
	m := martini.Classic()
	m.Use(render.Renderer())

	m.Get("/", func(req *http.Request, r render.Render) {
		r.Redirect("/sign-in")
	})

	m.Get("/sign-out", func(req *http.Request, r render.Render) {
		r.Redirect("/")
	})

	m.Get("/sign-in", func(req *http.Request, r render.Render) {
		if isSpider(req) {
			renderSpider(r)
		} else {
			renderPublic(r)
		}
	})

	m.Get("/reset-password", func(req *http.Request, r render.Render) {
		if isSpider(req) {
			renderSpider(r)
		} else {
			renderPublic(r)
		}
	})

	m.Get("/admin/**", func(req *http.Request, r render.Render) {
		if isSpider(req) {
			r.Redirect("/")
		} else {
			renderAdmin(r)
		}
	})

	m.Run()
}

func isSpider(req *http.Request) bool {
	return strings.Contains(req.URL.RawQuery, "_escaped_fragment_")
}

func renderSpider(r render.Render) {
	r.HTML(200, "spider-template", "")
}

func renderPublic(r render.Render) {
	r.HTML(200, "public-template", "")
}

func renderAdmin(r render.Render) {
	r.HTML(200, "admin-template", "")
}
