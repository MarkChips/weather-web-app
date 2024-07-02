const apiKey = "3c8a00c26dc56564f1e113f41e74b095";
const units = "metric";

  
// functions that need to run before anything else
makeComputerChoice();
hideScore();

const cityNameElement = document.getElementById("city-name");
const currTempElement = document.getElementById("curr-temp");
const cityInputElement = document.getElementById("city-input");
const submitButtonElement = document.getElementById("submit-button");

const formElement = document.querySelector('form');
formElement.addEventListener('submit', function(event) {
    event.preventDefault(); 
    handleButtonClick();
    hideBanner();
});

function handleButtonClick() {
    const cityName = cityInputElement.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const cityName = data.name;
            const currentTemp = data.main.temp;

            cityNameElement.innerText = cityName;
            currTempElement.innerText = `Temperature: ${currentTemp}°C`;
            cityInputElement.value = '';
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again later.');
            cityInputElement.value = '';
        });
}

// next round button event listener
document.getElementById("next-round").addEventListener("click", function(event) {
    event.preventDefault();
    makeComputerChoice();
  });
/** Randomly pick a weather icon and display it in the 'weather to beat' section */
function makeComputerChoice() {
    const computerWeatherArr = ['01d','02d','03d','04d','09d','10d'];
    const randomComputerChoice = computerWeatherArr[Math.floor(Math.random()*6)];
    console.log(randomComputerChoice);
    const computerChoiceImage = `https://openweathermap.org/img/wn/${randomComputerChoice}@4x.png`;
    // document.getElementById('computer-default').classList.add("hidden");
    document.getElementById('computer-choice').innerHTML = `<img src="${computerChoiceImage}">`;
}


// hide score at start of game
function hideScore() {
    let gameScore = document.getElementById("show-score");
    gameScore.style.display="none";
}

// hide banner and show score when submit clicked
function hideBanner() {
    let welcomeBanner = document.getElementById("welcome-banner");
    welcomeBanner.style.display="none";
    let gameScore = document.getElementById("show-score");
    gameScore.style.display="block";
}



