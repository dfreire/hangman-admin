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

	m.Get("**", func(req *http.Request, r render.Render) {
		if isSpider(req) {
			renderSpider(r)
		} else {
			renderBrowser(r)
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

func renderBrowser(r render.Render) {
	r.HTML(200, "browser-template", "")
}
