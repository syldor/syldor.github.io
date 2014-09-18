---
layout: post
title: Make beautiful roads with Leaflet
---
<link rel="stylesheet" type="text/css" href="http://syldor.github.io/metadata/beautiful-roads/css/style.css" media="screen" />

## Make beautiful roads with Leaflet

Leaflet is a great library to deal with geodata on a web site or a web app. We will see here how to create
a map with a layer of roads on it. Leaflet only allows to draw plain linestring, there is no styling function 
to render a road as in a map like this :

![](http://syldor.github.io/metadata/beautiful-roads/img/example.png)

On this image, we can see the main roads in red with a thin black border around.

###  Display a simple map

Let's now create a map with leaflet, say of the Laos. Everything is well explained [here](http://leafletjs.com/examples/quick-start.html).
Do not forget to set a width for your map in your CSS ! Here the JS:

```javascript
var naked_map = L.map('naked_map').setView([18.35, 104.7], 6); 
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {}).addTo(naked_map);
```

The HTML:

```html
<div id="naked_map" > </div>
```

And the CSS: 

```css
#naked_map = {
height: 500px;
}
```

<div id="naked_map"></div>

###  Load the roads layer

Now that we have our base map ready, we can load the roads. Let's use the data from openstreetmap, we can find some sets for the laos [here](http://www.openstreetmap.la/), especially one with the roads in shapefile format. To
be more convenient, I filtered it just to keep the main roads and converted it to geoJSON, all with the nice software
[QGIS](http://www.qgis.org/en/site/) ([file here](laos_roads.json) or in the source code).
Let's add the new roads layer. An easy way to do it, is to open the .json file and add "var laos_roads = " before the json object inside. 

```
var laos_roads = {
"type": "FeatureCollection",
"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },

"features": [
{ "type": "Feature", ...........
```

Then, include the .json file in the head of your index.html. The CSS and HTML are the same as before, except the id is now "roads_map".

```javascript
var roads_map = L.map('roads_map').setView([18.35, 104.7], 6);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {}).addTo(roads_map);

var style = {
	color: 'yellow',
	weight: 2.5,
	opacity: 1
};

var roads_layer = L.geoJson(laos_roads, {style: style}).addTo(roads_map);
```javascript

```
<div id="roads_map"></div>
``
###  Style the roads

And now is the big trick, as it is not possible to style the inside and the outside of a road, let's first display roads with the color of the border we want, red, with a given width of 3, and then display again the same data but with the color of the inside, yellow, and a smaller width.

<pre>`
var final_map = L.map('final_map').setView([18.35, 104.7], 6);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
attribution: '© [OpenStreetMap](http://osm.org/copyright) contributors'
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

<div id="final_map"></div>

We now have a map that looks clean and professional.

<script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>
<script src="http://syldor.github.io/metadata/beautiful-roads/js/roads.js"></script>
<script src="http://syldor.github.io/metadata/beautiful-roads/data/laos_roads.json" type="text/javascript"></script>




