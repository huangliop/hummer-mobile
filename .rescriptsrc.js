module.exports=[
      // [
      //   "use-babel-config",
      //   ".babelrc"
      // ],
      [
        "use-eslint-config",
        ".eslintrc"
      ],
      config=>{
        const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
        // console.log(config);
        config.plugins.push(
            new BundleAnalyzerPlugin({
                analyzerMode: "static",
                // openAnalyzer: false,
                reportFilename: "report.html"
            })
        );
        return config;
      }
    ]