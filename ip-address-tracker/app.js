const mapDiv = document.querySelector('#map');

const getLocation = async function() {
  const URL = "https://geo.ipify.org/api/v2/country?apiKey=at_dEv7ZRiVnlaP4g3eY61sHXa8egZhf&ipAddress=8.8.8.8";
  const res = await fetch(URL);
  const data = await res.json();
  const { ip, isp, domains, location } = data;
  const { country, region, timezone } = location;
  console.log(data);
  console.log(country, region, timezone);
};

// Create the Leaflet map and set the view
var map = L.map(mapDiv).setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
//getLocation();