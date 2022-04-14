// open_close modal login
const login = document.querySelector(".js_login");
const modal_login = document.querySelector(".js_modal");
const close_login = document.querySelector(".js_modalClose");
const js_modal = document.querySelector(".js_modal_login");
function showModalLogin() {
	modal_login.classList.add("open");
}
function closeModalLogin() {
	modal_login.classList.remove("open");
}
function modal_event() {
	event.stopPropagation();
}
login.addEventListener("click", showModalLogin);
close_login.addEventListener("click", closeModalLogin);
modal_login.addEventListener("click", closeModalLogin);
js_modal.addEventListener("click", modal_event);
//login admin
const form = document.querySelector(".js_form");
form.addEventListener("submit", () => {
	const ac = form[0].value;
	const pass = form[1].value;
	if ((ac == "admin") & (pass == "admin")) {
		form.setAttribute("action", "./admin.html");
	}
});
//open_close modal register

const register = document.querySelector(".js_register");
const modal_register = document.querySelector(".modal1");
const close_register = document.querySelector(".js_close_register");
const register_contern = document.querySelector(".js_modal_register");
function showModalRegister() {
	modal_register.classList.add("open");
}
function closeModalRegister() {
	modal_register.classList.remove("open");
}
function event_modal() {
	event.stopPropagation();
}
register.addEventListener("click", showModalRegister);
close_register.addEventListener("click", closeModalRegister);
modal_register.addEventListener("click", closeModalRegister);
register_contern.addEventListener("click", event_modal);

// scroll to top
let BackTop = document.querySelector(".link_back_home");
window.addEventListener("scroll", () => {
	let scrollH = window.pageYOffset;
	if (scrollH >= 100) {
		BackTop.classList.add("js_back_home");
	} else {
		BackTop.classList.remove("js_back_home");
	}
});
//click search
let search = document.querySelector(".js_search");
let inpsearch = document.querySelector(".js_input_search");
let contai = document.querySelector(".js_contai_search");
// function ShowSearch(){}
search.addEventListener("click", () => {
	inpsearch.classList.toggle("js_show_search");
});
document.addEventListener("click", () => {
	inpsearch.classList.remove("js_show_search");
});
contai.addEventListener("click", () => {
	event.stopPropagation();
});

// ratings
const stars = document.querySelectorAll(".js_star");
stars.forEach((star) => {
	star.addEventListener("mouseover", (e) => {
		e.target.classList.add("js_yello");
		let valu = parseInt(e.target.getAttribute("value"));
		stars.forEach((st) => {
			let vast = st.getAttribute("value");
			if (vast < valu) {
				st.classList.add("js_yello");
			}
		});
	});
	star.addEventListener("mouseout", (e) => {
		e.target.classList.remove("js_yello");
		let val = parseInt(e.target.getAttribute("value"));
		stars.forEach((st) => {
			let vast = st.getAttribute("value");
			if (vast < val) {
				st.classList.remove("js_yello");
			}
		});
	});
});

// books rating
// const book_rating = document.querySelectorAll(".js_menu_ratings li");

// book_rating.forEach((rating) => {
// 	rating.addEventListener("mouseout", (e) => {});
// });
// menu classify
// const classify = document.querySelectorAll(".js_classify li a");
// classify.forEach((cls) => {
// 	cls.addEventListener("click", (e) => {
// 		let eclas = e.target;

// 		classify.forEach((clss) => {
// 			clss.classList.remove("js_clas");
// 			clss.classList.remove("all");
// 		});
// 		eclas.classList.add("js_clas");
// 	});
// });

// const year_content = document.querySelector(".js_year_pub");
// const year_pub = document.querySelector(".js_year");
// year_pub.addEventListener("click", () => {
// 	year_content.classList.toggle("js_show_year");
// 	let year_class = year_content.getAttribute("class");
// 	if (year_class.includes("js_show_year")) {
// 		year_pub.innerHTML = "Year of Publication <i class='bx bx-chevron-up'></i>";
// 	} else {
// 		year_pub.innerHTML = "Year of Publication <i class='bx bx-chevron-down'>";
// 	}
// });

// const titlePub = document.querySelector(".js_title_pub");
// const pub_content = document.querySelector(".js_content_pub");
// titlePub.addEventListener("click", () => {
// 	pub_content.classList.toggle("js_show_publisher");
// 	let pub_class = pub_content.getAttribute("class");
// 	if (pub_class.includes("js_show_publisher")) {
// 		titlePub.innerHTML = "Publisher <i class='bx bx-chevron-up'></i>";
// 	} else {
// 		titlePub.innerHTML = "Publisher <i class='bx bx-chevron-down'>";
// 	}
// });

// // books page

// const pages = document.querySelectorAll(".js_page");
// pages.forEach((page) => {
// 	page.addEventListener("click", (e) => {
// 		pages.forEach((pa) => {
// 			pa.classList.remove("page1");
// 		});
// 		e.target.classList.add("page1");
// 	});
// });
