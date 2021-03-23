//classes to construct to hold information
class artist {
    constructor(tName, tThumbnailImg, tURL, tInformation, tMembers, tReleaseURL, tReleases) {
        this.name = tName,
        this.thumbnailImg = tThumbnailImg,
        this.profileInfo = tInformation
        this.URL = tURL,
        this.members = tMembers,
        this.releasesURL = tReleaseURL
        this.releases = tReleases
    }
    displayInfo() {
        let artistInfoDiv = document.querySelector("#artist-info")
        let nameEl = document.createElement("p")
        let thumbnailEl = document.createElement("img")
        let profileEl = document.createElement("p")
        nameEl.textContent = this.name;
        thumbnailEl.setAttribute("src", this.thumbnailImg);
        profileEl.textContent = this.profileInfo;
        artistInfoDiv.append(nameEl, thumbnailEl, profileEl)
    }

}

class album {
    constructor(tTitle, tYear, tTrackList) {
        this.title = tTitle,
        this.year = tYear,
        this.tracklist = tTrackList
    }
}

class song {
    constructor(tTitle, tComposer, tLyrics) {
        this.title = tTitle,
        this.composer = tComposer,
        this.lyrics = tLyrics
    }
}
//basic function to get lyrics
function getLyrics(artistName, songTitle) {
	fetch(`https://api.lyrics.ovh/v1/${artistName}/${songTitle}`)
		.then((res) => res.json())
		.then((data) => console.log(data));
}

//rework discogs api requests
async function getArtistInfo(searchQuery) {
    try {
    let response1 = await fetch(`https://api.discogs.com/database/search?q=${searchQuery}&type=artist&key=${discogsKey}&secret=${discogsSecret}`);
    let data = await response1.json()
    //data returns array
    // grab artist thumbnail image (data[i].thumb)
    // grab artist name (data[i].title)
    // grab artist url_resource (data[i].url_resource)
    // let artistInfo = new artist(data[i].title, data[i].thumb, datai[i].resource_url);
    // return artistInfo;
    let artistInfo = new artist(data.results[0].title, data.results[0].thumb, data.results[0].resource_url);
    let response2 = await fetch(artistInfo.URL);
    let data2 = await response2.json();
    artistInfo.releasesURL = data2.releases_url
    artistInfo.members = data2.members
    artistInfo.profileInfo = data2.profile
    let response3 = await fetch(`${artistInfo.releasesURL}?sort=year&sort_order=asc&per_page=500`);
    let data3 = await response3.json();
    console.log(data3.releases)
    let releasesArray = []
    for(var i = 0; i < data3.releases.length; i++){
        releasesArray.push(data3.releases[i]);
    }
    console.log(data3.pagination.pages!==1)
    if(data3.pagination.pages !== 1){
        for(var j = 2; j <= data3.pagination.pages; j++){
            let response4 = await fetch(`${artistInfo.releasesURL}?sort=year&sort_order=asc&per_page=500&page=${j}`);
            let data4 = await response4.json();
            for(var k = 0; k < data4.releases.length; k++){
                releasesArray.push(data4.releases[k]);
            }
        }

    }
let mainReleases = []
    for(var l = 0; l < releasesArray.length; l++){
        if(releasesArray[l].main_release){
            mainReleases.push(releasesArray[l]);
        }
    }
   artistInfo.releases = mainReleases;
   artistInfo.displayInfo()
   return artistInfo;
    
    // while(data3.pagination.urls)
    //filter releases by type = master
    } catch {(err)=>{
        alert(err);
    }}
    
}

// queries discogs API by artist name to get artist resource url
// async function searchDiscogsArtistName(searchQuery) {
// 	const response = await fetch(`https://api.discogs.com/database/search?q=${searchQuery}&type=artist&key=${discogsKey}&secret=${discogsSecret}`)
// 	const data = await response.json()
// 	return data.results[0].resource_url
// }

// //queries discogs API by artist ID to get artist releases URL
// async function searchDiscogsArtistID() {
//     let requestURL = await searchDiscogsArtistName();
//     let response = await fetch(requestURL);
//     let data = await response.json();
//     return data.releases_url
// }

// TODO: filter results by release type, master

// //queries discogs API by artist releases url to get specific release information
// async function searchDiscogsArtistReleases() {
//     let requestURL = await searchDiscogsArtistID();
//     let response = await fetch(requestURL);
//     let data = await response.json()
//     return data.releases[1].resource_url
// }


// //queries discogs API by release resource url to get tracklist information
// async function searchDiscogsReleaseTrackList() {
//     let requestURL = await searchDiscogsArtistReleases();
//     let response = await fetch(requestURL);
//     let data = await response.json();
//     return data.tracklist
// }

//searchDiscogs3
//get artist releases
//filter released by role = "Main" or type = master