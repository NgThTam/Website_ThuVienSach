import {
	collection,
	getDocs,
	addDoc,
	doc,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

import db from "./firebase.js";

const fetchBooks = async () => {
	const books = [];
	const querySnapshot = await getDocs(collection(db, "books"));
	querySnapshot.forEach((doc) => {
		books.push(doc.data());
	});

	const detailbook = books.map((book) => {
		if (book.IDb === localStorage.getItem("id_book")) {
			return `<div class="detail_img">
                            <img src="${book.ImgB}" alt="">
                        </div>
                        <div class="detail_info">
                            <div class="title_info">
                                <h1 class="detail_titleBook">${book.NameB}</h1>
                            </div>
                            <div class="detail_rating">
                                <ul class="detail_list_star">
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
	});
	const divdetail = document.getElementById("js_detail");
	detailbook.forEach((abook) => {
		if (abook != undefined) {
			divdetail.innerHTML = abook;
		}
	});
};

fetchBooks();

// console.log(localStorage.getItem("id_book"));
