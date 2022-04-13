// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// import { getStorage } from 'firebase/storage';

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js";

const firebaseConfig = {
	apiKey: "AIzaSyAyrgma0978Il-ohJKJmlslkgqzoP6apX0",
	authDomain: "books-224ba.firebaseapp.com",
	projectId: "books-224ba",
	storageBucket: "books-224ba.appspot.com",
	messagingSenderId: "903407944436",
	appId: "1:903407944436:web:e1e0538021405dd05c94a1",
	measurementId: "G-QH499EEG8Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

const auth = getAuth();
const storage = getStorage(app);

export { auth, storage };

export default db;
