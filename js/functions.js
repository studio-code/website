---
---
window.addEventListener("scroll", e => {
	let logo = document.querySelector(".logo > .icon")
	let nav = document.querySelector("nav")
	if (window.scrollY > window.innerHeight / 2) {
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
		logo.style.width = "400px"
		logo.style.height = "400px"
		logo.style.border = "none"
		logo.style["border-radius"] = "none"

		nav.style["border-bottom"] = "none";
		nav.style.background = "transparent";
		nav.style["-webkit-backdrop-filter"] = "none";
		nav.style["backdrop-filter"] = "none";
	}
})
document.querySelector(".logo").addEventListener("click", e => {
	window.location = "{{site.download}}"
})
