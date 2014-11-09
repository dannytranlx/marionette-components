(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof exports === "object") {
        module.exports = factory();
    }
})(this, function() {

    return {
        /**
         * Throws an error
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