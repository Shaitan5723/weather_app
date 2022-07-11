let searchButton = $("#searchCitiesBtn")
let cityAll = [];




//runs the API request upon hitting the 'Get Recipes' button
searchButton.click (function()  {
  console.log("button pressed")
  sendApiRequest()
});

//runs the API request upon hitting the enter button
$(document).keypress(function (e) {
  if (e.which == 13) {
    console.log("enter pressed")
    sendApiRequest()
    return false;
  }
});



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

      //sets local storage and appends new button to the search history bar
      cityAll.push(cityName);
      let searchHistoryBtns = 
      `<button class="btn btn-secondary" type="button" id="searchedBtn">${cityName}</button>`
      $("#searchHistory").append(searchHistoryBtns);

      localStorage.setItem("searchHistory", JSON.stringify(cityAll));

      let API_KEY = "406b266e02e760ad8947072525883d81"
      let mainQueryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=alerts&appid=${API_KEY}`
      $.ajax({
        url:mainQueryURL
      })

      .then(function (data){ //Main weather board
        console.log(data)
        let currentDate = new Date(data.current.dt*1000).toLocaleDateString("en-us")
        $("#currentTime").html(currentDate)
        let iconCode = data.current.weather[0].icon;
        let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        $("#weatherIcon").attr("src", iconUrl)

        $("#currentTemp").html(`Temperature: ${data.current.temp} \u00B0C`)
        $("#currentWind").html(`Wind: ${data.current.wind_speed} m/s`)
        $("#currentHumid").html(`Humidity: ${data.current.humidity}%`)
        
        $("#currentUV").html(`UV Index: ${data.current.uvi}`)
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
          //console.log(forecastDates)
          let cardContent =         
          `<div class="card col-2" id="forecast${i}">
            <div class="card-body">
              <h5>${forecastDates}</h5>
              <img src=${iconUrl}>
              <h6>Temp: ${data.daily[i].temp.day} \u00B0C</h6>
              <h6>Wind: ${data.daily[i].wind_speed} m/s</h6>
              <h6>Humidity: ${data.daily[i].humidity}%</h6>`
        $(".card-group").append(cardContent)
        }
      }
      )
    })
}
