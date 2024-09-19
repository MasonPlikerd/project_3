import { map } from './map.js';
const urlMap = {
    'Sea Level': 'https://maps.coast.noaa.gov/arcgis/rest/services/dc_slr/slr_1ft/MapServer/tile/{z}/{y}/{x}',
    };
  

  var slider = document.getElementById("height-sea");
  var selectedHeight = document.getElementById("selected-height");
  slider.addEventListener("change", (e)=>{
    selectedHeight.textContent = slider.value + " ft";
  });
  
  document.addEventListener("DOMContentLoaded", function() {
  const sl = document.getElementById("sl");
    
  
  sl.addEventListener("click",()=>{
    if (sl.checked){
      
      [1,2,3,4,5,6,7,8,9,10].forEach(function(h) {
        var layerId = 'raster-layer'+"Sea Level" +h;
        if (map.getLayer(layerId)) {
            map.removeLayer(layerId);
        }
      });
      [1,2,3,4,5,6,7,8,9,10].forEach(function(h) {
        var layerId = 'raster-layer'+"Sea Level" +h;
        if (map.getLayer(layerId)) {
            map.removeLayer(layerId);
        }
      });
  
      if (!map.getSource('raster-source'+"Sea Level" +slider.value)){
      map.addSource('raster-source'+"Sea Level" +slider.value, {
        type: 'raster',
        tiles: [`https://maps.coast.noaa.gov/arcgis/rest/services/dc_slr/slr_${slider.value}ft/MapServer/tile/{z}/{y}/{x}`],
        tileSize: 256,
      }); 
    }
  
      map.addLayer({
        id: 'raster-layer'+"Sea Level" + slider.value,
        type: 'raster',
        source: 'raster-source'+"Sea Level" + slider.value,
      });
  
    }
  } );
});
  

  clear.addEventListener("click", ()=>{
    [1,2,3,4,5,6,7,8,9,10].forEach(function(h) {
      var layerId = 'raster-layer'+"Sea Level" +h;
      if (map.getLayer(layerId)) {
          map.removeLayer(layerId);
      }
    });

  });
  