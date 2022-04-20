import {
	collection,
	getDocs,
	addDoc,
	doc,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// import pandas from "https://cdn.jsdelivr.net/npm/pandas-js@0.2.4/dist/index.min.js";

import db from "./firebase.js";

const renderB = (book) => {
	return `<div class="item_best_book">
                <div class="image_book">
                    <img src="${book.ImgB}" alt="">
                    <div class="image_hover">
                        <div data-idb = "${book.IDb}" class="js_search_book search_image">
                            <a href="./DetailBooks.html" class="icon_search"><i class='bx bx-search-alt-2'></i></a>
                        </div>
                    </div>
                </div>
                <div class="tt_book">
                    <a href="#" class="title_book">${book.NameB}</a>
                    <div class="aut_book">By: <span>${book.Author}</span></div>
                </div>
            </div>`;
};

const fetchBooks = async () => {
	const books = [];
	const querySnapshot = await getDocs(collection(db, "books"));
	querySnapshot.forEach((doc) => {
		books.push(doc.data());
	});

	return books;
};
fetchBooks()
	.then((books) => {
		const fetchRatings = async () => {
			const ratings = [];
			const querySnapshot = await getDocs(collection(db, "ratings"));
			querySnapshot.forEach((doc) => {
				ratings.push(doc.data());
			});
			const newBookList = books.map((book) => {
				const listBookById = ratings.filter(
					(rating) => rating.IDb === book.IDb
				);
				const avgStars =
					listBookById.reduce((sum, curr) => sum + curr.Star, 0) /
					listBookById.length;
				return { ...book, avgStars };
			});
			const newBestbook = [];
			newBookList.forEach((book) => {
				if (book.avgStars > 8) {
					newBestbook.push(book);
				}
			});
			const abook = newBestbook.map((book, ind) => {
				if (ind < 5) {
					return renderB(book);
				}
			});
			const srcShow = document.getElementById("js_src_index");
			srcShow.innerHTML = abook.join(" ");
			const boxSearchs = document.querySelectorAll(".js_search_book");
			boxSearchs.forEach((sear) => {
				sear.addEventListener("click", () => {
					localStorage.setItem("id_book", sear.dataset.idb);
				});
			});
		};
		fetchRatings();
		return books;
	})
	.then((books) => {});
