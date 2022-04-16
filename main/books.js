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
const showBook = document.getElementById("js_show_book");
const renderBook = (book) => {
	return `<div id="${book.IDb}" class="books_abook">
				<div class="abook_image">
					<img src="${book.ImgB}" alt="" class="abook_img">
					<div class="abook_img_ho">
						<a data-id="${book.IDb}" class="js_lbk" href="./DetailBooks.html"><i data-id="${book.IDb}" class='bx bx-show'></i></a>
						<a href="#" class="a2"><i class='bx bx-heart'></i></a>
					</div>
				</div>
				<div class="abook_inf">
					<a href="./DetailBooks.html" class="title_book">${book.NameB}</a>
					<div class="aut_book">By: <span>${book.Author}</span></div>
				</div>
			</div>`;
};
fetchBooks()
	.then((books) => {
		const abook = books.map((book) => {
			return renderBook(book);
		});
		showBook.innerHTML = abook.join(" ");
		return books;
	})
	.then((ab) => {
		const abooks = document.querySelectorAll(".js_lbk");
		abooks.forEach((abook) => {
			abook.addEventListener("click", (e) => {
				localStorage.setItem("id_book", e.target.dataset.id);
			});
		});
		return ab;
	})
	.then((ab) => {
		//show all
		const bookAll = document.querySelector(".js_all");
		bookAll.addEventListener("click", () => {
			const booksAll = ab.map((booka) => {
				return renderBook(booka);
			});
			showBook.innerHTML = booksAll.join(" ");
		});
		//show yearpub
		const textYear = document.querySelectorAll(".js_year_pub span a");
		textYear.forEach((y) => {
			y.addEventListener("click", (e) => {
				const newBooks = filterY(ab, y.innerText);
				const abook = newBooks.map((newbook) => {
					return renderBook(newbook);
				});
				showBook.innerHTML = abook.join(" ");
				const abooks = document.querySelectorAll(".js_lbk");
				abooks.forEach((abook) => {
					abook.addEventListener("click", (e) => {
						localStorage.setItem("id_book", e.target.dataset.id);
					});
				});
			});
		});
		//show publiser
		const publisers = document.querySelectorAll(".js_content_pub span a");
		publisers.forEach((pub) => {
			pub.addEventListener("click", () => {
				const newPubs = filterX(ab, pub.innerText);
				const abook = newPubs.map((newpub) => {
					return renderBook(newpub);
				});
				showBook.innerHTML = abook.join(" ");
				const abooks = document.querySelectorAll(".js_lbk");
				abooks.forEach((abook) => {
					abook.addEventListener("click", (e) => {
						localStorage.setItem("id_book", e.target.dataset.id);
					});
				});
			});
		});
		//show author
		const authors = document.querySelectorAll(".js_author li a");
		authors.forEach((author) => {
			author.addEventListener("click", () => {
				const newAuthors = filterA(ab, author.innerText);
				const abook = newAuthors.map((newAuthor) => {
					return renderBook(newAuthor);
				});
				showBook.innerHTML = abook.join(" ");
				const abooks = document.querySelectorAll(".js_lbk");
				abooks.forEach((abook) => {
					abook.addEventListener("click", (e) => {
						localStorage.setItem("id_book", e.target.dataset.id);
					});
				});
			});
		});
	});

// console.log(dtBooks);

const filterY = function (books, year) {
	return books.filter((book) => book.YearPub === year);
};
const filterX = (books, publiser) =>
	books.filter((book) => book.Publiser === publiser);

const filterA = (books, author) =>
	books.filter((book) => book.Author === author);
