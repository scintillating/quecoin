module.exports = function override(config, env) {
    // do stuff with the webpack config...
    config.resolve.plugins = []; // Remove ModuleScope plugin
    return config;
};