const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '',
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
	}
};
let userChoice = "Ludacris"
fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${userChoice}`, options)
	.then(response => response.json())
	.then(response => {
        console.log(response.data)
    })
	.catch(err => console.error(err));