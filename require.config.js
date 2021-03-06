requirejs.config({
    hbs: {
        helpers: true,
        i18n: false,
        templateExtension: 'hbs'
    },

    paths: {
        backbone: 'bower_components/backbone/backbone',
        'backbone.babysitter': 'bower_components/backbone.babysitter/lib/amd/backbone.babysitter',
        'backbone.wreqr': 'bower_components/backbone.wreqr/lib/amd/backbone.wreqr',
        marionette: 'bower_components/marionette/lib/core/backbone.marionette',
        hbs: 'bower_components/require-handlebars-plugin/hbs',
        underscore: 'bower_components/underscore/underscore',
        jquery: 'bower_components/jquery/dist/jquery'
    }
});
