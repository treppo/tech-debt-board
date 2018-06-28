const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "tech-debt.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            // Use this template to get basic responsive meta tags
            template: "src/index.html",
            // inject details of output file at end of body
            inject: "body"
        })
    ]
};

const devModule = {
    rules: [
        {
            test: /\.elm$/,
            exclude: [/elm-stuff/, /node_modules/],
            use: [
                {
                    loader: "elm-hot-loader"
                },
                {
                    loader: "elm-webpack-loader",
                    // add Elm's debug overlay to output
                    options: {
                        debug: true,
                        forceWatch: true
                    }
                }
            ]
        }
    ]
};

const prodModule = {
    rules: [
        {
            test: /\.elm$/,
            exclude: [/elm-stuff/, /node_modules/],
            use: [
                {
                    loader: "elm-webpack-loader"
                }
            ]
        }
    ]
};

const serveConfig = {
    inline: true,
    stats: "errors-only",
    content: path.resolve(__dirname, "src/assets"),
    // For SPAs: serve index.html in place of 404 responses
    historyApiFallback: true
};

config.mode = process.env.WEBPACK_SERVE ? 'development' : 'production';

if (config.mode === "production") {
    config.module = prodModule;
} else {
    config.module = devModule;
    config.serve = serveConfig;
}

module.exports = config;
