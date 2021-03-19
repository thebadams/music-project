function getLyrics() {
    fetch('https://api.lyrics.ovh/v1/Nirvana/Smells Like Teen Spirit')
        .then((res)=> res.json())
        .then((data)=>console.log(data))
}