const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
      hot: 'only',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template:'./index.html',
        title:'JATE Text Editor'
      }),
      new InjectManifest({
        swSrc:'/src-sw.js',
        swDest:'src-sw.js'
      }),
      new WebpackPwaManifest({
        name: 'JATE TEXT EDITOR',
        short_name: 'JATE',
        description: 'Creative text editor online or offline',
        background_color: '#453430',
        theme_color: '#453430',
        start_url: '/',
        publicPath: '/',
        fingerprints: false,
        inject: true,
        icons: [
          {
            src: path.resolve('./src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons',),
          },
        ],
      }),
      
    ],
// confiles css loader  and babel to webpack 
// module other codes chucks of code that wil find certain files
// paramasis short for  parameters are variables that you list as part of a function definition
// put them into the loader  
    module: {
      rules: [
        {
          // Adding CSS Loader
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
        },   
        // loads images
        {
          test:/\.(png|svg|jpg|jpeg|gif)$/i,
          type:'assets/resource',
        },
        // Adding babel loader  
        // loads any functionality 
        // babels up
        // complies js 
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread',
                        '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};