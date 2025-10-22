document.getElementById("searchBtn").addEventListener("click", getWeather);

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultBox = document.getElementById("result");

  if (!city) {
    resultBox.innerHTML = "<p>Please enter a city name 🌍</p>";
    return;
  }

  const apiKey = "38c96e34ef4b407fb8191208252210";
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    const temp = data.current.temp_c;
    const condition = data.current.condition.text;
    const icon = data.current.condition.icon;

    resultBox.innerHTML = `
      <h2>${data.location.name}, ${data.location.country}</h2>
      <img src="${icon}" alt="weather icon" />
      <p><strong>${temp}°C</strong></p>
      <p>${condition}</p>
    `;
  } catch (error) {
    resultBox.innerHTML = `<p>❌ ${error.message}</p>`;
  }
}
