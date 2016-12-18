import lightpack from 'lightpack'
import path from 'path'
import CopyWebpackPlugin from 'copy-webpack-plugin'

module.exports = lightpack({
  entry: ['./src/index'],
  plugins: [
    new CopyWebpackPlugin([
      { from: path.resolve('./src/assets'), to: 'assets' }
    ])
  ]
}, process.env.NODE_ENV)