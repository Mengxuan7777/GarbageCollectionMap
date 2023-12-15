mapboxgl.accessToken = 'pk.eyJ1IjoianozMDc3IiwiYSI6ImNqdHczOTkwbDBnOHM0Zm82cXo4anplbXYifQ.x1oWtwpzjoGcuqqh7ME79g';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v11',
//   style: 'mapbox://styles/jz3077/ck2nj1ztk0vws1cnru1jxiq4h',
    center: [-74, 40.7],
    zoom: 10.4,
    pitch:0,
    bearing:0
});

// disable map zoom when using scroll
map.scrollZoom.disable();

map.addControl(new mapboxgl.NavigationControl());

function filterBy(year) {
    const filters = ['==', 'YEAR', year];
    map.setFilter('tonnage-extrusion', filters);
 
    // Set the label to the month
    document.getElementById('year').textContent = years[year];
    }

map.on('load', function () {
    // Add a new source from our local GeoJSON data and set the 'type' to 'geojson'.
    map.addSource('nyc-districts', {
        'type': 'geojson',
        'data': '../assets/DSNY Districts_20231015.geojson'
    });
    
    // Now that the source is added, let's add a layer to visualize the GeoJSON data.
    map.addLayer({
        'id': 'district-polygons',
        'type': 'fill',
        'source': 'nyc-districts',
        'layout': {},
        'paint': {
            'fill-color': '#088',
            'fill-opacity': 0.3,
            'fill-outline-color': '#000'
        }
    });

    map.addLayer({
        'id': 'district-outlines',
        'type': 'line',
        'source': 'nyc-districts',
        'layout': {},
        'paint': {
            'line-color': '#000',
            'line-width': 1
        }
    });

});

map.on('load', function () {
    map.addSource('nyc-garages', {
        'type': 'geojson',
        'data': '../assets/DSNY Garages_20231207.geojson'
    });

    map.addLayer({
        'id': 'garages',
        'type': 'circle',
        'source': 'nyc-garages', // Changed to the correct source reference
        'paint': {
            'circle-radius': 4,
            'circle-color': '#B42222'
        },
        'filter': ['==', '$type', 'Point']
    });

});