import {
	collection,
	getDocs,
	addDoc,
	doc,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

import pandas from "https://cdn.jsdelivr.net/npm/pandas-js@0.2.4/dist/index.min.js";

import db from "./firebase.js";

console.log(pandas);

const fetchUser = async () => {
	const res = [];
	const querySnapshot = await getDocs(collection(db, "books"));
	querySnapshot.forEach((doc) => {
		// doc.data() is never undefined for query doc snapshots
		// console.log(doc.id, " => ", doc.data());
		res.push(doc.data());
	});

	// const docRef = await addDoc(collection(db, "users"), {
	// 	name: "tthanh tam",
	// 	country: "Vietnam",
	// });
	// console.log("Document written with ID: ", docRef.id);

	console.log(res);
};

fetchUser();
