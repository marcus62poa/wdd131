
/* getdates.js
   Purpose: Populate the copyright year and last modified date in the footer.
   This script is referenced with defer so the DOM is available when it runs.
*/

/* Insert the current year into the element with id="currentyear" */
(function setCurrentYear() {
    try {
        var yearEl = document.getElementById('currentyear');
        if (yearEl) {
            var now = new Date();
            yearEl.textContent = now.getFullYear();
        }
    } catch (e) {
        // Fail gracefully - log to console for debugging
        console.error('Error setting current year:', e);
    }
})();

/* Insert document.lastModified into the element with id="lastModified" */
(function setLastModified() {
    try {
        var modifiedEl = document.getElementById('lastModified');
        if (modifiedEl) {
            // document.lastModified returns a string; for this assignment we output it directly
            modifiedEl.textContent = 'Last Modification: ' + document.lastModified;
        }
    } catch (e) {
        console.error('Error setting lastModified:', e);
    }
})();
