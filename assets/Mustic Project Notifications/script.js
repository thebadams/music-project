const savedModalDismiss =
document.getElementById("savedModal");

const btn =
document.getElementById("savedbtn");

const span =
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

const savedArtistsButton = document.querySelector('#saved-artists');
const modalBg = document.querySelector('.modal-background');
const  modal = document.querySelector('.modal'); 

savedArtistsButton.addEventListener('click', () => {
    modal.classList.add('is-active');
});

 

try {
    adddlert("Uh-Oh!");
}
catch(err) {
    document.getElementById("demo") .innerHTML = err.message;
}

