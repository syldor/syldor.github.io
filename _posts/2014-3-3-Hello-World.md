<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="../../assets/ico/favicon.ico">

    <link rel="stylesheet" type="text/css" href="laos_style.css">
    <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css" />
    <script src="laos_roads.json" type="text/javascript"></script>
    <title>Create beautiful roads with Leaflet</title>

    <!-- Bootstrap core CSS -->
    <link href="bootstrap-3.1.1/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap theme -->
    <link href="bootstrap-3.1.1/dist/css/bootstrap-theme.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="theme.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="style.css" media="screen" />
    <link href="blog.css" rel="stylesheet">

    <script src="http://openlayers.org/api/OpenLayers.js"></script>
    <script src="scripts.js" type="text/javascript"></script>
  </head>

  <body>

    <!-- Fixed navbar -->
    <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          [](#)
        </div>
        <div class="navbar-collapse collapse">

*   [Home](index.html)
*   [Projects ](#)

        *   [Genea](genea.html)
    *   [Appycenter](appycenter.html)
        </div><!--/.nav-collapse -->
      </div>
    </div>

    <div class="container" >
      <div class="row">
        <div class="col-sm-8 blog-main">
          <div class="blog-post">

## Make beautiful roads with Leaflet

            Leaflet is a great library to deal with geodata on a web site or a web app. We will see here how to create
            a map with a layer of roads on it. Leaflet only allows to draw plain linestring, there is no styling function 
            to render a road as in a map like this :

            ![](example.png)

On this image, we can see the main roads in red with a thin black border around.

###  Display a simple map

            Let's now create a map with leaflet, say of the Laos. Everything is well explained [here](http://leafletjs.com/examples/quick-start.html).
            Do not forget to set a width for your map in your CSS ! Here the JS: </p>

    var naked_map = L.map('naked_map').setView([18.35, 104.7], 6); 
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {}).addTo(naked_map);
                `</pre> 

                The HTML:
                <pre>`
    <div id="naked_map" > </div>
                `</pre> 
                And the CSS: 
                <pre>`
    #naked_map = {
      height: 500px;
    }
                `</pre> 

                <div id="naked_map"></div>

    ###  Load the roads layer

                Now that we have our base map ready, we can load the roads. Let's use the data from openstreetmap, we can find some sets for the laos [here](http://www.openstreetmap.la/), especially one with the roads in shapefile format. To
                be more convenient, I filtered it just to keep the main roads and converted it to geoJSON, all with the nice software
                [QGIS](http://www.qgis.org/en/site/) ([file here](laos_roads.json) or in the source code).
                Let's add the new roads layer. An easy way to do it, is to open the .json file and add "var laos_roads = " before the json object inside. 

                <pre>`
    var laos_roads = {
    "type": "FeatureCollection",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },

    "features": [
    { "type": "Feature", ...........
                `</pre> 

                Then, include the .json file in the head of your index.html. The CSS and HTML are the same as before, except the id is now "roads_map".
                </p>
                            <pre>`
    var roads_map = L.map('roads_map').setView([18.35, 104.7], 6);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {}).addTo(roads_map);

    var style = {
            color: 'yellow',
            weight: 2.5,
            opacity: 1
          };

    var roads_layer = L.geoJson(laos_roads, {style: style}).addTo(roads_map);
                `</pre> 
                <div id="roads_map"></div>

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

          </div>
        </div>
      <div class="col-sm-3 col-sm-offset-1 blog-sidebar">
          <div class="sidebar-module sidebar-module-inset">

#### About

I'm currently working at [Phoenix-ISI](http://www.phoenix-isi.fr/fr/) on roads traffic and GIS projects for France and Laos. If you are interested in those topics or some other stuffs, I'd be glad to hear from you ! dorey.sylvain and then gmail. 

          </div>
        </div><!-- /.blog-sidebar -->
      </div>
    </div>

    </div> <!-- /container -->

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="bootstrap-3.1.1/dist/js/bootstrap.min.js"></script>
    <script src="bootstrap-3.1.1/assets/js/docs.min.js"></script>
    <script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>
    <script src="roads.js"></script>

    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-50139629-1', 'sylvaindorey.com');
      ga('send', 'pageview');

    </script>

  </body>
</html>