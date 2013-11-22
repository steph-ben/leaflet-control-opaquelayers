Leaflet.Control.OpaqueLayers
=============================

Add opacity control for Leaflet layers.

Check out the [demo](http://steph-ben.github.io/leaflet-control-opaquelayers/demo/) !


Usage
-----

Like Leaflet [Layers Control](http://leafletjs.com/examples/layers-control.html)
```
    var baseMaps = {
        "Minimal": minimal,
        "Night View": midnight
    };

    var overlayMaps = {
        "Motorways": motorways,
        "Cities": cities
    };
    
    L.control.layers(baseMaps, overlayMaps).addTo(map);
```


Authors
-------
Stéphane Benchimol