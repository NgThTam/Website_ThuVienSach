const adlis = document.querySelectorAll(".js_admin_li");
const scrs = document.querySelectorAll(".js_scr");
adlis.forEach((adli) => {
	adli.addEventListener("click", () => {
		// const li = e.target;
		adlis.forEach((adl) => {
			adl.classList.remove("js_admin_active");
		});
		adli.classList.add("js_admin_active");
		scrs.forEach((scr) => {
			scr.classList.remove("js_show_scr");
		});
		let id = adli.dataset.id;
		let shscr = document.getElementById(id);
		shscr.classList.add("js_show_scr");
	});
});
