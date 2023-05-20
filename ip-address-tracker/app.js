
const mapDiv = document.querySelector('#map');
const ipAddress = document.querySelector('[data-ip-address]')
const ipLocation = document.querySelector('[data-location]')
const timeZone = document.querySelector('[data-time-zone]')
const ispName = document.querySelector('[data-isp]')
const search = document.querySelector('.search-submit')
const searchField = document.querySelector('.search-input')
const card = document.querySelector('.bottom-card')
let map;

function displayMap(latitude, longitude, region, country) {
  if (map) {
    map.remove()
  }
  // Create the Leaflet map and set the view
  map = L.map(mapDiv).setView([latitude, longitude], 13);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  L.marker([latitude, longitude]).addTo(map).bindPopup(`${region}, ${country}`).openPopup()
}

window.onload = async function() {
  const getLocation = async function() {
    const URL1 = 'https://api.geoapify.com/v1/ipinfo?apiKey=a28bc3883c314998be488f09b3dc9ef7';
    const res = await fetch(URL1);
    const geoData = await res.json();
    const { city, continent, ip, location } = geoData;
    const { latitude, longitude } = location;

    const URL2 = `https://geo.ipify.org/api/v2/country?apiKey=at_dEv7ZRiVnlaP4g3eY61sHXa8egZhf&ipAddress=${ip}`;
    const res2 = await fetch(URL2);
    const data2 = await res2.json();
    const { isp, domains, location: geoLoc } = data2;
    const { country, region, timezone } = geoLoc;

    //console.log(latitude, longitude);

    timeZone.textContent = `UTC ${timezone}`;
    ipLocation.textContent = `${region}, ${country}`;
    ipAddress.textContent = ip;
    ispName.textContent = isp;
    card.style.display = 'block';
    displayMap(latitude, longitude, region, country);
  };

  getLocation();
};

search.addEventListener('click', async (e) => {
  e.preventDefault()

  const searchTerm = searchField.value.trim();

  const isValidIpAddress = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/.test(searchTerm);

  if (!isValidIpAddress || !searchTerm) {
    alert('Enter a valid ip address')
    return;
  }

  const getLocation = async function() {
    const URL1 = `https://api.geoapify.com/v1/ipinfo?apiKey=a28bc3883c314998be488f09b3dc9ef7&ip=${searchField.value}`;
    const URL2 = `https://geo.ipify.org/api/v2/country?apiKey=at_dEv7ZRiVnlaP4g3eY61sHXa8egZhf&ipAddress=${searchField.value}`;

    try {
      const res = await fetch(URL1);
      const geoData = await res.json();
      const { city, continent, ip, location } = geoData;
      const { latitude, longitude } = location;

      const res2 = await fetch(URL2);
      const data2 = await res2.json();
      const { isp, domains, location: geoLoc } = data2;
      const { country, region, timezone } = geoLoc;

      //console.log(latitude, longitude);

      timeZone.textContent = `UTC ${timezone}`;
      ipLocation.textContent = `${region}, ${country}`;
      ipAddress.textContent = searchField.value || ip;
      ispName.textContent = isp;
      card.style.display = 'block';
      displayMap(latitude, longitude, region, country);
    } catch (error) {

    }
  };
  getLocation();
});