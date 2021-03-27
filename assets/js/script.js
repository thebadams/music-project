//grab html elements
let searchBtn = document.querySelector("#search-btn")
let savedArtists = JSON.parse(localStorage.getItem("savedArtists")||"[]")

//classes to construct to hold information
//define class to hold artist information
class Artist {
    //constructs artist object
    constructor(tName, tThumbnailImg, tURL, tInformation, tMembers, tReleaseURL, tReleases) {
        this.name = tName,
        this.thumbnailImg = tThumbnailImg,
        this.profileInfo = tInformation
        this.URL = tURL,
        this.members = tMembers,
        this.releasesURL = tReleaseURL
        this.releases = tReleases
    }
    //method to display information
    displayInfo() {
        let imageContainer = document.querySelector("#image-container");
        let thumbnailEl = document.createElement("img");
        thumbnailEl.setAttribute("src", this.thumbnailImg)
        imageContainer.append(thumbnailEl);
        let artistNameDiv = document.querySelector("#artist-name");
        artistNameDiv.textContent = this.name;
        let artistInfoDiv = document.querySelector("#profile-info");
        artistInfoDiv.textContent = this.profileInfo;

    }
    //method to display membersList
    displayMembersList(){
        let memberListDiv = document.querySelector("#members-list");
        let membersHeading = document.createElement("strong");
        membersHeading.textContent = "Members: "
        memberListDiv.append(membersHeading)
        for(var i = 0; i < this.members.length; i++){
            let memberListItem = document.createElement("span");
            memberListItem.textContent = ` ${this.members[i].name} |`
            memberListDiv.append(memberListItem);
        }

    }
    //method to display discography
    displayDiscography(){
        let tableHeaderRow = document.querySelector("#table-header-row");
        let discographyContent = document.querySelector("#discography-content")
        let tableHeaderTitle = document.createElement("th");
        let tableHeaderYear = document.createElement("th");
        tableHeaderTitle.textContent = "Title"
        tableHeaderYear.textContent = "Year"
        tableHeaderRow.append(tableHeaderTitle, tableHeaderYear);
        for(var i = 0; i < this.releases.length; i++) {
            let discographyListItem = document.createElement("tr")
            discographyListItem.classList.add("discography-item");
            discographyContent.append(discographyListItem);
            let discographyItemTitle = document.createElement("td");
            let discographyItemYear = document.createElement("td");
            discographyItemTitle.textContent = this.releases[i].title;
            discographyItemTitle.setAttribute("data-url", this.releases[i].resource_url);
            discographyItemYear.textContent = this.releases[i].year;
            discographyListItem.append(discographyItemTitle, discographyItemYear);
        }
    }

}
//class for album information

class Album {
    constructor(tTitle, tYear, tTrackList, tURL, tArtist) {
        this.title = tTitle,
        this.year = tYear,
        this.trackList = tTrackList,
        this.URL = tURL,
        this.artist = tArtist
    }
    displayTrackList(albumInfo) {
        let AlbumNameP = document.querySelector("#album-name");
        AlbumNameP.textContent = this.title;
        let trackListUl = document.querySelector("#track-list-content")
        for(var i = 0; i < this.trackList.length; i++){
            let trackLi = document.createElement("li");
            trackLi.textContent = this.trackList[i].title;
            trackLi.setAttribute("data-artist", albumInfo.artist);
            trackLi.classList.add("track-item");
            trackListUl.append(trackLi);
        }

    }
}
// class for song information
class Song {
    constructor(tTitle, tArtist, tLyrics) {
        this.title = tTitle,
        this.artist = tArtist,
        this.lyrics = tLyrics
    }
    displayLyrics() {
        let lyricsModalContent = document.querySelector(".modal-card-body");
        let lyricsTitle = document.querySelector("#lyrics-title");
        let lyricsModal = document.querySelector(".lyrics-modal");
        let regExp = /\n/;
        let lyricsArray = this.lyrics.split(regExp)
        console.log(lyricsArray)
        let lyricsString = lyricsArray.join("<br>")
        lyricsModalContent.innerHTML = lyricsString;
        lyricsTitle.textContent = this.title
        lyricsModal.classList.add("is-active")
    }
}
//basic function to get lyrics
function getLyrics(artistName, songTitle) {
	fetch(`https://api.lyrics.ovh/v1/${artistName}/${songTitle}`)
		.then((res) => res.json())
		.then((data) => console.log(data));
}

