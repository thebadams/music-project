function getLyrics() {
    fetch('https://api.lyrics.ovh/v1/Nirvana/Smells Like Teen Spirit')
        .then((res)=> res.json())
        .then((data)=>console.log(data))
}

function searchDiscogs() {
    fetch(`https://api.discogs.com/database/search?q=Nirvana&type=artist&key=${discogsKey}&secret=${discogsSecret}`)
        .then(res=> res.json())
        .then(data=> console.log(data))
    // fetch(url)
    //     .then(function(res){
    //         return res.json()
    //     })
    //     .then(function(data){
    //         console.log(data)
    //     })
}