/**
 * When the page is loaded, do some stuff
 */
$(document).ready(function() {
    $('.Verification').append(drawVerSummary(summary.LIVV.Verification.Summary));
});


function drawVerSummary(data) {
    html = "<h1>Verification</h1><table>";
    // Get this working fancy before committing.
    html = html + "</table>";
    console.log(html)
    return html;
}

