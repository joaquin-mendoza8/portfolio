// Titles to rotate through
const titles = [
    "Data Engineer",
    "Business Intelligence Analyst"
];

// Set the initial index and get the title element
let currentIndex = 0;
const titleElement = document.getElementById("rotating-title");

// Function to change the title
function rotateTitle() {
    // Remove the visible class to fade out
    titleElement.classList.remove("visible");

    // After the fade out, change the text
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % titles.length; // Cycle through titles
        titleElement.textContent = titles[currentIndex];

        // Add the visible class to fade in
        titleElement.classList.add("visible");
    }, 500); // Matches the CSS transition duration
}

// Start the rotation and repeat every 3 seconds
setInterval(rotateTitle, 3000);

// Initial load
titleElement.classList.add("visible");