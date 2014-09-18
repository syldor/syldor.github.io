var naked_map = L.map('naked_map').setView([18.35, 104.7], 6);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
					    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					}).addTo(naked_map);

var roads_map = L.map('roads_map').setView([18.35, 104.7], 6);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
					    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					}).addTo(roads_map);

var style = {
        color: 'yellow',
        weight: 2.5,
        opacity: 1
      };

var roads_layer = L.geoJson(laos_roads, {style: style}).addTo(roads_map);

var final_map = L.map('final_map').setView([18.35, 104.7], 6);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
					    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					}).addTo(final_map);


var style_border = {
        color: 'red',
        weight: 3,
        opacity: 1
      };

var style_inside = {
        color: 'yellow',
        weight: 2,
        opacity: 1
      };

var border_layer = L.geoJson(laos_roads, {style: style_border}).addTo(final_map);
var inside_layer = L.geoJson(laos_roads, {style: style_inside}).addTo(final_map);
