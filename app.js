const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'bbbc3986e7msh188fe76e81fde59p1b637bjsn9ce7375c2218',
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
	}
};

const optionsBillboard = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'bbbc3986e7msh188fe76e81fde59p1b637bjsn9ce7375c2218',
		'X-RapidAPI-Host': 'billboard-api2.p.rapidapi.com'
	}
};

fetch('https://billboard-api2.p.rapidapi.com/hot-100?date=2019-05-11&range=1-10', optionsBillboard)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
	
let userChoice = "ludracris"
userChoice = userChoice.replace(' ', '_')



const getSongName = async () => {
    let deezerSongAPI = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${userChoice}&limit=10`, options)
    let songNameJSON = await deezerSongAPI.json()
    const infoArray = songNameJSON.data
    infoArray.forEach(e => {
        let songTitle = e.title
       console.log(songTitle, e.preview)
    });
    console.log(infoArray)
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


const playlists = [{"RandB": []}, {"Slow Jams": []},{"80's Punk": []},{"90's rap": []}] //example of how a playlist layout is

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