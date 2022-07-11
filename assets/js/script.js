let searchButton = $("#searchCitiesBtn")

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



// API request and creation of variables for usage with the data. The variables need to be interpolated ${} and inverted commas are needed
async function sendApiRequest(){
  let API_KEY = "406b266e02e760ad8947072525883d81"
  let query = $("#search-city").val();
  let queryURL = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&appid=${API_KEY}`
  $.ajax({
    url: queryURL
  })
    .then(function (response){
      let lat = (response[0].lat)
      let lon = (response[0].lon)
  
      console.log(response)
      $("#searchedCity").html(response[0].name);

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

        for (var i = 0; i <= 4; i++) { 
          let forecastDates = new Date(data.daily[i].dt*1000).toLocaleDateString("en-us")
          //console.log(forecastDates)
          let cardContent =         
          `<div class="card col-2" id="">
            <div class="card-body">
              <h5>${forecastDates}</h5>
              <img>
              <h6>Temp: ${data.daily[0].temp.day} \u00B0C</h6>
              <h6>Wind: ${data.daily[0].wind_speed} m/s</h6>
              <h6>Humidity: ${data.daily[0].humidity}%</h6>`
        $(".card-group").append(cardContent)
        }
      }
      )
    })
}
