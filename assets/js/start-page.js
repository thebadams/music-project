let searchBtn = document.querySelector("#search-btn");

searchBtn.addEventListener("click", ()=>{
    let searchInputValue = document.querySelector("#search-input").value
    if(!searchInputValue){
        console.error("Please Input a Search")
        return
    }
    let searchString = `./searchresults.html?q=${searchInputValue}`
    location.assign(searchString)
})