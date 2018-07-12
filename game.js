//topic buttons
var moods = ["happy", "melancholy", "angry", "ecstatic", "sad", "joyful", "confused", "overwhelmed", "loved", "inspired", "motivated", "lazy"]

//giphy api key id
var keyID = "vB7bIhdeXTpMRzEBcPPZROeDTHQGTBGE"

//displays 10 gif images of selected button
function displayGifs() {
    var mood = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + mood + "&api_key=" + keyID + "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(queryURL);
        response.data.forEach(function(data) {
            var gifDiv = $("<div>");            
            var rating = $("<p>");           
            var gif = $("<img>");
            gifDiv.append(rating, gif).addClass("gif-container");
            rating.text("Rating: " + data.rating);
            gif.attr("src", data.images.fixed_height_still.url)
               .attr("data-still", data.images.fixed_height_still.url)
               .attr("data-animate", data.images.fixed_height.url)
               .attr("data-state", "still")
               .addClass("gif");    
            $("#gif-display").append(gifDiv);
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

//fire function on browser load to render default buttons
renderButtons();

//create event handler to run function displayGifs()
$(document).on("click", ".mood", displayGifs);

$("#add-mood").on("click", function() {
        
    //prevents the default function of submit form from reloading the page when fired
    event.preventDefault();

    // Here we grab the text from the input box
    var mood = $("#mood-input").val().trim();

    moods.push(mood);

    renderButtons();

});

$(document).on("click", ".gif", function() {
    var state = $(this).attr("data-state");

    if(state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
   
})

//create event handler for gifs so that they are appended to div with id #favorites-div
// $(document).on("click", ".gif-container", function() {
//     $("#favorites-div").prepend($(this).clone());
// })

