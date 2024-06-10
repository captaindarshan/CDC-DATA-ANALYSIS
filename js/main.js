// Container for our Leaflet map - allows us to call map.remove() in the update function
let map;

// Make a chloropleth map using Leaflet
const buildMap = selection => {
    // Load data with D3
    d3.json('../data/state_outlines.json').then((data) => {
        death_counts_by_state = data.metadata[selection]

        // Color selector
        const colorPicker = (count, count_array) => {
            return chroma.scale(['#fef0d9', '#b30000']).domain([0, Math.max(...count_array)])(count);
        }

        // Styling function for chloropleth map
        const style = feature => {
            return {
                fillColor: colorPicker(feature.properties[selection], death_counts_by_state),
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
            }
        }

        // Styling changes when highlighted
        const highlightFeature = e => {
            const layer = e.target;

            layer.setStyle({
                weight: 5,
                color: '#666',
                dashArray: '',
                fillOpacity: 0.7
            });

            layer.bringToFront();

            info.update({
                state: layer.feature.properties.NAME,
                count: layer.feature.properties[selection]
            });
        }

        // Reset styling changes when un-highlighted
        const resetHighlight = e => {
            geojson.resetStyle(e.target);
            info.update()
        }

        // Function to apply highlight styling
        const onEachFeature = (feature, layer) => {
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight
            })
        }

        // Create map
        map = L.map('map').setView([37.8, -96], 4);

        // Add base layer
        tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        // Add US state shapes
        geojson = L.geoJson(data, {
            style: style,
            onEachFeature: onEachFeature
        }).addTo(map);

        // Add info box
        const info = L.control({position: 'topright'});

        // Create a div when the info box is added
        info.onAdd = map => {
            this._div = L.DomUtil.create('div', 'info');
            return this._div
        }

        // Set HTML of info box div whenever it is updated
        info.update = props => {
            this._div.innerHTML = props ?
            (`<h4>Deaths by ${selection}</h4>` +
            `<b>${props.state}</b></br>` +
            `Total deaths per 100k: ${props.count}`) :
            'Hover over a state';
        }

        info.addTo(map);

    }).catch(error => console.log(error))
}

buildMap('All Cause');

// Make a bar chart using Chart.js
const buildBar = selection => {
    d3.csv('../data/2023_Count_of_Death_by_State.csv').then(data => {
        let deathCounts = [];
        // Collect an array of every death count for the selected disease and pair them with their states
        for (let i = 0; i < data.length; i++) {
            if (data[i]['Jurisdiction of Occurrence'] !== 'United States') {
                deathCounts.push({
                    count: data[i][selection],
                    state: data[i]['Jurisdiction of Occurrence']
                });
            }
        }

        // Sort death counts in descending order and pick the top 10
        let sortedDeathCounts = deathCounts.sort((a, b) => b.count - a.count).slice(0, 10);

        let counts = [];
        let states = [];

        for (let i = 0; i < sortedDeathCounts.length; i++) {
            counts.push(sortedDeathCounts[i].count);
            states.push(sortedDeathCounts[i].state);
        }

        let barTrace = {
            x: states,
            y: counts,
            type: 'bar'
        }

        let barData = [ barTrace ];

        let barLayout = {
            title: {
                text: `Deaths by ${selection} per 100k people <br /> (2023, top 10 states)`
            },
            xaxis: {
                title: {
                    text: 'State'
                }
            },
            yaxis: {
                title: {
                    text: 'Death Count'
                }
            }
        }

        Plotly.newPlot('bar', barData, barLayout);
    }).catch(error => console.log(error));
}

buildBar('All Cause');

// Make a line graph using Chart.js
const buildLine = selection => {
    // Load data with d3
     d3.csv('../data/2023_Count_of_Death_by_State_and_Month.csv').then(data => {
        let deathCounts = [];
        for (let i = 0; i < data.length; i++) {
            // Push all country-wide death counts for the selected disease into an array
            if (data[i]['Jurisdiction of Occurrence'] === 'United States') {
                deathCounts.push(data[i][selection]);
            }
        }

        let lineTrace = {
            x: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
            y: deathCounts,
            type: 'scatter'
        }

        let lineLayout = {
            title: {
                text: `Deaths by ${selection} per 100k people <br />(January - August 2023)`
            },
            xaxis: {
                title: {
                    text: 'Month'
                }
            },
            yaxis: {
                title: {
                    text: 'Death Count'
                }
            }
        }

        let lineData = [ lineTrace ];
        Plotly.newPlot('line', lineData, lineLayout);
     }).catch(error => console.log(error));
}

buildLine('All Cause');

// Event handler on <select> element to re-build maps every time user selects a new disease
const handleChange = selection => {
    map.remove();
    buildMap(selection);
    buildBar(selection);
    buildLine(selection);
}
