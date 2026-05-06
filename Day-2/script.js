async function getWeather() {
    const city = document.getElementById("cityInput").value;

    if (!city) {
        alert("Enter city name");
        return;
    }

    const apiKey = "337ad4a69262d97699b697293eaf752e";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    document.getElementById("weatherResult").innerHTML = "Loading...";

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log(data);

        if (data.cod != 200) {
            document.getElementById("weatherResult").innerHTML = data.message;
            return;
        }

        document.getElementById("weatherResult").innerHTML = `
            <h3>${data.name}</h3>
            <p>🌡 ${data.main.temp}°C</p>
            <p>🌥 ${data.weather[0].main}</p>
            <p>💨 ${data.wind.speed} m/s</p>
        `;
    } catch (err) {
        document.getElementById("weatherResult").innerHTML = "Something went wrong";
    }
}