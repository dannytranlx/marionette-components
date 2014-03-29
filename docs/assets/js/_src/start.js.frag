(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        root.MarionetteComponentsDocs = factory();
    }
}(this, function () {
    'use strict';

