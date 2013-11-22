Leaflet.Control.OpaqueLayers
=============================

Extends Leaflet default control layer by adding a way to adjust opacity of each layer.

Check out the [demo] !


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