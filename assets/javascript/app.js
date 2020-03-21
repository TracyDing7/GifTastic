
    var topics = ["Flapjack", "Ren & Stimpy", "The Regular Show", "Spongebob", "He-Man", "Powdered Toast Man", "Transformers", "Yogi Bear", "Homer Simpson", "Family Guy", "South Park", "Scooby-Doo", "Adventure Time"];

    // Example queryURL for Giphy API
    var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      var results = response.data;
      $('#view').empty;
      for (var i=0; i< results.length; i++) {
          var gifdiv = $("<div>");
            var img = $("<img>");
            img.attr("src", results[i].images.fixed_height.url);
            gifdiv.append(img);
           
            $("#view").prepend(gifdiv);
      }
    });
     
    $("#buttonArea").on("click", ".btn", function(){
      console.log($(this).attr("data"));
      queryURL= "https://api.giphy.com/v1/gifs/search?q="+$(this).attr("data")+"&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9" + "&limit=10"
      $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var results = response.data;
      console.log(results);
      $('#gifArea').empty();
      for (var i=0; i< results.length; i++) {
          
          var gifdiv = $("<div>");
            var p = $("<p>").text("Rating:" + results[i].rating);
            gifdiv.append(p);
            var img = $("<img>");
            img.attr("src", results[i].images.fixed_height_still.url);
            img.attr("data-still", results[i].images.fixed_height_still.url);
            img.attr("data-animate", results[i].images.fixed_height.url);
            img.attr("data-state", "still");
            img.addClass("gif");
            gifdiv.append(img);
            
            $("#gifArea").prepend(gifdiv);
      }
     }) 
    });

    function generateButton() {
        $("#buttonArea").empty();
        for (var i =0; i<topics.length;i++) {
            var button= $("<button type=" + "button" + ">" + topics[i] + "</button>")
            button.addClass("btn btn-warning");
            button.attr("data",topics[i]);
            $("#buttonArea").append(button);
        }
    }

    $(document).ready(function() {
        console.log(topics);
        generateButton();
    });
 
    $(".submit").on("click", function() {
        event.preventDefault();
        var valueclicked = $("#topic-input").val().trim();
        console.log(valueclicked);
        topics.push(valueclicked);
        console.log(topics);
        generateButton();
    });

    $("#gifArea").on("click", ".gif", function(event){
        event.preventDefault();
        var state = $(this).attr("data-state");
        if (state ==="still") {
            $(this).attr("src", $(this).attr("data-animate") );
            $(this).attr("data-state","animate")
            
        } else {
            $(this).attr("src", $(this).attr("data-still") );
            $(this).attr("data-state","still")
        }
    });