//-------- Mapa e Layer Base ------------
var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
var mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var satellite = L.tileLayer(mbUrl, { id: 'mapbox/satellite-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr });

var map = L.map('map', {
  center: [0, 0],
  zoom: 0,
  layers: osm
});

//----------- Layers GEOJSON ---------
var utrs = new L.GeoJSON.AJAX("resource/UTRs.geojson");
//utrs.addTo(map);*/
var adutoras = new L.GeoJSON.AJAX("resource/Adutoras.geojson");
//adutoras.addTo(map);
var setores = new L.GeoJSON.AJAX("resource/SetorCom.geojson");
//setores.addTo(map);
var epz = new L.GeoJSON.AJAX("resource/epz.geojson");
//epz.addTo(map);
epz.on('data:loaded', function() {
  map.fitBounds(epz.getBounds());
});

//----------- Controle Layers -----------
var baseLayers = {
  'OSM': osm,
  'Satellite': satellite
};
var overlays = {
  'UTRs': utrs,
  'Adutoras': adutoras,
  'Setor Comercial': setores,
  'EPZs': epz
};
L.control.layers(baseLayers, overlays).addTo(map);

//------- Eventos -----------
map.on('click', onMapClick);

function onMapClick(e) {
  var popup = L.popup();
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map);
}
