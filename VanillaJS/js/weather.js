const APP_KEY = "a03004bf971234fd4cb532f6df20b7af";

function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const lang = "kr";

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APP_KEY}&units=metric&lang=${lang}`;

    console.log(url);

    fetch(url).then(response => response.json()).then(data => {
        const weather = document.querySelector("#weather span:first-child");
        const city = document.querySelector("#weather span:last-child");

        // if (data.weather[0].main === "Clear") data.weather[0].main = "맑음";
        // else if(data.weather[0].main === "Snow") data.weather[0].main = "눈";
        // else if(data.weather[0].main === "Clouds") data.weather[0].main = "흐림";
        // else if(data.weather[0].main === "Rain") data.weather[0].main = "비";
        // else if(data.weather[0].main === "Drizzle") data.weather[0].main = "이슬비";
        // else if(data.weather[0].main === "Thunderstorm") data.weather[0].main = "번개";

        weather.innerText = `${data.weather[0].description} ${Math.round(data.main.temp)}˚ | `;
        city.innerText = data.name;
    }); // URL fetch -> response -> data 추출
}

function onGeoError() {
    alert("위치 정보를 찾을 수 없습니다.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);