const WebpackAutoInject = require("webpack-auto-inject-version");
module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "././" : "./",
    outputDir: "dist",
    indexPath: process.env.INDEX_PATH,
    productionSourceMap: process.env.VUE_APP_ENV != "production",
    pages: {
        index: {
            entry: "src/main.ts",
            title: "首页",
            chunks: ["chunk-vendors", "chunk-common", "index"]
        },
    },
    chainWebpack(config) {
        config.resolve.extensions
            .add(".ts")
            .add(".tsx")
            .end()
            .end()
            .module.rule("typescript")
            .test(/\.tsx?$/)
            .use("babel-loader")
            .loader("babel-loader")
            .end()
            .use("ts-loader")
            .loader("ts-loader")
            .options({
                transpileOnly: true,
                appendTsSuffixTo: ["\\.vue$"],
                happyPackMode: false,
            })
            .end();
    },
    configureWebpack: {
        plugins: [
            new WebpackAutoInject({
                components: {
                    InjectByTag: true,
                },
                componentsOptions: {
                    InjectByTag: {
                        fileRegex: /\.+/,
                        AIVTagRegexp: /(\[AIV])(([a-zA-Z{} ,:;!()_@\-"'\\\/])+)(\[\/AIV])/g,
                        dateFormat: "yyyymdd-hhMMss",
                    },
                },
            }),
        ],
    }

};
