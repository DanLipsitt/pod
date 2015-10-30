var path = require('path');

module.exports = {
    entry: "./client/js/main.jsx",
    output: {
        path: path.join(__dirname, "build/js"),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: "style!css"},
            {test: /\.js$/,  exclude: /node_modules/, loader: "babel-loader"},
            {test: /\.jsx$/, exclude: /node_modules/, loader: "babel-loader"},
        ]
    }
};
