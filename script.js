// Créez une carte Leaflet centrée sur une position donnée
var map = L.map('map').setView([44.826, -0.555], 7,5);

// Ajoutez une couche de tuiles OpenStreetMap à la carte
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Chargez le fichier GeoJSON avec les polygones
$.getJSON("georef-france-epci.geojson", function(data) {
  // Ajoutez les polygones à la carte
  L.geoJSON(data, {
    style: function(feature) {
        switch (feature.properties.AOM) {
          case 'NON': return {color: "#ff0000", fillColor: "#ff0000", fillOpacity: 0.5};
          case 'OUI': return {color: "#0000ff", fillColor: "#0000ff", fillOpacity: 0.5};
          default: return {color: "#000000", fillColor: "#000000", fillOpacity: 0.5};
        }
      },
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<strong>" + feature.properties.epci_name + "</strong><br>AOM : " + feature.properties.AOM);;
    }
  }).addTo(map);
});