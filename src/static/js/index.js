// SET NAV BLOB INDICATOR WIDTH --------------------------------------------
var textNodes = document.querySelectorAll('.nav-text');

// loop through all text nodes
textNodes.forEach(function(textNode) {
    
    // get width of text node
    var textWidth = textNode.offsetWidth + 15;

    // get blob indicator of text node
    var navBlobIndicator = textNode.nextElementSibling;

    // set width of blob indicator
    navBlobIndicator.style.width = textWidth + 'px';
    
});

document.addEventListener('DOMContentLoaded', function() {

    var blob = document.querySelector('.slider-thumb');

    var width = 28;
    var height = 28;

    // calculate blob left and top position
    var pageWidth = document.body.scrollWidth;
    var pageHeight = document.body.scrollHeight;

    // preset fixed position percentages
    var blobLeft = 0.45;
    var blobTop = 0.2;

    // calculate blob left and top position percentages based on page width and height
    var blobLeftPosition = blobLeft * pageWidth;
    var blobTopPosition = blobTop * pageHeight;

    // get percentage of blob left and top position
    var blobLeftPercent = blobLeftPosition / pageWidth;
    var blobTopPercent = blobTopPosition / pageHeight;

    console.log(blobLeftPercent);
    console.log(blobTopPercent);

    // change color of blob when scrolling
    window.addEventListener('scroll', function() {

        // get scroll direction
        var scrollDirection = window.scrollY;

        // get page height
        var pageHeight = document.body.scrollHeight;

        // get window height
        var windowHeight = window.innerHeight;

        // get scroll percentage
        var scrollPercent = scrollDirection / (pageHeight - windowHeight);

        // get scroll percentage of blob
        var blobPercent = scrollPercent * 100;

        // get blob width
        width = 28 + (blobPercent * 0.28);

        // get blob height
        height = 28 + (blobPercent * 0.28);

        // set blob width and height
        blob.style.width = width + 'rem';
        blob.style.height = height + 'rem';

        // reset blob left and top position as blob grows
        blob.style.left = 'calc(60% - ' + (width / 2) + 'rem)';
        blob.style.top = 'calc(51% - ' + (height / 2) + 'rem)';

    });

    // DYNAMIC DATE ---------------------------------------------------
        
    // REAL FREQUENCY
    const realFrequencyElem = document.getElementById('rf-date-container');
    if (realFrequencyElem) {
        const realFrequencyStartDate = moment('May 1, 2023', 'MMMM D, YYYY');
        calcDateDiff(realFrequencyElem, realFrequencyStartDate);
    }

    // RCI - Get the element
    const rciElem = document.getElementById('rci-date-container');
    if (rciElem) {
        const rciStartDate = moment('December 1, 2022', 'MMMM D, YYYY');
        calcDateDiff(rciElem, rciStartDate);
    }

    // ENABLE TOOLTIPS -------------------------------------------------------

    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    // SET TEXT LINK ATTRIBUTES -----------------------------------------------

    // Get all text links
    var links = document.querySelectorAll('#text-link');
    var imgLinks = document.querySelectorAll('#img-link');

    // Loop through all text links
    links.forEach(function(link) {

        // Set text link attributes
        if (link.id == 'text-link') {
            link.setAttribute('class', 'link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover');
            link.setAttribute('target', '_blank');
        }

    });

    imgLinks.forEach(function(link) {
            
            // Set text link attributes
            if (link.id == 'img-link') {
                link.setAttribute('target', '_blank');
            }
    
        }
    );

});

// CALCULATE DATE DIFFERENCE --------------------------------------------

function calcDateDiff(element, startDate) {

    // Get current date
    const currentDate = moment();
    
    // Calculate date difference
    const years = currentDate.diff(startDate, 'years');
    startDate.add(years, 'years');
    const months = currentDate.diff(startDate, 'months');

    // Add pluralization
    let yearLabel = (years > 1) ? 'yrs' : 'yr';
    let monthLabel = (months > 1) ? 'mos' : 'mo';

    // Add date difference to element
    if (years == 0) {
        // If no years, only add months
        element.innerHTML += ` (${months} ${monthLabel})`;
    } else if (months == 0) {
        // If no months, only add years
        element.innerHTML += ` (${years} ${yearLabel})`;
    } else {
        // If both years and months, add both
        element.innerHTML += ` (${years} ${yearLabel} ${months} ${monthLabel})`;
    }
}