
$(document).ready(function () {
	var teams = ["Kansas City Royals", "Kansas City Chiefs", "Kansas Jayhawks", "Sporting Kansas City", "K-State Wildcats", "Missouri Tigers"];

	// Add buttons for teams
	function renderButtons() {
		$("#teams-buttons").empty();
		for (i = 0; i < teams.length; i++) {
			$("#teams-buttons").append("<button class='btn btn-success' data-teams='" + teams[i] + "'>" + teams[i] + "</button>");
		}
	}

	renderButtons();

	// Adding a button for teams entered
	$("#add-teams").on("click", function () {
		event.preventDefault();
		var teams = $("#teams-input").val().trim();
		teams.push(teams);
		renderButtons();
		return;
	});


	// Getting gifs from api... onto html
	$("button").on("click", function () {
		var teams = $(this).attr("data-teams");
		var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC" +
			teams + "&api_key=ddc6zaTOxFJmzC&limit=10"

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function (response) {
			var results = response.data;
			$("#teams").empty();
			for (var i = 0; i < results.length; i++) {
				var teamsDiv = $("<div>");
				var p = $("<p>").text("Rating: " + results[i].rating);
				var teamsImg = $("<img>");

				teamsImg.attr("src", results[i].images.original_still.url);
				teamsImg.attr("data-still", results[i].images.original_still.url);
				teamsImg.attr("data-animate", results[i].images.original.url);
				teamsImg.attr("data-state", "still");
				teamsImg.attr("class", "gif");
				teamsDiv.append(p);
				teamsDiv.append(teamsImg);
				$("#teams").append(teamsDiv);
			}
		});
	});

	function changeState(){
		var state = $(this).attr("data-state");
		var animateImage = $(this).attr("data-animate");
		var stillImage = $(this).attr("data-still");

		if (state == "still") {
			$(this).attr("src", animateImage);
			$(this).attr("data-state", "animate");
		}

		else if (state == "animate") {
			$(this).attr("src", stillImage);
			$(this).attr("data-state", "still");
		}
	}



	// $(document).on("click", "#input", displayImg);
	$(document).on("click", ".gif", changeState);

});