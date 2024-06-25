// Import Firebase and Firestore
import { initializeApp } from 'firebase/app';
import {
    getFirestore, collection, getDocs, addDoc
} from 'firebase/firestore';

require('dotenv').config();

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore();

// Collection reference
const colRef = collection(db, 'stemflower');

// Function to handle adding a new project
function addProject(textFromPage2, textFromPage2_5, textFromPage3, textFromPage4, textFromPage5, textFromPage6, textFromPage7, textFromPage8, textFromPage9, textFromPage10, stem1, stem2, stem3, stem4, stem5, textFromPageAuthor) {
    addDoc(colRef, {
        projectTitle: textFromPage2,
        beneficiary: textFromPage2_5,
        solveWhatProblem: textFromPage3,
        SocialOutcome1: textFromPage4,
        SocialOutcome2: textFromPage5,
        SocialOutcome3: textFromPage6,
        SocialOutcome4: textFromPage7,
        SocialOutcome5: textFromPage8,
        SocialOutcome6: textFromPage9,
        SocialOutcome7: textFromPage10,
        STEM1: stem1,
        STEM2: stem2,
        STEM3: stem3,
        STEM4: stem4,
        STEM5: stem5,
        createdBy: textFromPageAuthor
    }).then(() => {
        console.log('Project added to the database!');
        fetchData(); // Fetch and display updated data
    }).catch(err => {
        console.error('Error adding document:', err);
    });
}

// Function to fetch and display data
function fetchData() {
    getDocs(colRef)
        .then((snapshot) => {
            const flowers = [];
            snapshot.docs.forEach((doc) => {
                flowers.push({ ...doc.data(), id: doc.id });
            });
            displayData(flowers);
        })
        .catch(err => {
            console.log(err.message);
        });
}

// Function to display data on the HTML page
function displayData(flowers) {
    const gardenContainer = document.getElementById('gardenContainer');
    const summaryContainer = document.getElementById('projectDetailsContainer');

    if (gardenContainer) {
        gardenContainer.innerHTML = ''; // Clear previous content
        flowers.forEach(item => {
            // Create a div to hold the project container
            const projectContainer = document.createElement('div');
            projectContainer.classList.add('project-container');

            // Create the image element
            const img = document.createElement('img');
            img.src = 'Assets/images/stemFlower.png'; // Replace with the actual image path or URL
            img.width = 150;
            img.alt = item.projectTitle;

            // Create the project info div
            const projectInfo = document.createElement('div');
            projectInfo.classList.add('project-info');
            projectInfo.innerHTML = `
                <p>Project Title: ${item.projectTitle}</p>
                <button class="learn-more-btn" data-id="${item.id}">Learn More</button>
            `;

            // Append the image and project info to the project container
            projectContainer.appendChild(img);
            projectContainer.appendChild(projectInfo);

            // Append the project container to the main container
            gardenContainer.appendChild(projectContainer);
        });

        // Attach event listeners to the "Learn More" buttons
        document.querySelectorAll('.learn-more-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const projectId = event.target.getAttribute('data-id');
                learnMore(projectId);
            });
        });
    }

    if (summaryContainer) {
        summaryContainer.innerHTML = flowers.map(project => `
            <div class="project">
                <h2>Project Title: ${project.projectTitle}</h1>
                <p>Beneficiary: ${project.beneficiary}</p>
                <p>Problem to Solve: ${project.solveWhatProblem}</p>
                <p>Social Outcome 1: ${project.SocialOutcome1}</p>
                <p>Social Outcome 2: ${project.SocialOutcome2}</p>
                <p>Social Outcome 3: ${project.SocialOutcome3}</p>
                <p>Social Outcome 4: ${project.SocialOutcome4}</p>
                <p>Social Outcome 5: ${project.SocialOutcome5}</p>
                <p>Social Outcome 6: ${project.SocialOutcome6}</p>
                <p>Social Outcome 7: ${project.SocialOutcome7}</p>
                <p>STEM Concept 1: ${project.STEM1}</p>
                <p>STEM Concept 2: ${project.STEM2}</p>
                <p>STEM Concept 3: ${project.STEM3}</p>
                <p>STEM Concept 4: ${project.STEM4}</p>
                <p>STEM Concept 5: ${project.STEM5}</p>
                <p>Created By: ${project.createdBy}</p>
            </div>
        `).join('');
    }
}

// Function to handle "Learn More" button click
function learnMore(projectId) {
    // Redirect to summary.html with the project ID as a query parameter
    window.location.href = `summary.html?projectId=${projectId}`;
}

// Call fetchData when the document is loaded
document.addEventListener('DOMContentLoaded', fetchData);

// Event listener for the button click
document.addEventListener('DOMContentLoaded', () => {
    const nextButton = document.getElementById('uploadButton');
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            const textFromPage2 = localStorage.getItem('textPage2'); // Project title
            const textFromPage2_5 = localStorage.getItem('textPage2.5'); // Beneficiary
            const textFromPage3 = localStorage.getItem('textPage3'); // Problem to solve
            const textFromPage4 = localStorage.getItem('textPage4'); // SocialOutcome1
            const textFromPage5 = localStorage.getItem('textPage5'); // SocialOutcome2
            const textFromPage6 = localStorage.getItem('textPage6'); // SocialOutcome3
            const textFromPage7 = localStorage.getItem('textPage7'); // SocialOutcome4
            const textFromPage8 = localStorage.getItem('textPage8'); // SocialOutcome5
            const textFromPage9 = localStorage.getItem('textPage9'); // SocialOutcome6
            const textFromPage10 = localStorage.getItem('textPage10'); // SocialOutcome7
            const stem1 = localStorage.getItem('textArea1'); // STEM1
            const stem2 = localStorage.getItem('textArea2'); // STEM2
            const stem3 = localStorage.getItem('textArea3'); // STEM3
            const stem4 = localStorage.getItem('textArea4'); // STEM4
            const stem5 = localStorage.getItem('textArea5'); // STEM5
            const textFromPageAuthor = localStorage.getItem('textPageAuthor'); // Author

            addProject(textFromPage2, textFromPage2_5, textFromPage3, textFromPage4, textFromPage5, textFromPage6, textFromPage7, textFromPage8, textFromPage9, textFromPage10, stem1, stem2, stem3, stem4, stem5, textFromPageAuthor);
        });
    }
});
