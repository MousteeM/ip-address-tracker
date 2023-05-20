const mapDiv = document.querySelector('#map');
const ipAddress = document.querySelector('[data-ip-address]')
const ipLocation = document.querySelector('[data-location]')
const timeZone = document.querySelector('[data-time-zone]')
const ispName = document.querySelector('[data-isp]')
const search = document.querySelector('.search-submit')
const searchField = document.querySelector('.search-input')
const card = document.querySelector('.bottom-card')


function displayMap(latitude, longitude) {
  // Create the Leaflet map and set the view
  var map = L.map(mapDiv).setView([latitude, longitude], 13);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
}

search.addEventListener('click', (e) => {
  e.preventDefault()
  const getLocation = async function() {
    const URL1 = 'https://api.geoapify.com/v1/ipinfo?apiKey=a28bc3883c314998be488f09b3dc9ef7'
    const URL2 = `https://geo.ipify.org/api/v2/country?apiKey=at_dEv7ZRiVnlaP4g3eY61sHXa8egZhf&ipAddress=${searchField.value}`
    const res = await fetch(URL1)
    const geoData = await fetch(URL2)
    const data = await res.json()
    const { city, continent, ip, location, state } = data
    const { latitude, longitude } = location
    const data2 = await geoData.json();
    const { isp, domains, location: geoLoc } = data2;
    const { country, region, timezone } = geoLoc
    console.log(isp)
    timeZone.textContent = `UTC ${timezone}`;
    ipLocation.textContent = `${region}, ${country}`;
    ipAddress.textContent = `${searchField.value}` || `${ip}`;
    ispName.textContent = `${isp}`;
    card.style.display = 'block';
    displayMap(latitude, longitude);
  };
  getLocation()
})

//getLocation();