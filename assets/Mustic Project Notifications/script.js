var savedModalDismiss =
document.getElementById("savedModal");

var btn =
document.getElementById("savedbtn");

var span =
document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}
span.onclick = function() {
modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

var savedArtistsModal =
document.getElementById("savedArtists")



try {
    adddlert("Uh-Oh!");
}
catch(err) {
    document.getElementById("demo") .innerHTML = err.message;
}

