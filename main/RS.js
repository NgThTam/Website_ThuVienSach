import {
	collection,
	getDocs,
	addDoc,
	doc,
	updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

import db from "./firebase.js";

const fetchBooks = async () => {
	const books = [];
	const querySnapshot = await getDocs(collection(db, "books"));
	querySnapshot.forEach((doc) => {
		books.push(doc.data());
	});

	console.log(books);
};
fetchBooks();
