module.exports=[
      [
        "use-babel-config",
        ".babelrc"
      ],
      [
        "use-eslint-config",
        ".eslintrc"
      ],
      config=>{
        const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
        // console.log(config);
        if(config.mode==='production'){
          config.plugins.push(
            new BundleAnalyzerPlugin({
                analyzerMode: "static",
                // openAnalyzer: false,
                reportFilename: "report.html"
            })
        );
        if (process.env.npm_lifecycle_event === "build") {
            config.devtool = "cheap-module-source-map";
        }
        }
        return config;
      }
    ]