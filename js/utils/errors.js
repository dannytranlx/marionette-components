define([], function() {
    return {
        /**
         * Throws an error
         * (taken from Marionette source code)
         * @param  {String} message description of the error
         * @param  {String} name    name of the error
         */
        throwError: function(message, name) {
            var error = new Error(message);
            error.name = name || 'Error';
            throw error;
        }
    };
});