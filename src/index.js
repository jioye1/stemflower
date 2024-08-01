// Import Firebase and Firestore
import { initializeApp } from 'firebase/app';
import {
    getFirestore, collection, getDocs, addDoc
} from 'firebase/firestore';

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
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

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

// Function to display data on the HTML page
function displayData(flowers) {
    const cardsWrapper = document.getElementById('cards-wrapper');
    const gardenContainer = document.getElementById('gardenContainer');

    // Define the mapping of Document ID to background image URLs
    const backgroundImageUrls = {
        "AXWYa9vtVPWQeOGgry1J": "Assets/images/mcmaster_workshop/IMG_6144.jpg",
        "Pwokj9phAW4W7Np0WnMT": "Assets/images/mcmaster_workshop/IMG_6138.jpg",
        // Add more mappings as needed
    };

    if (cardsWrapper) {
        cardsWrapper.innerHTML = ''; // Clear previous content
        flowers.forEach((project) => {
            console.log('Project object:', project);
            const projectId = project.id; // Use project.id
            console.log('Project ID:', projectId);

            const cardContainer = document.createElement('div');
            cardContainer.className = 'card-container';

            const socialOutcomes = `
                <ul>
                    <li>1. ${truncateText(project.SocialOutcome1, 80)}</li>
                    <li>2. ${truncateText(project.SocialOutcome2, 80)}</li>
                    <li>3. ${truncateText(project.SocialOutcome3, 80)}</li>
                    <li>4. ${truncateText(project.SocialOutcome4, 80)}</li>
                    <li>5. ${truncateText(project.SocialOutcome5, 80)}</li>
                    <li>6. ${truncateText(project.SocialOutcome6, 80)}</li>
                    <li>7. ${truncateText(project.SocialOutcome7, 80)}</li>
                </ul>
            `;

            const stemContent = `
                <ul>
                    <li>1. ${truncateText(project.STEM1, 80)}</li>
                    <li>2. ${truncateText(project.STEM2, 80)}</li>
                    <li>3. ${truncateText(project.STEM3, 80)}</li>
                    <li>4. ${truncateText(project.STEM4, 80)}</li>
                    <li>5. ${truncateText(project.STEM5, 80)}</li>
                </ul>
            `;

            const backImageUrl = backgroundImageUrls[projectId] || 'Assets/images/default_back.png'; // Provide a default image if not specified

            console.log('Back Image URL:', backImageUrl);

            cardContainer.innerHTML = `
                <div class="card">
                    <div class="side front">
                        <div class="project-title">${project.projectTitle}</div>
                        <div class="created-by">${project.createdBy}</div>
                        <div class="card-content">
                            <div class="social-outcomes">
                                ${socialOutcomes}
                            </div>
                            <div class="stem">
                                ${stemContent}
                            </div>
                        </div>
                    </div>
                    <div class="side back" style="background-image: url('${backImageUrl}');">
                        <div class="project-summary">${project.projectTitle} provided a way for ${project.beneficiary} to ${project.solveWhatProblem}.</div>
                    </div>
                </div>
            `;

            cardsWrapper.appendChild(cardContainer);
        });
    }

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
}

// Utility function to truncate text
function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
    } else {
        return text;
    }
}

// Function to handle "Learn More" button click
function learnMore(projectId) {
    // Redirect to summary.html with the project ID as a query parameter
    window.location.href = `summary.html?projectId=${projectId}`;
}

// When the document is ready
document.addEventListener('DOMContentLoaded', async () => {
    const projects = await fetchData();
    console.log('Projects fetched:', projects);
    displayData(projects);
});

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
