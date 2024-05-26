document.addEventListener('DOMContentLoaded', function() {

    displayExperience('pro');

    // MAINTAIN BLOB PROPORTIONS ----------------------------------------

    // get blob
    var blob = document.querySelector('.slider-thumb');

    // get blob dimensions
    const computedStyle = getComputedStyle(blob);
    const initWidthPx = computedStyle.getPropertyValue('width');
    const initHeightPx = computedStyle.getPropertyValue('height');

    const initWidth = pxToV(initWidthPx, window.innerWidth);
    const initHeight = pxToV(initHeightPx, window.innerHeight);

    // add missing variable declarations
    var width, height;

    // initial blob position in vw/vh
    const blobLeftPx = computedStyle.getPropertyValue('left');
    const blobTopPx = computedStyle.getPropertyValue('top');

    const blobLeft = pxToV(blobLeftPx, window.innerWidth);
    const blobTop = pxToV(blobTopPx, window.innerHeight);


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

    // UPDATE NAV LINKS ON SCROLL --------------------------------------------

    // Get all navigation links
    const navLinks = document.querySelectorAll('#nav-list a');

    // Add event listener for scroll
    window.addEventListener('scroll', () => {
        updateNavLinks(navLinks);
    });

    // Get the PDF viewer elements
    const pdfViewerContainer = document.getElementById('pdfViewerContainer');

    // Add event listener for scroll
    window.addEventListener('scroll', () => {
        // Get the current scroll position
        const scrollPosition = window.scrollY;

        // If the user scrolls to the bottom of the page, open the PDF viewer
        if (scrollPosition >= (document.body.scrollHeight - window.innerHeight)) {
            pdfViewerContainer.style.display = 'block';
            document.body.style.overflow = "hidden";
        }

    });

    // Add event listener for click on the close button
    document.getElementById('closePdfViewer').addEventListener('click', () => {
        hidePDFViewer();
        // Hide the PDF viewer
        // pdfViewerContainer.style.display = 'none';
        // document.body.style.overflow = "";
    });
});

function hidePDFViewer() {
  const pdfViewerContainer = document.getElementById('pdfViewerContainer');

  pdfViewerContainer.style.display = 'none';
  document.body.style.overflow = "";
}


// Update navigation links on scroll
function updateNavLinks(navLinks) {
  // Get the current scroll position
  const scrollPosition = window.scrollY;

  // Iterate over each section and check if it's in view
  document.querySelectorAll('section').forEach((section) => {
    const sectionId = section.id;
    const sectionOffset = section.offsetTop - 450;

    // If the section is in view, update the active state of the corresponding navigation link
    if (scrollPosition >= sectionOffset) {
      navLinks.forEach((link) => {
        // Remove active class from all links
        link.classList.remove('active');

        // Add active class to the link corresponding to the current section
        if (link.id === `${sectionId}-nav`)
          link.classList.add('active');

        // If reached bottom of page, show openPdfViewer
        if (scrollPosition >= (document.body.scrollHeight - window.innerHeight)) {
          document.getElementById('openViewerButton').classList.add('active');
        }

      });
    }
  });

  // also hide PDF viewer, if showing
  hidePDFViewer();
}


