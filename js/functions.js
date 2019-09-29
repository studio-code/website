---
---
const listener = e => {
	let logo = document.querySelector(".logo > .icon")
	let nav = document.querySelector("nav")
	let mediaQueryList = window.matchMedia("(max-width: 1000px)");

	if (window.scrollY >= window.innerHeight / 2) {
		logo.style["z-index"] = 10;
		logo.style.position = "fixed"
		logo.style.top = "12.5px"
		logo.style.left = "10px"
		logo.style.width = "50px"
		logo.style.height = "50px"
		logo.style.border = "1px solid #333"
		logo.style["border-radius"] = "22.37%"

		nav.style["border-bottom"] = "2px solid #333";
		nav.style.background = "rgba(0, 0, 0, 0.75)";
		nav.style["-webkit-backdrop-filter"] = "saturate(180%) blur(20px)";
		nav.style["backdrop-filter"] = "saturate(180%) blur(20px)";
	} else {
		logo.style["z-index"] = 0;
		logo.style.position = "static"
		if (mediaQueryList.matches) {
			logo.style.width = "200px"
			logo.style.height = "200px"
		} else {
			logo.style.width = "400px"
			logo.style.height = "400px"
		}
		logo.style.border = "none"
		logo.style["border-radius"] = "none"
		nav.style["border-bottom"] = "none";
		nav.style.background = "transparent";
		nav.style["-webkit-backdrop-filter"] = "none";
		nav.style["backdrop-filter"] = "none";
	}
	// compute height
	const body = document.body
    const html = document.documentElement;
	const height = Math.max( body.scrollHeight, body.offsetHeight,
                       html.clientHeight, html.scrollHeight, html.offsetHeight ) - window.innerHeight
	if (window.scrollY >= height - 10) {
		nav.style.background = "rgba(255, 255, 255, 0.75)";
		nav.style["border-bottom"] = "2px solid #eee";
		nav.querySelectorAll(".list > a")[0].style.color = "#333"
		nav.querySelectorAll(".list > a")[1].style.color = "#333"
	} else {
		nav.querySelectorAll(".list > a")[0].style.color = "#eee"
		nav.querySelectorAll(".list > a")[1].style.color = "#eee"
	}
}
window.addEventListener("scroll", listener)
document.querySelector(".logo").addEventListener("click", e => {
	window.location = "{{site.download}}"
})
document.querySelector('.year').innerHTML = new Date().getFullYear()

listener()


class Video {
	constructor() {
		this.state = {
			video: false
		}
		document.querySelector(".slogan.video").addEventListener("click", e => {
			this.state = {
				video: !this.state.video
			}
			this.changeHandler()
		})
		document.querySelector(".yt").addEventListener("click", e => {
			this.state = {
				video: !this.state.video
			}
			this.changeHandler()
		})
	}
	changeHandler() {
		let display = "none"
		if (this.state.video) {
			display = "flex"
		}
		document.querySelector(".yt").style.display = display
	}
}
const v = new Video()
