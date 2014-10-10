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
        r.Redirect("/sign-in")
    })

	m.Get("/sign-in", func(req *http.Request, r render.Render) {
        if isSpider(req) {
            r.Status(200)
        } else {
            r.HTML(200, "_signed-out", "")
        }
	})

	m.Get("/reset-password", func(req *http.Request, r render.Render) {
        if isSpider(req) {
            r.Status(200)
        } else {
            r.HTML(200, "_signed-out", "")
        }
	})

	m.Get("/admin/**", func(req *http.Request, r render.Render) {
        if isSpider(req) {
            r.Status(200)
        } else {
            r.HTML(200, "_signed-in", "")
        }
	})

	m.Run()
}

func isSpider(req *http.Request) bool {
    return strings.Contains(req.URL.RawQuery, "_escaped_fragment_")
}
