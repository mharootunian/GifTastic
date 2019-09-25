let apiURL = "https://api.giphy.com/v1/gifs/search?"
let apiKey = "vO3MPzjFmhBfP3kRaLwBK51EIbKfXExm"

topics = ["rofl", "roflcopter", "lmao", "lol", "gtfo"]

function buildQuery(query, limit, rating) {
	let queryURL = apiURL;
	//add query to GET request
	queryURL += `q=${query}&`

	//add limit
	queryURL += `limit=${limit}&`

	//set language to english
	queryURL += "lang=en&"

	//add rating
	queryURL += `rating=${rating}&`

	//add apiKey
	queryURL += `api_key=${apiKey}`

	return queryURL
}

function buildHTML(response) {
	let bodyDiv = $("<div>");

	for (let i = 0; i < response.length; i++) {
		let img = $("<img>")
		img.attr("src", response[i].imgUrl)
		bodyDiv.append(img)
	}

	$("#images-container").append(bodyDiv)
}

function search(query, limit, rating) {
	$.ajax({
		url: buildQuery(query, limit, rating),
		method: "GET"
	}).then(function(response) {
		buildHTML(response)
	}, function(errResponse) {

	});
}

$(function() {
	let keyword = $("#keyword-input").val().trim()


	$("#search-submit").click(function() {
		

	})
})
