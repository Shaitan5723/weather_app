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
      let mainQueryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts&appid=${API_KEY}`
      $.ajax({
        url:mainQueryURL
      })

      .then(function (data){
        console.log(data)
        let currentDate = new Date(data.current.dt*1000).toLocaleDateString("en-us")
        $("#currentTime").html(currentDate)

      })
    })
}