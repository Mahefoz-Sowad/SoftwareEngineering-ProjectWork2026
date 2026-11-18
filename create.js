const firebaseConfig = {
    apiKey: "AIzaSyDgGDd4gqMqoszCsJ-1a5NUbdw2WPt8Umc",
    authDomain: "softwareengineering-pw2026.firebaseapp.com",
    projectId: "softwareengineering-pw2026",
    storageBucket: "softwareengineering-pw2026.firebasestorage.app",
    messagingSenderId: "512565267869",
    appId: "1:512565267869:web:432726aeebb71edafff374",
    measurementId: "G-3KECGQLP1H"
};

// Initialize Firebase and Firestore
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// form submission
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('create-listing-form');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent page reload

            // Gather form values
            const listingData = {
                listingType: document.querySelector('input[name="listingType"]:checked')?.value || '',
                category: document.getElementById('category').value,
                title: document.getElementById('title').value,
                description: document.getElementById('description').value,
                edition: document.querySelector('input[name="edition"]:checked')?.value || '',
                gameType: document.querySelector('input[name="gameType"]:checked')?.value || '',
                version: document.getElementById('version').value,
                access: document.querySelector('input[name="access"]:checked')?.value || '',
                howToJoin: document.getElementById('howToJoin').value,
                language: document.getElementById('language').value,
                memberLimit: Number(document.getElementById('memberLimit').value),
                dateTime: document.getElementById('dateTime').value,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            try {
                // Save to the "listings" collection in Firestore
                await db.collection("listings").add(listingData);
                console.log("Listing successfully saved to Firestore!");

                // Redirect to home page after saving
                window.location.href = 'index.html';
            } catch (error) {
                console.error("Error writing document to database: ", error);
                alert("Failed to create listing. Please check your connection and try again.");
            }
        });
    }
});