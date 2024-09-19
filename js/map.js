mapboxgl.accessToken = 'pk.eyJ1IjoicGFyaWRoaTEyIiwiYSI6ImNsaWMxcnRwejBnYXkzZG1ub21xbmxjdWcifQ.xfiUnCHe2s0IX5NeJ0qSxQ';
// Create a new map instance
export const map = new mapboxgl.Map({
    container: 'map-container',
   style: "mapbox://styles/paridhi12/clkvrhtwx00a101p72ddj8r6v",
    center: [-100.786052, 36.830348],
    zoom: 4.0,
    pitch : 28,
    dragPan: false
  });
  
  // Load the US states GeoJSON data
  map.on('style.load', () => {
    map.addSource('states', {
      type: 'geojson',
      data: 'https://docs.mapbox.com/mapbox-gl-js/assets/us_states.geojson'
    });
    // add states layer
    map.addLayer({
      id: 'state-area',
      type: 'fill',
      source: 'states',
      paint: 
        {
        'fill-color': 'green',
        'fill-opacity': 0.2
  
        }
    });
  
  
    map.addLayer({
      'id':'state-boundaries',
      'type': 'line',
      'source':'states',
      'paint': 
          {
          'line-color':'white',
          'line-width':2,
          'line-opacity':0.2
          }
      },'state-area');
  
  });