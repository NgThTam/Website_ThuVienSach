const classify = document.querySelectorAll(".js_classify li a");
classify.forEach((cls) => {
	cls.addEventListener("click", (e) => {
		let eclas = e.target;

		classify.forEach((clss) => {
			clss.classList.remove("js_clas");
			clss.classList.remove("all");
		});
		eclas.classList.add("js_clas");
	});
});

const year_content = document.querySelector(".js_year_pub");
const year_pub = document.querySelector(".js_year");
year_pub.addEventListener("click", () => {
	year_content.classList.toggle("js_show_year");
	let year_class = year_content.getAttribute("class");
	if (year_class.includes("js_show_year")) {
		year_pub.innerHTML = "Year of Publication <i class='bx bx-chevron-up'></i>";
	} else {
		year_pub.innerHTML = "Year of Publication <i class='bx bx-chevron-down'>";
	}
});

const titlePub = document.querySelector(".js_title_pub");
const pub_content = document.querySelector(".js_content_pub");
titlePub.addEventListener("click", () => {
	pub_content.classList.toggle("js_show_publisher");
	let pub_class = pub_content.getAttribute("class");
	if (pub_class.includes("js_show_publisher")) {
		titlePub.innerHTML = "Publisher <i class='bx bx-chevron-up'></i>";
	} else {
		titlePub.innerHTML = "Publisher <i class='bx bx-chevron-down'>";
	}
});

// books page color

const pages = document.querySelectorAll(".js_page");
pages.forEach((page) => {
	page.addEventListener("click", (e) => {
		pages.forEach((pa) => {
			pa.classList.remove("page1");
		});
		e.target.classList.add("page1");
	});
});

// books page/page*3
const srcshows = document.querySelectorAll(".js_srcs");

pages.forEach((pg) => {
	pg.addEventListener("click", () => {
		srcshows.forEach((srcshow) => {
			if (pg.id === srcshow.dataset.page) {
				srcshow.classList.add("books_show");
			} else {
				srcshow.classList.remove("books_show");
			}
		});
	});
});
