//topic buttons
const moods = ["happy", "melancholy", "angry", "ecstatic", "sad", "joyful", "confused", "overwhelmed", "loved", "inspired", "motivated", "lazy"]

//giphy api key id
var keyID = "vB7bIhdeXTpMRzEBcPPZROeDTHQGTBGE"

//displays 10 gif images from selected button
function displayGifs() {
    $("#gif-display").empty();

    const mood = $(this).attr("data-name");
    const queryURL = "https://api.giphy.com/v1/gifs/search?q=" + mood + "&api_key=" + keyID + "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(queryURL);
        response.data.forEach(function(data) {
            const gifDiv = $("<div>");            
            const rating = $("<p>");           
            const gif = $("<img>");
            const starDiv = $("<div>");
            const star = $("<i>");
            gifDiv.append(rating, gif, starDiv)
                  .addClass("gif-container")
                  .data({still: data.images.fixed_height_still.url,
                        animate: data.images.fixed_height.url,
                        state: "still",
                        isFavorite: false});
            rating.text("Rating: " + data.rating);
            gif.attr("src", data.images.fixed_height_still.url);
            starDiv.append(star).addClass("far fa-star star");
            $("#gif-display").append(gifDiv);
        })

    })

}

function renderButtons() {
    $("#buttons").empty();
    $("#mood-input").val("");
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

//event handler to run function displayGifs() when button is clicked
$(document).on("click", ".mood", displayGifs);

$("#add-mood").on("click", function() {
        
    //prevents the default function of submit form from reloading the page when fired
    event.preventDefault();

    // Here we grab the text from the input box
    const mood = $("#mood-input").val().trim();

        if(mood === "") {
            return;
        }
        else {
            moods.push(mood);
            renderButtons();
        }

});

//event handler to toggle gif animation
$(document).on("click", ".gif-container img", function() {
    const state = $(this).parent().data("state");
    const animate = $(this).parent().data("animate");
    const still = $(this).parent().data("still");


    if(state === "still") {
        $(this).attr("src", animate);
        $(this).parent().data("state", "animate");

    }
    else {
        $(this).attr("src", still);
        $(this).parent().data("state", "still");
    }
   
})

var favorites = [];

//event handler for favorites logic
$(document).on("click", ".star", function() {
    //condition logic to establish favorites boolean
    if($(this).parent().data("isFavorite")) {
        $(this).parent().data("isFavorite", false);
    }
    else {        
        $(this).parent().data("isFavorite", true);
    }
    //logic to create favorites array 
    if($(this).parent().data("isFavorite")) {
        $(this).addClass("fas");
        favorites.push({still: $(this).parent().data("still"),
                        animate: $(this).parent().data("animate"),
                        state: $(this).parent().data("state")});
        console.log(favorites);
        displayFavGifs();
    }
    else {
        $(this).removeClass("fas");
    }


})

//function to append favorite gifs to div with id #favorites-div
function displayFavGifs() {
    $("#favorites-div").empty();
    favorites.forEach(function(favorite) {
        const gifDiv = $("<div>");
        const gif = $("<img>");
        gifDiv.append(gif).addClass("gif-container")
            .data({
                    still: favorite.still,
                    animate: favorite.animate,
                    state: favorite.state});
        gif.attr("src", favorite.still);
        $("#favorites-div").append(gifDiv);
        
    })
}

