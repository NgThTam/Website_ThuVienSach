import {
	collection,
	getDocs,
	addDoc,
	doc,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// import pandas from "https://cdn.jsdelivr.net/npm/pandas-js@0.2.4/dist/index.min.js";

import db from "./firebase.js";

const fetchBooks = async () => {
	const books = [];
	const querySnapshot = await getDocs(collection(db, "books"));
	querySnapshot.forEach((doc) => {
		// doc.data() is never undefined for query doc snapshots
		// console.log(doc.id, " => ", doc.data());
		books.push(doc.data());
	});

	// const docRef = await addDoc(collection(db, "books"), {
	// 	IDb: "empty",
	// 	NameB: "",
	// 	Author: "",
	// 	YearPub: "",
	// 	Publiser: "",
	// 	ImgB: "",
	// });
	// console.log(books);

	return books;
};

fetchBooks()
	.then((books) => {
		const showBook = document.getElementById("js_show_book");

		const abook = books.map((book) => {
			return `<div id="${book.IDb}" class="books_abook">
					<div class="abook_image">
						<img src="${book.ImgB}" alt="" class="abook_img">
						<div class="abook_img_ho">
							<a data-id="${book.IDb}" class="js_lbk" href="#"><i data-id="${book.IDb}" class='bx bx-show'></i></a>
							<a href="#" class="a2"><i class='bx bx-heart'></i></a>
						</div>
					</div>
					<div class="abook_inf">
						<a href="./DetailBooks.html" class="title_book">${book.NameB}</a>
						<div class="aut_book">By: <span>${book.Author}</span></div>
					</div>
				</div>`;
		});
		showBook.innerHTML = abook;
	})
	.then(() => {
		const abooks = document.querySelectorAll(".js_lbk");
		abooks.forEach((abook) => {
			abook.addEventListener("click", (e) => {
				console.log(e.target.dataset.id);
			});
		});
	});
