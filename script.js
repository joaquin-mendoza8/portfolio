document.addEventListener('DOMContentLoaded', function() {


    // UPDATE BLOB SIZE ON SCROLL -------------------------------------

    updateBlobSize();


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

    // LISTEN FOR RESUME BUTTON CLICK --------------------------------------------
    document.getElementById("openViewerButton").addEventListener("click", function() {
        document.getElementById("pdfViewerContainer").style.display = "block";
        document.body.style.overflow = "hidden"; // Prevent scrolling on the background content
    });
      
    document.getElementById("pdfViewerContainer").addEventListener("click", function(e) {
        if (e.target.id === "pdfViewerContainer") {
            document.getElementById("pdfViewerContainer").style.display = "none";
            document.body.style.overflow = ""; // Restore scrolling on the background content
        }
    });

    // document.getElementById('closePdfViewer').addEventListener('click', function() {
    //     document.getElementById('pdfViewerContainer').style.display = 'none';
    // });

    // document.getElementById('closePdfViewer').addEventListener('click', function() {
    //     var pdfIframe = document.getElementById('pdfIframe');
    //     // Add the fadeOut class to #pdfIframe
    //     pdfIframe.classList.add('fadeOut');
    //     // Wait for the animation to finish, then hide #pdfViewerContainer
    //     setTimeout(function() {
    //         document.getElementById('pdfViewerContainer').style.display = 'none';
    //         // Remove the fadeOut class so the fadeIn animation can play again next time
    //         pdfIframe.classList.remove('fadeOut');
    //     }, 1000); // The timeout should be equal to the duration of the fadeOut animation
    // });
      

});


// Increase/decrease blob size on scroll ------------------------------------
function updateBlobSize() {

    // get blob
    var blob = document.querySelector('.slider-thumb');

    // initial blob size
    var initWidth = 38;
    var initHeight = 79;

    // add missing variable declarations
    var width, height;

    // initial blob position in vw/vh
    var blobLeft = 42;
    var blobTop = 12;

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
        width = initWidth + (blobPercent * 0.38);

        // get blob height
        height = initHeight + (blobPercent * 0.79);

        // set blob width and height
        blob.style.width = width + 'vw';
        blob.style.height = height + 'vh';

        // calculate new left and top position to keep blob centered
        var left = blobLeft - ((width - initWidth) / 2);
        var top = blobTop - ((height - initHeight) / 2);

        // set blob left and top position
        blob.style.left = left + 'vw';
        blob.style.top = top + 'vh';

    });
}