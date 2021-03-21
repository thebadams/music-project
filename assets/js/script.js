
//basic function to get lyrics
function getLyrics(artistName, songTitle) {
	fetch(`https://api.lyrics.ovh/v1/${artistName}/${songTitle}`)
		.then((res) => res.json())
		.then((data) => console.log(data));
}

// queries discogs API by artist name to get artist resource url
async function searchDiscogsArtistName(searchQuery) {
	const response = await fetch(`https://api.discogs.com/database/search?q=${searchQuery}&type=artist&key=${discogsKey}&secret=${discogsSecret}`)
	const data = await response.json()
	return data.results[0].resource_url
}

//queries discogs API by artist ID to get artist releases URL
async function searchDiscogsArtistID() {
    let requestURL = await searchDiscogsArtistName();
    let response = await fetch(requestURL);
    let data = await response.json();
    return data.releases_url
}

// TODO: filter results by release type, master

//queries discogs API by artist releases url to get specific release information
async function searchDiscogsArtistReleases() {
    let requestURL = await searchDiscogsArtistID();
    let response = await fetch(requestURL);
    let data = await response.json()
    return data.releases[1].resource_url
}


//queries discogs API by release resource url to get tracklist information
async function searchDiscogsReleaseTrackList() {
    let requestURL = await searchDiscogsArtistReleases();
    let response = await fetch(requestURL);
    let data = await response.json();
    return data.tracklist
}

//searchDiscogs3
//get artist releases
//filter released by role = "Main" or type = master