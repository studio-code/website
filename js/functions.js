---
---
window.addEventListener("scroll", e => {
	let logo = document.querySelector(".logo > .icon")
	if (window.scrollY > window.innerHeight / 2) {
		logo.style["z-index"] = 10;
		logo.style.position = "fixed"
		logo.style.top = "12.5px"
		logo.style.left = "10px"
		logo.style.width = "50px"
		logo.style.height = "50px"
		logo.style.border = "1px solid #333"
		logo.style["border-radius"] = "22.37%"
		document.querySelector("nav").style.opacity = "1"
	} else {
		logo.style["z-index"] = 0;
		logo.style.position = "static"
		logo.style.width = "400px"
		logo.style.height = "400px"
		logo.style.border = "none"
		logo.style["border-radius"] = "none"
		document.querySelector("nav").style.opacity = "0"
	}
})
document.querySelector(".logo").addEventListener("click", e => {
	window.location = "{{site.download}}"
})
