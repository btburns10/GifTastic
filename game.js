//topic buttons
var moods = ["happy", "melancholy", "angry", "ecstatic", "sad", "joyful", "confused", "overwhelmed", "loved", "inspired", "motivated", "lazy"]

//giphy api key id
var keyID = "vB7bIhdeXTpMRzEBcPPZROeDTHQGTBGE"

//displays 10 gif images of selected button
function displayGifs() {
    $("#gifs").empty();
    var mood = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + mood + "&api_key=" + keyID + "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(queryURL);
        response.data.forEach(function(data) {
            var gif = $("<img>")
            .attr("src", data.images.original.url)
            .addClass("gifs");
            $("#gifs").append(gif);
        })

    })

}

function renderButtons() {
    $("#buttons").empty();
    moods.forEach(function(mood) {
        const moodBtn = $("<button>")
            .text(mood)
            .addClass("mood")
            .attr("data-name", mood);
        $("#buttons").append(moodBtn);
    });
}

renderButtons();

$(document).on("click", ".mood", displayGifs);

$("#add-mood").on("click", function() {
        
    //prevents the default function of submit form from reloading the page when fired
    event.preventDefault();

    // Here we grab the text from the input box
    var mood = $("#mood-input").val().trim();

    moods.push(mood);

    renderButtons();

});