// Increase/decrease blob size on scroll ------------------------------------
function updateBlobSize() {

    // get blob
    var blob = document.querySelector('.slider-thumb');

    // get blob dimensions
    const computedStyle = getComputedStyle(blob);
    const initWidthPx = computedStyle.getPropertyValue('width');
    const initHeightPx = computedStyle.getPropertyValue('height');

    const initWidth = pxToV(initWidthPx, window.innerWidth);
    const initHeight = pxToV(initHeightPx, window.innerHeight);


    // add missing variable declarations
    var width, height;

    // initial blob position in vw/vh
    const blobLeftPx = computedStyle.getPropertyValue('left');
    const blobTopPx = computedStyle.getPropertyValue('top');

    const blobLeft = pxToV(blobLeftPx, window.innerWidth);
    const blobTop = pxToV(blobTopPx, window.innerHeight);

    var prevScrollDirection = 0;

    // add scroll event listener
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

        var blobPixelHeight = computedStyle.getPropertyValue('height');
        var blobPixelWidth = computedStyle.getPropertyValue('width');

        var blobPixelMaxHeight = computedStyle.getPropertyValue('max-height');
        var blobPixelMaxWidth = computedStyle.getPropertyValue('max-width');

        // Check the actual direction of the scroll (up/down)
        if (prevScrollDirection < scrollDirection) { // scroll is downwards

          // limit blob enlarge to max-width/height of blob from CSS
          if (blobPixelHeight >= blobPixelMaxHeight || blobPixelWidth >= blobPixelMaxWidth) {
            return;
          }

        }

        // set blob width and height
        blob.style.width = width + 'vw';
        blob.style.height = height + 'vh';

        // calculate new left and top position to keep blob centered
        var left = blobLeft - ((width - initWidth) / 2);
        var top = blobTop - ((height - initHeight) / 2);

        // set blob left and top position
        blob.style.left = left + 'vw';
        blob.style.top = top + 'vh';

        // set previous scroll direction to current direction
        prevScrollDirection = scrollDirection;

    });
}

// convert px to vw/vh
function pxToV(px, windowSize) {
    return Math.ceil((parseFloat(px) / windowSize) * 100);
}

function displayContent(categoryId) {

  // list of all project category id's
  const categories = ['ml', 'web-dev', 'dev-ops', 'os'];

  for (var i = 0; i < categories.length; i++) {

    // hide all cards that aren't in selected category
    if (categories[i] != categoryId && categoryId != 'all') {
      var categoriesToHide = document.querySelectorAll('#' + categories[i]);
      // console.log(categoriesToHide);
      categoriesToHide.forEach((category) => {
        category.style.display = 'none';
      });

    // show all relevant cards
    } else {
      var categoriesToDisplay = document.querySelectorAll('#' + categories[i]);
      // console.log(categoriesToDisplay);
      categoriesToDisplay.forEach((category) => {
        category.style.display = 'inline-flex';
      });
    }
  }

  // update menu
  var menuBubbles = document.querySelectorAll(".project-menu-bubble");
  menuBubbles = Array.from(menuBubbles).filter(
    (e) => !['pro-btn', 'leader-btn']
    .includes(e.id)
  );
  
  menuBubbles.forEach((b) => {
    if (b.classList.contains('selected')) {
      b.classList.remove('selected');
    }
  });

  switch (categoryId) {
    case 'ml':
      document.getElementById('ml-btn').classList.add('selected');
      break;
    case 'web-dev':
      document.getElementById('web-btn').classList.add('selected');
      break;
    case 'dev-ops':
      document.getElementById('dev-btn').classList.add('selected');
      break;
    case 'os':
      document.getElementById('os-btn').classList.add('selected');
      break;
    case 'all':
      document.getElementById('all-btn').classList.add('selected');
      break;
  }



}

function displayExperience(categoryId) {
  const categories = ['pro', 'leader'];

  for (var i = 0; i < categories.length; i++) {

    // hide all cards that aren't in selected category
    if (categories[i] != categoryId && categoryId != 'all') {
      var categoriesToHide = document.querySelectorAll('#' + categories[i]);
      // console.log(categoriesToHide);
      categoriesToHide.forEach((category) => {
        category.style.display = 'none';
      });

    // show all relevant cards
    } else {
      var categoriesToDisplay = document.querySelectorAll('#' + categories[i]);
      // console.log(categoriesToDisplay);
      categoriesToDisplay.forEach((category) => {
        category.style.display = 'inline-flex';
      });
    }
  }

  // update menu
  var menuBubbles = document.querySelectorAll(".project-menu-bubble");
  menuBubbles = Array.from(menuBubbles).filter((e) => ['pro-btn', 'leader-btn'].includes(e.id));

  // console.log(menuBubbles);

  menuBubbles.forEach((b) => {
    if (b.classList.contains('selected')) {
      b.classList.remove('selected');
    }
  });

  switch (categoryId) {
    case 'pro':
      document.getElementById('pro-btn').classList.add('selected');
      break;
    case 'leader':
      document.getElementById('leader-btn').classList.add('selected');
      break;
  }
}