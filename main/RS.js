import {
	collection,
	getDocs,
	addDoc,
	doc,
	updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

import db from "./firebase.js";

const rendrB = (book) => {
	return `<div class="item_best_book">
				<div class="image_book">
					<img src="${book.ImgB}" alt="">
					<div class="image_hover">
						<div class="search_image">
							<a href="./DetailBooks.html" data-idb="${book.IDb}" class="icon_search js_Rs_item"><i class='bx bx-search-alt-2'></i></a>
						</div>
					</div>
				</div>
				<div class="tt_book">
					<a href="./DetailBooks.html" class="title_book">${book.NameB}</a>
					<div class="aut_book">By: <span>${book.Author}</span></div>
				</div>
			</div>`;
};
const fakeRS = `<div class="item_best_book">
				<div class="image_book">
					<img src="http://images.amazon.com/images/P/0425182908.01.LZZZZZZZ.jpg" alt="">
					<div class="image_hover">
						<div class="search_image">
							<a  class="icon_search"><i class='bx bx-search-alt-2'></i></a>
						</div>
					</div>
				</div>
				<div class="tt_book">
					<a href="./DetailBooks.html" class="title_book">Isle of Dogs</a>
					<div class="aut_book">By: <span>Patricia Cornwell</span></div>
				</div>
				</div>
				<div class="item_best_book">
				<div class="image_book">
					<img src="http://images.amazon.com/images/P/0195153448.01.LZZZZZZZ.jpg" alt="">
					<div class="image_hover">
						<div class="search_image">
							<a  class="icon_search"><i class='bx bx-search-alt-2'></i></a>
						</div>
					</div>
				</div>
				<div class="tt_book">
					<a href="./DetailBooks.html" class="title_book">Classical Mythology</a>
					<div class="aut_book">By: <span>Mark P.O.Morford</span></div>
				</div>
				</div>
				<div class="item_best_book">
				<div class="image_book">
					<img src="http://images.amazon.com/images/P/0393045218.01.LZZZZZZZ.jpg" alt="">
					<div class="image_hover">
						<div class="search_image">
							<a  class="icon_search"><i class='bx bx-search-alt-2'></i></a>
						</div>
					</div>
				</div>
				<div class="tt_book">
					<a href="./DetailBooks.html" class="title_book">The Mummies of Urumchi</a>
					<div class="aut_book">By: <span>E.J.W.Barber</span></div>
				</div>
				</div>
				<div class="item_best_book">
				<div class="image_book">
					<img src="http://images.amazon.com/images/P/0440234743.01.LZZZZZZZ.jpg" alt="">
					<div class="image_hover">
						<div class="search_image">
							<a  class="icon_search"><i class='bx bx-search-alt-2'></i></a>
						</div>
					</div>
				</div>
				<div class="tt_book">
					<a href="./DetailBooks.html" class="title_book">The Testament</a>
					<div class="aut_book">By: <span>John Grisham</span></div>
				</div>
				</div>
				<div class="item_best_book">
				<div class="image_book">
					<img src="http://images.amazon.com/images/P/0002005018.01.LZZZZZZZ.jpg" alt="">
					<div class="image_hover">
						<div class="search_image">
							<a  class="icon_search"><i class='bx bx-search-alt-2'></i></a>
						</div>
					</div>
				</div>
				<div class="tt_book">
					<a href="./DetailBooks.html" class="title_book">Classical Mythology</a>
					<div class="aut_book">By: <span>Mark P.O.Morford</span></div>
				</div>
				</div>`;

const fetchBooks = async () => {
	const books = [];
	const querySnapshot = await getDocs(collection(db, "books"));
	querySnapshot.forEach((doc) => {
		books.push(doc.data());
	});

	// console.log(books);
	fetch("./data/RS.json")
		.then((Response) => Response.json())
		.then((RS) => {
			let arrRS = [];
			const id_b = localStorage.getItem("id_book");
			const a = RS.forEach((reco) => {
				if (id_b == reco.ISBN) {
					arrRS = reco.recomend;
				}
			});
			let recomemend = [];
			if (arrRS.length == 5) {
				arrRS.forEach((ars) => {
					books.forEach((book) => {
						if (ars === book["IDb"]) {
							recomemend.push(book);
							// console.log(book);
						}
					});
				});
			}
			const renderRS = recomemend.map((recom) => {
				return rendrB(recom);
			});
			const Rss = document.getElementById("js_htgy");
			// console.log(arrRS);
			// console.log(recomemend);
			if (recomemend.length == 5) {
				Rss.innerHTML = renderRS.join(" ");
			} else {
				Rss.innerHTML = fakeRS;
			}
		})
		.then(() => {
			const elRS = document.querySelectorAll(".js_Rs_item");
			elRS.forEach((elR) => {
				elR.addEventListener("click", () => {
					localStorage.setItem("id_book", elR.dataset.idb);
				});
			});
		});
};
fetchBooks();
