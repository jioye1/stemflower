// Import Firebase and Firestore
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js';
import {
    getFirestore, collection, getDocs, addDoc
} from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyB88vrwuNXpyIh79JeOQPxWqsIv2Edk9R4",
    authDomain: "stemflowerapplication.firebaseapp.com",
    projectId: "stemflowerapplication",
    storageBucket: "stemflowerapplication.appspot.com",
    messagingSenderId: "831239227290",
    appId: "1:831239227290:web:1318e25f325a790ad99c23",
    measurementId: "G-HCZ7ZHPX0H"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore();

// Collection reference
const colRef = collection(db, 'stemflower');

// Function to fetch data
export function fetchData() {
    return getDocs(colRef)
        .then((snapshot) => {
            const flowers = [];
            snapshot.docs.forEach((doc) => {
                flowers.push({ ...doc.data(), id: doc.id });
            });
            console.log("Fetched data as dictionary:", flowers);
            return flowers;
        })
        .catch(err => {
            console.log(err.message);
        });
}
