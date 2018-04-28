var Encore = require('@symfony/webpack-encore');
const CopyWebpackPlugin = require('copy-webpack-plugin');

Encore
    .setOutputPath('public/build/back')
    .setPublicPath('/build/back')
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .addEntry('js/ckeditor', './assets/back/js/ckeditor.js')
    .addStyleEntry('css/core', [
        './assets/back/vendor/bootstrap/css/bootstrap.min.css',
        './assets/back/vendor/font-awesome/css/font-awesome.min.css',
        './assets/back/vendor/themify-icons/css/themify-icons.css',
        './assets/back/vendor/animsition/css/animsition.min.css',
        './assets/back/vendor/perfect-scrollbar/css/perfect-scrollbar.min.css'
    ])
    .addStyleEntry('css/app', [
        './assets/back/css/scss/app.scss',
        './assets/back/css/style.scss'
    ])
    .enableSassLoader()
    .enableSourceMaps(!Encore.isProduction())
    .enableSourceMaps(true)
    .enableVersioning(Encore.isProduction())
    .addPlugin(new CopyWebpackPlugin([
        { from: './assets/back/static', to: 'static' }
    ]))
;

module.exports = Encore.getWebpackConfig();