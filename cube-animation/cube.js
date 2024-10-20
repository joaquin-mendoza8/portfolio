// Set initial rotation angle
let currentAngle = 0;
const cube = document.getElementById('cube');

// Get all cube faces
var cubeFaces = document.querySelectorAll('.cube-face');

// Function to rotate the cube
function rotateCube() {
    // Calculate the current face index (mod 3 to keep it between 0-2)
    var currentFace = Math.floor((currentAngle / 120) % 3);
    // console.log("Current face:", currentFace);

    // Hide the current face by transitioning its opacity to 0
    cubeFaces[currentFace].classList.add('fade-out');

    // Move to the next face (next face index is (currentFace + 1) % 3)
    var nextFace = (currentFace + 1) % 3;

    // Show the next face by transitioning its opacity to 1
    cubeFaces[nextFace].classList.remove('fade-out');
    cubeFaces[nextFace].classList.add('fade-in');

    // Increment the angle for the next rotation (rotate by 120 degrees)
    currentAngle = currentAngle * 1 + 120;

    // Apply the rotation to the cube
    cube.style.transform = `rotateX(${currentAngle}deg)`;
}

// Initially show the first face and hide others (set opacity directly)
cubeFaces.forEach((face, index) => {
    if (index !== 0) {
        face.classList.add('fade-out'); // Fade out all except the first face
    } else {
        face.classList.add('fade-in'); // Fade in the first face
    }
});

// Rotate the cube every 3 seconds
setInterval(rotateCube, 3000);