async function getWeather() {
  const apiKey = "10f9056955664d0db3e173543252006"; // MY api key
  const city = document.getElementById("cityInput").value;
  const weatherResult = document.getElementById("weatherResult");

  if (!city) {
    weatherResult.innerHTML = "<p style='color: red; font-size: 18px;'>Please enter a city name.</p>";
    return;
  }

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found or API error.");

    const data = await response.json();

    const weatherHTML = `
      <h2>${data.location.name}, ${data.location.country}</h2>
      <p><strong>Temperature:</strong> ${data.current.temp_c} °C</p>
      <p><strong>Condition:</strong> ${data.current.condition.text}</p>
      <img src="https:${data.current.condition.icon}" alt="Weather Icon">
      <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${data.current.wind_kph} km/h</p>
      <p><strong>Local Time:</strong> ${data.location.localtime}</p>
    `;

    weatherResult.innerHTML = weatherHTML;
  } catch (error) {
    weatherResult.innerHTML = `<span style="color:red;">${error.message}</span>`;
  }
}
