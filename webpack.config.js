const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "build"),
    },
    // mode: "development",
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "public", "index.html"),
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, "build"),
        },
        port: 8888,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            // {
            //     test: /\.css$/,
            //     exclude: /node_modules/,
            //     use: ['style-loader', 'css-loader'],
            // },
        ],
    },
    resolve: {
        extensions: ["*", ".js", ".jsx"],
    },
    devServer: {
        historyApiFallback: true,
    },
};
