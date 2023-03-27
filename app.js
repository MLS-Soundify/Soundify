const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'bbbc3986e7msh188fe76e81fde59p1b637bjsn9ce7375c2218',
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
	}
};
let userChoice = "beyonce"
userChoice = userChoice.replace(' ', '_')
fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${userChoice}`, options)
	.then(response => response.json())
	.then(response => {
        console.log(response)
        console.log(response.data[3].preview)
    })
	.catch(err => console.error(err));

fetch(`https://deezerdevs-deezer.p.rapidapi.com/search/artist?q=${userChoice}`, options)
    .then(response => response.json())
    .then(response => {
        console.log(response)
    })
    .catch(err => console.error(err));