module.exports = function () {
    var cache = {};
    return {
        get: function (key) {
          return cache[key];
        },
        set: function (key, val) {
          console.log("Objeto " + key + " salvo na memória");
          cache[key] = val;
        }
    }
}();
