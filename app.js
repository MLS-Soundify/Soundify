if(window.innerWidth <= 1000){
    document.querySelector("#sideBarMain").classList.toggle("hidden");
    
}

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'bbbc3986e7msh188fe76e81fde59p1b637bjsn9ce7375c2218',
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
	}
};

let artistcount = 1
let userChoice;

// outputting the query results

let uInput = document.getElementById('userSearch')
let uInput2 = document.getElementById('userSearch2')

//event listeners for getting user input in the box

uInput.addEventListener("keypress" , e => {
    if(e.key === "Enter" && uInput.value !== ""){
        e.preventDefault();
        userChoice = uInput.value
        userChoice = userChoice.replace(' ', '_')
        uInput.value = ''
        getSongName()
    }
})
uInput2.addEventListener("click", e => {
    if(uInput.value !== ""){
        userChoice = uInput.value
        userChoice = userChoice.replace(' ', '_')
        uInput.value = ''
        getSongName()
    }
})

//fetching the api to get whatever the user entered last

const getSongName = async () => {
    let deezerSongAPI = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${userChoice}&limit=10`, options)
    let songNameJSON = await deezerSongAPI.json()
    const infoArray = songNameJSON.data
    if(infoArray.length === 0 ){
        console.log("no music")
        return -1
    }
    document.getElementById("songDisplay").innerText = ""
    infoArray.forEach(e => {
        let songTitle = e.title;
        let songCover = e.album.cover_medium;
        let trackMusic = e.preview
        let artists = e.artist.name
        makeSongBanner(songTitle, artists, songCover, trackMusic)
    });
}


const makeSongBanner = (songName, artistName, songArt, music) => {
    let div1 = document.createElement('div')
    div1.classList = "flex justify-center mt-10"
    console.log(div1)
    let div2 = document.createElement('div')
    div2.classList = "max-w-md"
    let div3 = document.createElement('div')
    div3.classList = "flex items-center mb-4"
    //all inside div3
        let coverIMG = document.createElement('img')
        coverIMG.src = songArt
        coverIMG.alt = "Album Cover"
        coverIMG.classList = "w-16 h-16 rounded-md mr-4"
        div3.append(coverIMG)
        //song data div
            let songData = document.createElement('div')
            songData.classList = "userButtons songText"
            let trackName = document.createElement('h2')
            trackName.classList = "text-lg font-bold songTitle"
            trackName.innerText = songName
            let artistTitle = document.createElement('p')
            artistTitle.classList = "text-gray-500"
            artistTitle.innerText = artistName
            songData.append(trackName, artistTitle)
        div3.append(songData)
        //button div
            let buttonHolder = document.createElement('div')
            buttonHolder.classList = "flex userButtons"
                let playbutton = document.createElement('button')
                playbutton.classList = "bg-purple-600 hover:bg-purple-700 rounded-full p-2 audio-play"
                playbutton.value = music
                playbutton.addEventListener('click', e => {
                    let currentVal = e.target.value;
                    let playingAudio = document.getElementById("currentAudio")
                    if(playingAudio.src !== currentVal){
                        playingAudio.src = currentVal
                        playingAudio.play()
                        return 
                    }else {
                        if(!playingAudio.paused){
                            playingAudio.pause()
                            return
                        }else {
                            playingAudio.play()
                        }
                    }
                })
                playbutton.classList = "bg-purple-600 hover:bg-purple-700 rounded-full p-2 audio-play"
                    let playIcon = document.createElement('i')
                    playIcon.value = music
                    playIcon.classList = "bi bi-play-fill text-white"
                    playbutton.append(playIcon)
                let likebutton = document.createElement('button')
                likebutton.classList = "ml-8 bg-red-900 hover:bg-red-700 rounded-full p-2"
                    let likeIcon = document.createElement('i')
                    likeIcon.classList = "bi bi-heart-fill text-white"
                    likebutton.append(likeIcon)
            buttonHolder.append(playbutton,likebutton)
        div3.append(buttonHolder)
    div2.append(div3)
    div1.append(div2)
    document.getElementById("songDisplay").append(div1)
}

//displays the different playlists made in the drop down

const playlists = [{"Mo Knows": []}, {"Slow Jams": []},{"80's Punk": []},{"90's rap": []}] //example of how a playlist layout is

function displayPlaylists(){
    document.getElementById("submenu").innerText = ''
    if(playlists.length === 0){
        let emptyPlaylist = document.createElement('h1')
        emptyPlaylist.classList = "cursor-pointer p-2 hover:bg-red-800 rounded-md mt-1"
        emptyPlaylist.innerText = "You haven't made a playlist!"
        document.getElementById("submenu").append(emptyPlaylist)
        return 
    }
    playlists.forEach( e => {
        for(let name in e){
            let newPlaylist = document.createElement('h1')
            newPlaylist.classList = "cursor-pointer p-2 hover:bg-red-800 rounded-md mt-1"
            newPlaylist.innerText = name
            document.getElementById("submenu").append(newPlaylist)
        }
    })
}
function makePlaylist(){
    document.querySelector("#playlistInput").classList.toggle("hidden")
}

//button to display the different artists

let artistButton = document.getElementById("dArtists")
artistButton.addEventListener("click", element => {
    let mainArea = document.getElementById("songDisplay")
    mainArea.innerText = ""
    artistDisplay()
})

async function artistDisplay(){
    document.getElementById("songDisplay").innerText = ''
    for(let i = artistcount; i < (artistcount + 10); i++){
        let artistData = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/artist/${i}`, options)
        let artistjson = await artistData.json()
        let artistName = artistjson.name
        let artistjpg = artistjson.picture_medium 
        if(!artistjpg){
            console.log("oops!")
        }else {
            artistBanner(artistName,artistjpg)
            console.log(artistjson)
        }
    }
    artistcount += 10
}

//making artist card

function artistBanner (name, image){
    let container = document.createElement('div')
    container.classList = "container"
    let cardwrap = document.createElement('div')
    cardwrap.classList = "card-wrapper"
    let card = document.createElement('div')
    card.classList = "card"
    let cardimage = document.createElement('div')
    cardimage.classList = "card-image"
        let artistImg = document.createElement('img')
        artistImg.src = image
        artistImg.alt = 'profile one'
    cardimage.append(artistImg)
    card.append(cardimage)
    let details = document.createElement('div')
    details.classList = "details"
        let h2 = document.createElement('h2')
        h2.classList = 'artistTitleDeezer'
        h2.innerText = name
            let br = document.createElement('br')
            let span = document.createElement('span')
            span.classList = "artistSpan"
            span.innerText = "Artist"
        h2.append(br,span)
    details.append(h2)  
    cardwrap.append(card,details)
    container.append(cardwrap)
    document.querySelector('#songDisplay').append(container)
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