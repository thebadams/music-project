function getLyrics() {
	fetch('https://api.lyrics.ovh/v1/Nirvana/Smells Like Teen Spirit')
		.then((res) => res.json())
		.then((data) => console.log(data));
}

async function searchDiscogsArtistName() {
	const response = await fetch(`https://api.discogs.com/database/search?q=Nirvana&type=artist&key=${discogsKey}&secret=${discogsSecret}`)
	const data = await response.json()
	return data.results[0].resource_url
}

async function searchDiscogsArtistID() {
    let requestURL = await searchDiscogsArtistName();
    let response = await fetch(requestURL);
    let data = await response.json();
    return data.releases_url
}

async function searchDiscogsArtistReleases() {
    let requestURL = await searchDiscogsArtistID();
    let response = await fetch(requestURL);
    let data = await response.json()
    return data.releases[1].resource_url
}

async function searchDiscogsReleaseTrackList() {
    let requestURL = await searchDiscogsArtistReleases();
    let response = await fetch(requestURL);
    let data = await response.json();
    return data.tracklist
}

//searchDiscogs3
//get artist releases
//filter released by role = "Main" or type = master