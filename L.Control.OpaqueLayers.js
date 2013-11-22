/*
 * Add opacity control on Leaflet control layer
 */
L.Control.OpaqueLayers = L.Control.Layers.extend({
    setOpacity: function(layerId, value) {
        var obj = this._layers[layerId];

        // If layer has setOpacity
        if (typeof obj.layer.setOpacity === 'function') {
            obj.layer.setOpacity(value);
        }

        return this;
    },

    _createSliderElement: function(name, layerId) {
        var sliderHtml = '<input type="range" min="0" max="1" step="0.1" value="1" layerId="'+layerId+'"></input>';
        var sliderFragment = document.createElement('div');
        sliderFragment.innerHTML = sliderHtml;
        return sliderFragment;
    },

    _onSliderOnChange: function(e, layerId) {
        var sliderElement = e.toElement;

        this._handlingSlider = true;
        if (sliderElement.type == 'range') {
            this.setOpacity(sliderElement.layerId, sliderElement.value);
        }
        this._handlingSlider = false;
    },

    _addItem: function (obj) {
        var labelDiv = document.createElement('div'),
                label = document.createElement('label'),
                input,
                checked = this._map.hasLayer(obj.layer);

        if (obj.overlay) {
            input = document.createElement('input');
            input.type = 'checkbox';
            input.className = 'leaflet-control-layers-selector';
            input.defaultChecked = checked;
        } else {
            input = this._createRadioElement('leaflet-base-layers', checked);
        }

        input.layerId = L.stamp(obj.layer);

        L.DomEvent.on(input, 'click', this._onInputClick, this);

        var name = document.createElement('span');
        name.innerHTML = ' ' + obj.name;

        label.appendChild(input);
        label.appendChild(name);

        labelDiv.appendChild(label);
        if (obj.overlay) {
            // Add slider only if layer allow setOpacity
            if (typeof obj.layer.setOpacity === 'function') {
                var slider = this._createSliderElement(name, L.stamp(obj.layer));
                var input = slider.firstChild;
                input.layerId = L.stamp(obj.layer);
                L.DomEvent.addListener(slider, 'mouseup', this._onSliderOnChange, this);
                labelDiv.appendChild(slider);
            }
        }

        var container = obj.overlay ? this._overlaysList : this._baseLayersList;
        container.appendChild(labelDiv);

        return labelDiv.firstChild;
    },

    _onInputClick: function (e) {
        var i, input, obj,
                inputs = this._form.getElementsByTagName('input'),
                inputsLen = inputs.length,
                baseLayer;

        this._handlingClick = true;

        for (i = 0; i < inputsLen; i++) {
            input = inputs[i];

            // Select only radio and checkbox inputs
            if ((input.type != 'radio') && (input.type != 'checkbox')) {
                continue;
            }
            obj = this._layers[input.layerId];

            if (input.checked && !this._map.hasLayer(obj.layer)) {
                this._map.addLayer(obj.layer);
                if (!obj.overlay) {
                    baseLayer = obj.layer;
                }
            } else if (!input.checked && this._map.hasLayer(obj.layer)) {
                this._map.removeLayer(obj.layer);
            }
        }

        if (baseLayer) {
            this._map.setZoom(this._map.getZoom());
            this._map.fire('baselayerchange', {layer: baseLayer});
        }

        this._handlingClick = false;
    }
});

L.control.opaqueLayers = function (baseLayers, overlays, options) {
    return new L.Control.OpaqueLayers(baseLayers, overlays, options);
};