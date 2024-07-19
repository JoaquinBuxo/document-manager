import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __dirname = new URL('.', import.meta.url).pathname;

export default (env, argv) => {
  const mode = argv.mode || 'development';

  return {
    mode,
    entry: './src/app.ts',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, './dist'),
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: 'ts-loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        inject: 'body',
      }),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, './dist'),
      },
      compress: true,
      port: 9000,
      open: true,
    },
    devtool: mode === 'development' ? 'source-map' : false,
  };
};
