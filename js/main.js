// Make a chloropleth map using Leaflet
const buildMap = selection => {
    // Load data with D3
    d3.json('./gz_2010_us_040_00_5m.json').then((data) => {
        death_counts_by_state = data.metadata[selection]

        // Color selector
        const colorPicker = (count, count_array) => {
            return chroma.scale(['#fef0d9', '#b30000']).domain([0, Math.max(...count_array)])(count);
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

        // Function to apply highlight styling
        const onEachFeature = (feature, layer) => {
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight
            })
        }

        // Reset styling changes when un-highlighted
        const resetHighlight = e => {
            geojson.resetStyle(e.target);
            info.update()
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

        // Create map
        const map = L.map('map').setView([37.8, -96], 4);

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

        const info = L.control({position: 'topright'});

        info.onAdd = map => {
            this._div = L.DomUtil.create('div', 'info');
            return this._div
        }

        info.update = props => {
            this._div.innerHTML = props ?
            (`<h4>Deaths by ${selection}</h4>` +
            `<b>${props.state}</b></br>` +
            `Total deaths: ${props.count}`) :
            'Hover over a state';
        }

        info.addTo(map);

    }).catch(error => console.log(error))
}

buildMap('All Cause');

// Make a bar chart using Chart.js
const buildBar = selection => {

}

// Make a line graph using Chart.js
const buildLine = selection => {

}

// Event handler on <select> element to re-build maps every time user selects a new disease
const handleChange = selection => {
    const container = L.DomUtil.get('map');
      if(container != null){
        container._leaflet_id = null;
    }
    buildMap(selection);
    buildBar(selection);
    buildLine(selection);
}
