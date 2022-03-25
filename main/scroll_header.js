// Scroll fixed header
const header = document.querySelector(".js_header");
let headerHeight = header.clientHeight;
window.addEventListener("scroll", function () {
	let scrollHeight = window.pageYOffset;
	if (scrollHeight > headerHeight - 10) {
		header.classList.add("js_scroll_header");
	} else {
		header.classList.remove("js_scroll_header");
	}
});
