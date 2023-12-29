
// NAVBAR ACTIVE LINK ---------------------------------------------

// Get all nav links
let navLinks = document.querySelectorAll('.nav-link')

// Get current page url
let currentUrl = window.location.href

// Loop through all nav links
for (let i = 0; i < navLinks.length; i++) {

    // Check if nav link href is equal to current page url
    if (navLinks[i].href === currentUrl) {

        // Add active class to nav link
        navLinks[i].classList.add('active')

        console.log(navLinks[i].href)

    } else {

        // Remove active class from nav link
        navLinks[i].classList.remove('active')
    }
}

// DYNAMIC DATE ---------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
        
    // REAL FREQUENCY
    const realFrequencyElem = document.getElementById('rf-date-container');
    const realFrequencyStartDate = moment('May 1, 2023', 'MMMM D, YYYY');
    calcDateDiff(realFrequencyElem, realFrequencyStartDate);

    // RCI - Get the element
    const rciElem = document.getElementById('rci-date-container');
    const rciStartDate = moment('December 1, 2022', 'MMMM D, YYYY');
    calcDateDiff(rciElem, rciStartDate);

});

function calcDateDiff(element, startDate) {
    const currentDate = moment();
    
    const years = currentDate.diff(startDate, 'years');
    startDate.add(years, 'years');
    const months = currentDate.diff(startDate, 'months');

    if (years == 0) {
        element.innerHTML += `<i> (${months} mo)</i>`;
    } else if (months == 0) {
        element.innerHTML += `<i> (${years} yr)</i>`;
    }
}