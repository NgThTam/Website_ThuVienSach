import {
	collection,
	getDocs,
	addDoc,
	doc,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

import db from "./firebase.js";

function renderB(book) {
	return `<div class="detail_img">
                <img src="${book.ImgB}" alt="">
            </div>
            <div class="detail_info">
                <div class="title_info">
                    <h1 class="detail_titleBook">${book.NameB}</h1>
                </div>
                <div class="detail_rating">
                    <ul class="js_detail_star detail_list_star">
                        <li><i class='bx bxs-star star_full'></i></li>
                        <li><i class='bx bxs-star star_full'></i></li>
                        <li><i class='bx bxs-star star_full'></i></li>
                        <li><i class='bx bxs-star star_full'></i></li>
                        <li><i class='bx bx-star star_fill' ></i></li>
                    </ul>
                </div>
                <div class="content_info">
                    <div class="detail_aut_book" style="color: #897c7c;">By: <span>${book.Author}</span></div>
                    <div class="detail_aut_book" style="color: #897c7c;">Year-Of-Publication: <span>${book.YearPub}</span></div>
                    <div class="detail_aut_book" style="color: #897c7c;">Publisher: <span>${book.Publiser}</span></div>
                    <div class="detail_share">
                        <h1 class="detail_titleBook">Share</h1>
                        <div class="list_share">
                            <i class='bx bxl-facebook-circle fb'></i>
                            <i class='bx bxl-messenger mes'></i>
                            <i class='bx bxl-twitter tw'></i>
                            <i class='bx bx-link-alt lin' ></i>
                        </div>
                    </div>
                </div>             
            </div>`;
}

const fetchBooks = async () => {
	const books = [];
	const querySnapshot = await getDocs(collection(db, "books"));
	querySnapshot.forEach((doc) => {
		books.push(doc.data());
	});

	return books;
};

fetchBooks().then((books) => {
	const detailbook = books.map((book) => {
		if (book.IDb === localStorage.getItem("id_book")) {
			return renderB(book);
		}
	});
	const divdetail = document.getElementById("js_detail");
	detailbook.forEach((abook) => {
		if (abook != undefined) {
			divdetail.innerHTML = abook;
		}
	});
});

// console.log(localStorage.getItem("id_book"));

const fetchRatings = async () => {
	const ratings = [];
	const querySnapshot = await getDocs(collection(db, "ratings"));
	querySnapshot.forEach((doc) => {
		ratings.push(doc.data());
	});

	const detailbook = ratings.filter(
		(rating) => rating.IDb === localStorage.getItem("id_book")
	);
	let Star = mean(detailbook);

	const showStar = document.querySelector(".js_detail_star");
	// console.log(Star);
	if (Star <= 2) {
		showStar.innerHTML = `<li><i class='bx bxs-star star_full'></i></li>
	                        <li><i class='bx bx-star star_fill' ></i></li>
	                        <li><i class='bx bx-star star_fill' ></i></li>
	                        <li><i class='bx bx-star star_fill' ></i></li>
	                        <li><i class='bx bx-star star_fill' ></i></li>`;
	} else if (Star <= 4) {
		showStar.innerHTML = `<li><i class='bx bxs-star star_full'></i></li>
	                        <li><i class='bx bxs-star star_full'></i></li>
	                        <li><i class='bx bx-star star_fill' ></i></li>
	                        <li><i class='bx bx-star star_fill' ></i></li>
	                        <li><i class='bx bx-star star_fill' ></i></li>`;
	} else if (Star <= 6) {
		showStar.innerHTML = `<li><i class='bx bxs-star star_full'></i></li>
	                        <li><i class='bx bxs-star star_full'></i></li>
	                        <li><i class='bx bxs-star star_full'></i></li>
	                        <li><i class='bx bx-star star_fill' ></i></li>
	                        <li><i class='bx bx-star star_fill' ></i></li>`;
	} else if (Star <= 8) {
		showStar.innerHTML = `<li><i class='bx bxs-star star_full'></i></li>
	                        <li><i class='bx bxs-star star_full'></i></li>
	                        <li><i class='bx bxs-star star_full'></i></li>
	                        <li><i class='bx bxs-star star_full'></i></li>
	                        <li><i class='bx bx-star star_fill' ></i></li>`;
	} else {
		showStar.innerHTML = `<li><i class='bx bxs-star star_full'></i></li>
	                        <li><i class='bx bxs-star star_full'></i></li>
	                        <li><i class='bx bxs-star star_full'></i></li>
	                        <li><i class='bx bxs-star star_full'></i></li>
	                        <li><i class='bx bxs-star star_full'></i></li>`;
	}
};

const mean = (arr) => {
	let smean = 0;
	const length = arr.length;
	arr.forEach((value) => {
		smean += value.Star;
	});
	return smean / length;
};

fetchRatings();
