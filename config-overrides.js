const { injectBabelPlugin } = require('react-app-rewired');
const rewireEslint = require('react-app-rewire-eslint');

module.exports = function override(config, env) {  
    //decorator,要放最前面
    config=injectBabelPlugin('transform-decorators-legacy',config);
    //add antd-mobile
    config = injectBabelPlugin(['import', { libraryName: 'antd-mobile', style: 'css' }], config);
    //正式环境下用cheap-module-source-map
    if(env === "production")config.devtool='cheap-module-source-map';
    //开启CSS-module，并排除antd-mobile
    config.module.rules[1].oneOf.unshift(
      {
        test: /\.css$/,
        exclude: /node_modules|antd-mobile\.css/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[local]___[hash:base64:5]'
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                require('autoprefixer')({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
        ]
      }
    );
    config = rewireEslint(config, env,()=>{return {configFile:"src/.eslintrc",fix:true}
});
    return config;
  };