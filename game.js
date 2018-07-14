//topic buttons
var moods = ["happy", "melancholy", "angry", "ecstatic", "sad", "joyful", "confused", "overwhelmed", "loved", "inspired", "motivated", "lazy"]

//giphy api key id
var keyID = "vB7bIhdeXTpMRzEBcPPZROeDTHQGTBGE"

//displays 10 gif images from selected button
function displayGifs() {
    $("#gif-display").empty();
    var mood = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + mood + "&api_key=" + keyID + "&limit=10";

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
            gif.attr("src", data.images.fixed_height_still.url)
            //    .addClass("gif");
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
    var mood = $("#mood-input").val().trim();

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

//event handler to determine isFavorite
$(document).on("click", ".star", function() {
    console.log($(this).parent());
    
    var isFav = $(this).attr("isFavorite");

    if(isFav === "false") {
        console.log("it worked");
        $(this).attr("isFavorite", "true");
        $(this).addClass("fas")
    }
    else {
        $(this).attr("isFavorite", "false");
        $(this).removeClass("fas");
        console.log("true it is");
    }
    
    
    // toggleClass("far fas");


})

function displayFavGifs() {
    //create for loop to iterate through fav gifs array
    //create image for each index of array
    //set attr for each image
    //append each image to div with id #favorites-div
}

//create event handler for gifs so that they are appended to div with id #favorites-div
// $(document).on("click", ".gif-container", function() {
//     $("#favorites-div").prepend($(this).clone());
// })

