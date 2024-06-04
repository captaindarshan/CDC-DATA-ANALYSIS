// Make a chloropleth map using Leaflet
const buildMap = selection => {
    // Create map
    const map = L.map('map').setView([37.8, -96], 4);

    // Add base layer
    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Add US state shapes
    L.geoJson(statesData).addTo(map);
}

buildMap(null);

// Make a bar chart using Chart.js
const buildBar = selection => {

}

// Make a line graph using Chart.js
const buildLine = selection => {

}

// Event handler on <select> element to re-build maps every time user selects a new disease
const handleChange = selection => {
    buildMap(selection);
    buildBar(selection);
    buildLine(selection);
}
