const Encore = require('@symfony/webpack-encore');
const CopyWebpackPlugin = require('copy-webpack-plugin');

Encore
    .setOutputPath('public/build/front')
    .setPublicPath('/build/front')
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .addEntry('js/app', './assets/front/javascript/main.js')
    // css entry
    .addStyleEntry('css/main','./assets/front/stylesheets/bootstrap.min.css')
    .addStyleEntry('css/app', [
        './assets/front/stylesheets/fancybox.css',
        './assets/front/stylesheets/responsive.css',
        './assets/front/stylesheets/colors/color1.css',
        './assets/front/stylesheets/themify-icons.css',
        './assets/front/stylesheets/font-awesome.css',
        './assets/front/stylesheets/elegant.css',
        './assets/front/stylesheets/flexslider.css',
        './assets/front/stylesheets/owl.carousel.css',
        './assets/front/stylesheets/shortcodes.css',
        './assets/front/stylesheets/style.css'
    ])
    //.enableSassLoader()
    //.enableLessLoader()
    // allows legacy applications to use $/jQuery as a global variable
    .autoProvidejQuery()
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

const secondConfig = Encore.getWebpackConfig();
secondConfig.name = 'secondConfig';

module.exports = [firstConfig, secondConfig];