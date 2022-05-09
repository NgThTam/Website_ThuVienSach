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

	// const docRef = await addDoc(collection(db, "books"), {
	// 	IDb: "0441783589",
	// 	NameB: "Starship Troopers",
	// 	Author: "Robert A. Heinlein",
	// 	YearPub: "1987",
	// 	Publiser: "Ace Books",
	// 	ImgB: "http://images.amazon.com/images/P/0441783589.01.LZZZZZZZ.jpg",
	// });
	// console.log(books);
	//0804106304,0312970242,0140067477,0441783589
	return books;
};
const showBook = document.getElementById("js_show_book");
const showBook2 = document.getElementById("js_show_book2");
const showBook3 = document.getElementById("js_show_book3");

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
		const newListBook = [];
		const newListBook2 = [];
		const newListBook3 = [];
		books.forEach((book, ind) => {
			if (ind < 12) {
				newListBook.push(book);
			} else if (ind < 24) {
				newListBook2.push(book);
			} else if (ind < 36) {
				newListBook3.push(book);
			}
		});
		const abook = newListBook.map((book) => {
			return renderBook(book);
		});
		const abook2 = newListBook2.map((book) => {
			return renderBook(book);
		});
		const abook3 = newListBook3.map((book) => {
			return renderBook(book);
		});
		showBook.innerHTML = abook.join(" ");
		showBook2.innerHTML = abook2.join(" ");
		showBook3.innerHTML = abook3.join(" ");
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
			const newbooksAll = [];
			ab.forEach((booka, index) => {
				if (index < 12) {
					newbooksAll.push(booka);
				}
			});
			const booksAll = newbooksAll.map((book) => {
				return renderBook(book);
			});
			showBook.innerHTML = booksAll.join(" ");
			const abooks = document.querySelectorAll(".js_lbk");
			abooks.forEach((abook) => {
				abook.addEventListener("click", (e) => {
					localStorage.setItem("id_book", e.target.dataset.id);
				});
			});
		});
		//show yearpub
		const textYear = document.querySelectorAll(".js_year_pub span a");
		textYear.forEach((y) => {
			y.addEventListener("click", (e) => {
				const newBooks = filterY(ab, y.innerText);
				const newListB = [];
				newBooks.forEach((book, indx) => {
					if (indx < 12) {
						newListB.push(book);
					}
				});
				const abook = newListB.map((newbook) => {
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
		//show star
		const fetchRatings = async () => {
			const ratings = [];
			const querySnapshot = await getDocs(collection(db, "ratings"));
			querySnapshot.forEach((doc) => {
				ratings.push(doc.data());
			});
			const newBookList = ab.map((book) => {
				const listBookById = ratings.filter(
					(rating) => rating.IDb === book.IDb
				);

				const avgStars =
					listBookById.reduce((sum, curr) => sum + curr.Star, 0) /
					listBookById.length;
				return { ...book, avgStars };
			});

			const clickStars = document.querySelectorAll(".js_menu_ratings > li");
			clickStars.forEach((clickstar) => {
				clickstar.addEventListener("click", () => {
					const fstar = clickstar.dataset.star;
					let newStars = [];
					if (fstar == 2) {
						newStars = filterStar1(newBookList, 0, 2);
					} else {
						newStars = filterStar(newBookList, fstar - 2, fstar);
					}
					const abook = newStars.map((newStar) => {
						return renderBook(newStar);
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
		};
		fetchRatings();
		return ab;
	})
	.then((ab) => {
		const boxSearch = document.getElementById("boxsearch");
		boxSearch.addEventListener("keyup", () => {
			let Textvalue = boxSearch.value.toUpperCase();
			console.log(Textvalue);
			const re = new RegExp(`${Textvalue}`);
			const newSearch = [];
			ab.forEach((book) => {
				let textname = book.NameB.toUpperCase();
				if (re.test(textname)) {
					newSearch.push(book);
				}
			});
			const abook = newSearch.map((book) => {
				return renderBook(book);
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

// console.log(dtBooks);

const filterY = function (books, year) {
	return books.filter((book) => book.YearPub == year);
};
const filterX = (books, publiser) =>
	books.filter((book) => book.Publiser === publiser);

const filterA = (books, author) =>
	books.filter((book) => book.Author === author);
const filterStar = (books, start, end) =>
	books.filter((book) => book.avgStars > start && book.avgStars <= end);
const filterStar1 = (books, start, end) =>
	books.filter((book) => book.avgStars >= start && book.avgStars < end);
// const mean = (arr) => {
// 	let smean = 0;
// 	const length = arr.length;
// 	arr.forEach((value) => {
// 		smean += value.Star;
// 	});
// 	return smean / length;
// };
