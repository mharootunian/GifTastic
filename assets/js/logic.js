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
			let imageDiv = $("<div>")
			img.attr("src", data[i].images.fixed_width_still.url)
			console.log("building html...")
			console.log(data[i].images.fixed_width_still.url)
			imageDiv.append(img)
			console.log(data.rating)
			imageDiv.append(`<br>Rating: ${data[i].rating}`)
			bodyDiv.append(imageDiv)
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
		let query = $("#search-query").val()
		console.log(query)
		if (!topics.includes(query)) {
			topics.push($("#search-query").val())
			$("#buttons-container").empty()
			buildButtons(topics)
		} else {
			alert("Already a button")
		}
	})

	$(document).on("click", ".queryButton", function () {
		console.log("query button clicked")
		search($(this).text(), 10, "g")
	})

})