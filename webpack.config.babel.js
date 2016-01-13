import webpack from 'webpack';
import autoprefixer from 'autoprefixer';

export default {
  entry: './src/App.jsx',
  output: {
    path: 'dist',
    publicPath: '/assets/',
    filename: 'app.js'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.scss$/, loader: 'style!css!postcss!sass' }
    ]
  },
  resolve: {
    modulesDirectories: ['node_modules', 'src'],
    extensions: ['', '.js', '.jsx', '.scss']
  },
  postcss: () => {
    return [autoprefixer];
  }
}