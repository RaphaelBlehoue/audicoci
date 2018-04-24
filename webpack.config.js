var Encore = require('@symfony/webpack-encore');
const CopyWebpackPlugin = require('copy-webpack-plugin');

Encore
    .setOutputPath('public/build/front')
    .setPublicPath('/build/front')
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()

    // css entry
    .addStyleEntry('css/main', [
        './assets/front/css/theme/business.css',
        './assets/front/css/theme/css/fonts.css',
        './assets/front/css/theme/css/colors.css',
        './assets/front/css/theme/onepage/css/et-line.css'
    ])
    //.enableSassLoader()
    .enableLessLoader()
    // allows legacy applications to use $/jQuery as a global variable
    // .autoProvidejQuery()
    .enableSourceMaps(!Encore.isProduction())
    .enableSourceMaps(true)
    .enableVersioning(Encore.isProduction())
    .addPlugin(new CopyWebpackPlugin([
        { from: './assets/front/static', to: 'static' }
    ]))
;

const firstConfig = Encore.getWebpackConfig();
firstConfig.name = 'firstConfig';

Encore.reset();

Encore
    .setOutputPath('public/build/back')
    .setPublicPath('/build/back')
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
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
const secondConfig = Encore.getWebpackConfig();
secondConfig.name = 'secondConfig';

module.exports = [firstConfig, secondConfig];