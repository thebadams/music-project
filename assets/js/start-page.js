let searchBtn = document.querySelector("#search-btn");
let savedArtists = JSON.parse(localStorage.getItem("savedArtists")||"[]")
searchBtn.addEventListener("click", ()=>{
    let searchInputValue = document.querySelector("#search-input").value
    if(!searchInputValue){
        console.error("Please Input a Search")
        return
    }
    let searchString = `./searchresults.html?q=${searchInputValue}`
    location.assign(searchString)
})

//saved artists
let saveModalDismiss = document.querySelector(".save-dismiss")
saveModalDismiss.addEventListener("click", ()=>{
    let saveModal = document.querySelector(".save-modal");
    saveModal.classList.remove("is-active");
})

let savedArtistsLink = document.querySelector("#saved-artists-link")
savedArtistsLink.addEventListener("click", ()=>{
    resetSavedArtistsModal();
  let saveModal = document.querySelector(".save-modal");
  saveModal.classList.add("is-active");
   let saveOl = document.querySelector("#save-ol");
  for(let i=0; i<savedArtists.length; i++ ) {
    let saveListItem = document.createElement("li");
    saveListItem.textContent=savedArtists[i]
    saveOl.append(saveListItem)  
  }  
})

function resetSavedArtistsModal() {
    let saveOl = document.querySelector("#save-ol")
    if(saveOl.childElementCount!==0) {
        for(let i = saveOl.children.length-1; i>=0; i--){
            saveOl.children[i].remove();
        }
    }
}