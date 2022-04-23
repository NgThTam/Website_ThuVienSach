import {
	collection,
	getDocs,
	addDoc,
	doc,
	updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

import db from "./firebase.js";

// Set the "capital" field of the city 'DC'

// const asd = async () => {
// 	const washingtonRef = doc(db, "users", "urmMaqQrkQkQsz2eISPF");
// 	await updateDoc(washingtonRef, {
// 		FullName: "dataset",
// 		Email: "dattaset",
// 		Pass: "dataset",
// 	});
// };
// asd();
const render1 = (user) => {
	return `<tr>
                <td>${user.IDu}</td>
                <td>${user.Addr}</td>
                <td>${user.Old}</td>
            </tr>`;
};

const render2 = (book) => {
	return `<tr>
                <td>${book.IDb}</td>
                <td>${book.NameB}</td>
                <td>${book.Author}</td>
                <td>${book.Publiser}</td>
                <td>${book.YearPub}</td>
				<td style="text-align: center;" class="view js_view">
					<a id="${book.IDb}" href="./DetailBooks.html"><i class='bx bx-show'></i></a>
				</td>
            </tr>`;
};
const render3 = (book) => {
	return `<tr>
                <td>${book.IDu}</td>
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
		const fetchusers = async () => {
			const users = [];
			const querySnapshot = await getDocs(collection(db, "users"));
			querySnapshot.forEach((doc) => {
				users.push(doc.data());
			});

			const newUers = users.map((user) => {
				return render1(user);
			});
			const scr1 = document.querySelector("#scr1 table > tbody");
			scr1.innerHTML = newUers.join(" ");
			const detailViews = document.querySelectorAll(".js_view > a");
			detailViews.forEach((detailView) => {
				detailView.addEventListener("click", () => {
					localStorage.setItem("id_book", detailView.id);
				});
			});
		};
		fetchusers();
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
