const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'bbbc3986e7msh188fe76e81fde59p1b637bjsn9ce7375c2218',
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
	}
};
let userChoice = "u remind me"
userChoice = userChoice.replace(' ', '_')

const getSongName = async () => {
    let deezerSongAPI = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${userChoice}&limit=10`, options)
    let songNameJSON = await deezerSongAPI.json()
    const infoArray = songNameJSON.data
    if(infoArray.length === 0 ){
        console.log("no music")
        return "no music found! enter a different query"
    }
    infoArray.forEach(e => {
        let songTitle = e.title
        let songCover = e.album.cover_medium
       console.log(songTitle, e.preview, songCover)
    });
}
getSongName()


//broken as of now, giving back search
const getAlbumName = async () => {
    let deezerSongAPI = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=album:${userChoice}&limit=10`, options)
    let songNameJSON = await deezerSongAPI.json()
    const infoArray = songNameJSON.data
    infoArray.forEach(e => {
        let songTitle = e.title
       console.log(e)
    });
   console.log(infoArray)
}
// getAlbumName()


const playlists = [{"Mo Knows": []}, {"Slow Jams": []},{"80's Punk": []},{"90's rap": []}] //example of how a playlist layout is

function displayPlaylists(){
    document.getElementById("submenu").innerText = ''
    if(playlists.length === 0){
        return 
    }
    playlists.forEach( e => {
        for(let name in e){
        let newPlaylist = document.createElement('h1')
        newPlaylist.classList = "cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1"
        newPlaylist.innerText = name
        document.getElementById("submenu").append(newPlaylist)
        }
    })
}

function makePlaylist(){

    document.querySelector("#playlistInput").classList.toggle("hidden")

}

/*
TO-DO
- make a function that adds the recently listened to songs
    - have an array that shows the last 5 listened to songs.
- make a function that can add liked songs
    - have an array that stores the id of those liked songs
- make a function that makes a new playlist
    - make a playlist obj
- make a function that adds songs to a playlist
    - have a playlist storage for that obj
*/