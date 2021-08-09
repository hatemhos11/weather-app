const input = document.querySelector('.search-bar');
// select dom element
const cityEle = document.querySelector('.city')
const tempEle = document.querySelector('.temp')
const descriptionEle = document.querySelector('.description')
const humidityEle = document.querySelector('.humidity')
const windEle = document.querySelector('.wind')


// function to get data from api
async function get(city){
    const apiKey = "495ffbcb07b76c65c3107efa1df71a7b";
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    const data = await response.json();
    if (response.ok) {
        convertUi()
        displayUi(data)
    }else{
        if(input.value == ""){
            alertNoData('Please Enter Your City Name')
        }else{
        alertNoData('Please Fill Correct City Name')
        }
    }
}

// desplay data on dom elements
function displayUi(data) {        
    convertUi()
    cityEle.innerHTML = `Weather in ${data.name}`
    tempEle.innerHTML = data.main.temp + " °C"
    descriptionEle.innerHTML = data.weather[0].description
    humidityEle.innerHTML = `Humidity:  ${data.main.humidity}%`
    windEle.innerHTML = `Wind Speed: ${data.wind.speed} km/h`
}

// alert when callback no data or incorrect city name
function alertNoData(text){
    let div = document.createElement('div')
    let divText = document.createTextNode(text)
    div.setAttribute('class', 'alert')
    div.appendChild(divText)
    document.querySelector('.alert-container').appendChild(div)
    setTimeout(() => {
        div.remove()
    }, 3000);
}

// delete loading text 
function convertUi() {    
    // document.querySelector(".weather.loading:after").style.visibility = "hidden";
    document.querySelector(".weather.loading").style.visibility = "visible";
}
document.querySelector('.search button').addEventListener('click', () => {
    get(input.value)
})
document.querySelector('.search-bar').addEventListener('keyup', (e)=>{
    if(e.keyCode === 13){
        get(input.value)
    }
})