//get search parameter
function getParams() {
    let searchQuery = location.search.replace("%20", " ");
    let searchURL = `https://api.discogs.com/database/search${searchQuery}&type=artist&key=${discogsKey}&secret=${discogsSecret}`
    getArtistInfo(searchURL);
    
}
getParams()
//rework discogs api requests
async function getArtistInfo(searchQuery) {
    resetArtistInfo()
    resetTracklist()
    try {
    let response1 = await fetch(searchQuery); //fetches data
    let data = await response1.json() // converts response to json
    //data returns array
    // grab artist thumbnail image (data[i].thumb)
    // grab artist name (data[i].title)
    // grab artist url_resource (data[i].url_resource)
    // let artistInfo = new artist(data[i].title, data[i].thumb, datai[i].resource_url);
    // return artistInfo;
    let artistInfo = new Artist(data.results[0].title, data.results[0].thumb, data.results[0].resource_url); //creates new artist object
    let response2 = await fetch(artistInfo.URL); // make second fetch request
    let data2 = await response2.json(); // converts second request
    artistInfo.releasesURL = data2.releases_url// sets releases url on the artist info object
    artistInfo.members = data2.members// sets members on the artist info object
    artistInfo.profileInfo = data2.profile// sets information text to object
    let response3 = await fetch(`${artistInfo.releasesURL}?sort=year&sort_order=asc&per_page=500`);// make third request
    let data3 = await response3.json(); // convert request
    console.log(data3.releases)
    let releasesArray = [] // create an empty array
    for(var i = 0; i < data3.releases.length; i++){ 
        releasesArray.push(data3.releases[i]); // push releases into the array
    }
    console.log(data3.pagination.pages!==1)
    if(data3.pagination.pages !== 1){ // if theres more than 1 page in the response
        for(var j = 2; j <= data3.pagination.pages; j++){
            let response4 = await fetch(`${artistInfo.releasesURL}?sort=year&sort_order=asc&per_page=500&page=${j}`); // make a 4th request for as many pages as are left
            let data4 = await response4.json();
            for(var k = 0; k < data4.releases.length; k++){
                releasesArray.push(data4.releases[k]);
            }
        }

    }
let mainReleases = [] // filter releases array
    for(var l = 0; l < releasesArray.length; l++){
        if(releasesArray[l].main_release){
            mainReleases.push(releasesArray[l]);
        }
    }
   artistInfo.releases = mainReleases; // set main releases array to the artist Info object
   artistInfo.displayInfo() // display info
   if(artistInfo.members){  //if there are members, display members list
   artistInfo.displayMembersList()
   }
   artistInfo.displayDiscography()// display discography information
   return artistInfo;
    
    // while(data3.pagination.urls)
    //filter releases by type = master
    } catch {(err)=>{
        alert(err);
    }}
    
}

// let discographyList = document.querySelector("#discography");

async function getAlbumInfo(requestURL) {
    resetTracklist();
    let response = await fetch(requestURL);
    let data = await response.json();
    let albumInfo = new Album(data.title, data.year, data.tracklist, data.resource_url, data.artists[0].name)
    albumInfo.displayTrackList(albumInfo);
    return albumInfo
};

let discographyContent = document.querySelector("#discography-content");
discographyContent.addEventListener("click", (event)=>{
    if(event.target.matches("td")){
        getAlbumInfo(event.target.dataset.url)
    }
})

async function getSongInfo(tTitle, tArtist){
    let songInfo = new Song(tTitle, tArtist)
    let response = await fetch(`https://api.lyrics.ovh/v1/${songInfo.artist}/${songInfo.title}`)
    let data = await response.json();
    songInfo.lyrics = data.lyrics;
    songInfo.displayLyrics()
}

let trackListOl = document.querySelector("#track-list-content");

trackListOl.addEventListener("click", (event)=>{
    if(event.target.matches("li")){
        let tTitle = event.target.textContent;
        let tArtist = event.target.dataset.artist;
        getSongInfo(tTitle, tArtist)
    }
})

searchBtn.addEventListener("click", (event)=>{
    event.preventDefault();
    let searchInputValue = document.querySelector("#search-input").value
    console.log(searchInputValue)
    if(!searchInputValue){
        console.error("Please Input a Search")
        return
    }
    let searchURL = `https://api.discogs.com/database/search?q=${searchInputValue}&type=artist&key=${discogsKey}&secret=${discogsSecret}`
    getArtistInfo(searchURL)
})

//modal logic
let lyricsModalDismiss = document.querySelector(".lyrics-dismiss")

lyricsModalDismiss.addEventListener("click", ()=>{
    let lyricsModal = document.querySelector(".lyrics-modal");
    lyricsModal.classList.remove("is-active");
})

////Mobile Styling

var burgerIcon = document.querySelector('#burger');
var navbarMenu = document.querySelector('#nav-links');

burgerIcon.addEventListener("click", () => {
    navbarMenu.classList.toggle('is-active');
});

//reset functions

function resetArtistInfo() {
    let imageContainer = document.querySelector("#image-container");
    if(imageContainer.childElementCount!==0) {
        for(let i = imageContainer.children.length-1; i>=0; i--){
            imageContainer.children[i].remove()
        }
    }
    let artistNameDiv = document.querySelector("#artist-name");
    artistNameDiv.textContent = "";
    let membersListDiv = document.querySelector("#members-list");
    let profileInfoDiv = document.querySelector("#profile-info");
    profileInfoDiv.textContent = "";
    if(membersListDiv.childElementCount!==0) {
        for(let i = membersListDiv.children.length-1; i>=0; i--){
            membersListDiv.children[i].remove()
        }
    }
    let tableHeaderRow = document.querySelector("#table-header-row");
    if(tableHeaderRow.childElementCount!==0) {
        for(let i = tableHeaderRow.children.length-1; i>=0; i--){
            tableHeaderRow.children[i].remove()
        }
    }
    let discographyContent = document.querySelector("#discography-content")
    if(discographyContent.childElementCount!==0) {
        for(let i = discographyContent.children.length-1; i>=0; i--){
            discographyContent.children[i].remove()
        }
    }

}

function resetTracklist() {
    let trackListContent = document.querySelector("#track-list-content")
    if(trackListContent.childElementCount!==0) {
        for(let i = trackListContent.children.length-1; i>=0; i--){
            trackListContent.children[i].remove();
        }
    }
}