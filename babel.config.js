module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            // if you kept path aliases:
            // ['module-resolver', { root: ['./'], alias: { '~': './src' }, extensions: ['.ts','.tsx','.js','.jsx','.json'] }],

            // 👇 replace the old plugin with this one and keep it LAST
            'react-native-worklets/plugin',
        ],
    };
};