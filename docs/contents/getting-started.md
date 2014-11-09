---
title: Getting started
slug: getting-started
template: doc.html
changefreq: daily
priority: 0.9
---

# Overview
To use Marionette Components, heads up first to the [download page](download.html).

# Usage
Marionette Components was built with flexibility in mind. That is why each module is wrapped in a UMD wrapper to allow every developper to have access to it using RequireJS or Browserify.

## Requirements
Marionette Components has couple of dependencies to run if you are using the source version. The bundled version already contains the dependencies it needs.

### RequireJS
Marionette Components expects you to define some alias in your RequireJS config to be able to work. It expects to have access to `marionette`, `backbone`, `jquery`, `hbs`, and `underscore`. Here's an example :

```javascript
requirejs.config({
    paths: {
        backbone: 'bower_components/backbone/backbone',
        marionette: 'bower_components/marionette/lib/core/backbone.marionette',
        hbs: 'bower_components/require-handlebars-plugin/hbs',
        underscore: 'bower_components/underscore/underscore',
        jquery: 'bower_components/jquery/dist/jquery'
    }
});
```

### Browserify
Marionette Components expects you to have `backbone`, `backbone.marionette`, `jquery`, `underscore`, and `handlebars`.