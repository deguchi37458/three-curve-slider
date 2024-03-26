const path = require('path');

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js",
    assetModuleFilename: 'images/[name][ext]', // 画像ファイルの出力先を指定
    publicPath: '/shader-img-animation/', // URL 解決用のルートパス
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 8080,
  },
  resolve: {
    extensions: [".js", ".glsl", ".vs", ".fs"], // 拡張子のドットを追加
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(glsl|vert|frag)$/,
        use: "shader-loader",
      },
      {
        test: /\.(png|jpe?g|gif)$/i, // 画像ファイル用のローダー
        type: 'asset/resource',
      },
    ],
  },
};
