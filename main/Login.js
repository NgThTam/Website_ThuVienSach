import {
	collection,
	getDocs,
	addDoc,
	doc,
	updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

import db from "./firebase.js";

const fetchUsers = async () => {
	const users = [];
	const querySnapshot = await getDocs(collection(db, "users"));
	querySnapshot.forEach((doc) => {
		users.push(doc.data());
	});

	return users;
};

fetchUsers()
	.then((users) => {
		const form = document.querySelector(".js_form");
		form.addEventListener("submit", (e) => {
			const ac = form[0].value;
			const pass = form[1].value;
			const ecPass = btoa(pass);
			const ecytPass = atob(ecPass);
			if ((ac == "admin") & (pass == "admin")) {
				form.setAttribute("action", "./admin.html");
			} else {
				const checkAC = users.find((user) => {
					return user.Email == ac && user.Pass == ecPass;
				});
				if (checkAC != undefined) {
					localStorage.setItem("IDuser", checkAC.IDu);
					window.location = "./index.html";
				} else {
					e.preventDefault();
					alert("taikhoankhongtontai");
				}
			}
		});
		return users;
	})
	.then((users) => {
		const logout = document.querySelector(".js_logout");
		if (localStorage.getItem("IDuser")) {
			logout.innerHTML = ` <li class="menu_list">
                                    <a href="./index.html" class="menu_list_home js_out">
                                        <span class="list_color">Logout</span>
                                    </a>
                                </li>`;
			const out = document.querySelector(".js_out");
			out.addEventListener("click", () => {
				// window.location = "#";
				localStorage.removeItem("IDuser");
			});
		} else {
			logout.innerHTML = `<li class="menu_list">
			                        <a  class="menu_list_home js_register">
			                            <span class="list_color">Register</span>
			                        </a>
			                    </li>
			                    <li class="menu_list">
			                        <a class="menu_list_home js_login">
			                            <span class="list_color">Login</span>
			                        </a>
			                    </li>`;
			const login = document.querySelector(".js_login");
			const modal_login = document.querySelector(".js_modal");
			const close_login = document.querySelector(".js_modalClose");
			const js_modal = document.querySelector(".js_modal_login");
			function showModalLogin() {
				modal_login.classList.add("open");
			}
			function closeModalLogin() {
				modal_login.classList.remove("open");
			}
			function modal_event() {
				event.stopPropagation();
			}
			login.addEventListener("click", showModalLogin);
			close_login.addEventListener("click", closeModalLogin);
			modal_login.addEventListener("click", closeModalLogin);
			js_modal.addEventListener("click", modal_event);
			//open_close modal register

			const register = document.querySelector(".js_register");
			const modal_register = document.querySelector(".modal1");
			const close_register = document.querySelector(".js_close_register");
			const register_contern = document.querySelector(".js_modal_register");
			function showModalRegister() {
				modal_register.classList.add("open");
			}
			function closeModalRegister() {
				modal_register.classList.remove("open");
			}
			function event_modal() {
				event.stopPropagation();
			}
			register.addEventListener("click", showModalRegister);
			close_register.addEventListener("click", closeModalRegister);
			modal_register.addEventListener("click", closeModalRegister);
			register_contern.addEventListener("click", event_modal);
		}
	})
	.then(() => {});
