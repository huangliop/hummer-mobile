const { injectBabelPlugin } = require('react-app-rewired');

module.exports = function override(config, env) {
    //decorator,要放最前面
    config=injectBabelPlugin('transform-decorators-legacy',config);
    //add antd-mobile
    config = injectBabelPlugin(['import', { libraryName: 'antd-mobile', style: 'css' }], config);
    //正式环境下用cheap-module-source-map
    if(env === "production")config.devtool='cheap-module-source-map';
    return config;
  };