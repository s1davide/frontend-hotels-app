const path = require("path") //Proyect location
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const BundleAnalyzerPlugin =
    require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const CompressionPlugin = require("compression-webpack-plugin")
const zlib = require("zlib")
const Dotenv = require("dotenv-webpack")
module.exports = {
    entry: path.resolve(__dirname, "src", "index.js"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "/",
    },
    mode: "development",
    resolve: {
        alias: {
            src: path.resolve(__dirname, "src"), //Allow src as global import
            assets: path.resolve(__dirname, 'assets')
        },
        extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    module: {
        //Loaders rules
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, "src"),
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                    },
                ],
            },
            {
                test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3|webp)$/,
                type: "asset/resource",
                generator: {
                    filename: "[path][name].[hash][ext][query]",
                },
            },

            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "./index.html",
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
        new BundleAnalyzerPlugin(),
        new Dotenv(),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, "public"),
        },
        historyApiFallback: true,
        compress: true,
        port: 3000,
    },
}
