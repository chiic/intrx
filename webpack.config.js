module.exports = {
    entry: './src/index.ts',
    mode: 'production',
    output: {
        path: __dirname + '/dist',
        filename: 'index.js',
        libraryTarget: 'umd',
        library: 'Intrx',
        clean: true,
    },
    module: {
        rules: [{
            test: /\.tsx?/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    experiments: {
        outputModule: true
    }
}