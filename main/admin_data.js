import {
	collection,
	getDocs,
	addDoc,
	doc,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

import db from "./firebase.js";

const render2 = (book) => {
	return `<tr>
                <td>${book.IDb}</td>
                <td>${book.NameB}</td>
                <td>${book.Author}</td>
                <td>${book.Publiser}</td>
                <td>${book.YearPub}</td>
            </tr>`;
};
const render3 = (book) => {
	return `<tr>
                <td>01001001</td>
                <td>${book.IDb}</td>
                <td>${book.name}</td>
                <td>${book.Star}</td>
            </tr>`;
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
	.then((bks) => {
		const scr2 = document.querySelector("#scr2 table > tbody");
		const books = bks.map((book) => {
			return render2(book);
		});
		scr2.innerHTML = books.join(" ");
		return bks;
	})
	.then((bks) => {
		const fetcRatings = async () => {
			const ratings = [];
			const querySnapshot = await getDocs(collection(db, "ratings"));
			querySnapshot.forEach((doc) => {
				ratings.push(doc.data());
			});
			const newbooks = ratings.map((rating) => {
				const book = bks.find((bk) => {
					return bk.IDb === rating.IDb;
				});
				const name = book.NameB;
				return { ...rating, name };
			});
			const books = newbooks.map((book) => {
				return render3(book);
			});
			const scr3 = document.querySelector("#scr3 table > tbody");
			scr3.innerHTML = books.join(" ");
		};
		fetcRatings();
	});
