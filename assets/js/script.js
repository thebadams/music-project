function getLyrics() {
	fetch('https://api.lyrics.ovh/v1/Nirvana/Smells Like Teen Spirit')
		.then((res) => res.json())
		.then((data) => console.log(data));
}

function searchDiscogs() {
	fetch(`https://api.discogs.com/database/search?q=Nirvana&type=artist&key=${discogsKey}&secret=${discogsSecret}`)
		.then((res) => res.json())
		.then((data) => {
			console.log(data.results[0].resource_url);
			return data.results[0].resource_url;
		});
	// fetch(url)
	//     .then(function(res){
	//         return res.json()
	//     })
	//     .then(function(data){
	//         console.log(data)
	//     })
}

async function searchDiscogs2() {
    let searchBox = document.querySelector("input")
    let searchQuery = searchBox.value
    let requestURL = await fetch(`https://api.discogs.com/database/search?q=${searchQuery}&type=artist&key=${discogsKey}&secret=${discogsSecret}`)
		.then((res) => res.json())
		.then((data) => {
			console.log(data.results[0].resource_url);
			return data.results[0].resource_url;
		});
	fetch(requestURL)
	    .then((res)=>{
            console.log(res)
            return res.json()})
        .then((data)=> console.log(data))
}

function searchAudioDB() {
    var xhr = new XMLHttpRequest()
    xhr.open("GET", 'http://www.theaudiodb.com/api/v1/json/1/search.php?s=coldplay', true)
    xhr.onreadystatechange = function () {
  // In local files, status is 0 upon success in Mozilla Firefox
  if(xhr.readyState === XMLHttpRequest.DONE) {
    var status = xhr.status;
    if (status === 0 || (status >= 200 && status < 400)) {
      // The request has been completed successfully
      console.log(xhr.responseText);
    } else {
      // Oh no! There has been an error with the request!
    }
  }
};
xhr.send()
}
