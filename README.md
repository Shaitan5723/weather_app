# Weather Application

### The Goal
The goal for this application is to pull data from the [OpenWeather API](https://openweathermap.org/api/one-call-api#data) to display (in a neat and legible manner) both current and future weather information based on the user's search terms. 

### Technologies Used
The base code for this application is written using HTML, CSS and JavaScript, with a Bootstrap framework and jQuery libraries.
As mentioned above, the application also draws data from the [OpenWeather API](https://openweathermap.org/api/one-call-api#data).

### Features

##### Simple User Interface
The UI design is easy to use and understand. The user simply inputs their desired city to return results.
![simple UI design](/assets/images/empty1.png)

##### Current & Future Weather Information
The page displays the current weather information as well as a 5-day forecast.
![current & future weather displayed](/assets/images/searched1.png)

##### UV Index and Local Storage
The UV index includes a changing color background to emphasize the severity of UV radiation. Users will also gain access to their previously searched cities through their search history which is stored in local storage.
![UV index and search history](/assets/images/searched2.png)

### Challenges
The search history buttons on the application are a dynamically generated buttons that appear after the search function is used. A simple on.click method does not work on dynamically generated buttons, so the function needed to be accessed via the entire document.

### Future Improvements
Currently, the search history buttons work by placed text into the search bar and then calling the API. This means that the text persists in the search bar after all the information is loaded. Users would have to erase the search content before typing in their next search term. It would be more user friendly if the search bar would auto-clear the search bar after every query.
![search bar](/assets/images/erase_search.png)
