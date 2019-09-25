let url = ""

topics = ["rofl", "roflcopter", "lmao", "lol", "gtfo"]

function buildHTML(response) {
	let bodyDiv = $("<div>");

	for (let i = 0; i < response.length; i++) {
		let img = $("<img>")
		img.attr("src", response[i].imgUrl)
		bodyDiv.append(img)
	}

	$("#images-container").append(bodyDiv)
}

function search() {
	$.ajax({
		url: url,
		method: "GET"
	}).then(function(response) {
		buildHTML(response)
	}, function(errResponse) {

	});
}

$(function() {
	let keyword = $("#keyword-input").val().trim()


	$("#keyword-submit").click(function() {


	})
})
