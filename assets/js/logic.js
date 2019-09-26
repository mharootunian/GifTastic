$(document).ready(function () {

	let apiURL = "https://api.giphy.com/v1/gifs/search?"
	let apiKey = "vO3MPzjFmhBfP3kRaLwBK51EIbKfXExm"

	topics = ["rofl", "roflcopter", "lmao", "lol", "gtfo"]

	function buildButtons(wordArray) {
		wordArray.forEach(word => {
			let btn = $("<button>")
			btn.text(word)
			btn.attr("class", "queryButton")
			$("#buttons-container").append(btn)
		});
	}

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

	function buildHTML(data) {
		let bodyDiv = $("<div>");
		for (let i = 0; i < data.length; i++) {
			let img = $("<img>")
			img.attr("src", data[i].images.fixed_width_still.url)
			console.log("building html...")
			console.log(data[i].images.fixed_width_still.url)
			bodyDiv.append(img)
		}

		$("#images-container").prepend(bodyDiv)
	}

	function search(query, limit, rating) {
		$.ajax({
			url: buildQuery(query, limit, rating),
			method: "GET"
		}).then(function (response) {
			console.log(response.data[1])
			buildHTML(response.data)
		}, function (errResponse) {

		});
	}

	buildButtons(topics)


	$("#search-submit").click(function () {
		console.log("search submitted")
		console.log($("#search-query").val())
		search($("#search-query").val(), 10, "G")
	})


	$("#search-add").on("click", function () {
		topics.push( $("#search-query").val() )
		$("#buttons-container").empty()
		buildButtons(topics)
	})

	$(document).on("click", ".queryButton", function () {
		console.log("query button clicked")
		search($(this).text(), 10, "g")
	})



})
