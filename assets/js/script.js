let searchButton = $("#searchCitiesBtn")
let cityAll = []; //sets empty array for search history

//grabs local storage items to create search history buttons
if (localStorage.getItem("searchHistory") !== null){
  cityAll = JSON.parse(localStorage.getItem("searchHistory"));
  for (let i = 0; i <= cityAll.length -1; i++) {
    let searchHistoryBtns = 
`<button class="searchedBtn btn btn-secondary" type="button" id="${cityAll[i]}">${cityAll[i]}</button>`
$("#searchHistory").append(searchHistoryBtns);
  }
}
//calls function for search history buttons
  $(document).on("click", ".searchedBtn", function()  {
    let query = $(this).attr('id')
    // console.log(query)
    $("#search-city").val(query)
    sendApiRequest()
  });


//runs the API request upon hitting the 'Search' button
searchButton.click (function()  {
  console.log("button pressed")
  let query = $("#search-city").val()
    //adds search term to local storage and creates new button for search history
    cityAll.push(query);
    localStorage.setItem("searchHistory", JSON.stringify(cityAll));
  sendApiRequest()
  addButtons()
});

//runs the API request upon hitting the enter button
$(document).keypress(function (e) {
  if (e.which == 13) {
    console.log("enter pressed")
    let query = $("#search-city").val()
    //adds search term to local storage and creates new button for search history
    cityAll.push(query);
    localStorage.setItem("searchHistory", JSON.stringify(cityAll));
    sendApiRequest()
    addButtons()
    return false;
  }
});

function addButtons(){
  let query = $("#search-city").val()
  let searchHistoryBtns = 
  `<button class="searchedBtn btn btn-secondary" type="button" id="${query}">${query}</button>`
  $("#searchHistory").append(searchHistoryBtns);
}

// geolocation API request to return latitudes and longitudes for weather API
async function sendApiRequest(){
  let API_KEY = "406b266e02e760ad8947072525883d81"
  let query = $("#search-city").val();
  let queryURL = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&appid=${API_KEY}`
  $.ajax({
    url: queryURL
  })

    // weather API request
    .then(function (response){
      let lat = (response[0].lat)
      let lon = (response[0].lon)
      let cityName = response[0].name
      $("#searchedCity").html(cityName);


      let API_KEY = "406b266e02e760ad8947072525883d81"
      let mainQueryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=alerts&appid=${API_KEY}`
      $.ajax({
        url:mainQueryURL
      })

      .then(function (data){ //Main weather board data pulled from API request
      
        let currentDate = new Date(data.current.dt*1000).toLocaleDateString("en-us") //converts UNIX code time to legible date
        $("#currentTime").html(currentDate)

        //pulls weather icon from openweather
        let iconCode = data.current.weather[0].icon;
        let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        $("#weatherIcon").attr("src", iconUrl)

        //adds weather data for current time on main board
        $("#currentTemp").html(`Temperature: ${data.current.temp} \u00B0C`)
        $("#currentWind").html(`Wind: ${data.current.wind_speed} m/s`)
        $("#currentHumid").html(`Humidity: ${data.current.humidity}%`)
        
        $("#currentUV").html(`UV Index: ${data.current.uvi}`) //UV indicator with color changes depending on UV severity
        if (data.current.uvi <= 3) {
          $("#currentUV").css("background-color", "green")
        }
        else if (data.current.uvi > 3 && data.current.uvi <= 6) {
          $("#currentUV").css("background-color", "yellow")
        }
        else if (data.current.uvi >= 7) {
          $("#currentUV").css("background-color", "red")
        }

        $(".card-group").empty() //empties out the 5-day forecast cards
        for (var i = 0; i <= 4; i++) { //5-day forecast cards
          let forecastDates = new Date(data.daily[i].dt*1000).toLocaleDateString("en-us")
          let iconCode = data.daily[i].weather[0].icon;
          let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
          
          let cardContent =         
          `<div class="card col-2" id="forecast${i}">
            <div class="card-body">
              <h5>${forecastDates}</h5>
              <img src=${iconUrl}>
              <h6>Temp: ${data.daily[i].temp.day} \u00B0C</h6>
              <h6>Wind: ${data.daily[i].wind_speed} m/s</h6>
              <h6>Humidity: ${data.daily[i].humidity}%</h6>`
        $(".card-group").append(cardContent) //appends forecast cards to the 5 day forecast card group
       
        }
      }
      )
    })
}
