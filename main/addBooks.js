import {
	collection,
	getDocs,
	addDoc,
	doc,
	updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

import db from "./firebase.js";

fetch("./data/Books.json")
	.then((response) => response.json())
	.then((dataBooks) => {
		const addbooks = async () => {
			for (let i = 1; i <= 100; i++) {
				const addbook = await addDoc(collection(db, "books"), {
					IDb: dataBooks[i].ISBN,
					NameB: dataBooks[i]["Book-Title"],
					Author: dataBooks[i]["Book-Author"],
					Publiser: dataBooks[i]["Publisher"],
					YearPub: dataBooks[i]["Year-Of-Publication"],
					ImgB: dataBooks[i]["Image-URL-L"],
				});
			}
		};
		// addbooks();
	});
