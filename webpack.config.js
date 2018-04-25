var Encore = require('@symfony/webpack-encore');
const CopyWebpackPlugin = require('copy-webpack-plugin');

Encore
    .setOutputPath('public/build/back')
    .setPublicPath('/build/back')
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .addEntry('js/app', [
        './assets/back/js/src/jquery-extends.js',
        './assets/back/js/src/app.js',
        // Providers
        './assets/back/js/src/provider/provider.js',
        './assets/back/js/src/provider/provider-list.js',
        './assets/back/js/src/provider/chart.js',
        './assets/back/js/src/provider/code.js',
        './assets/back/js/src/provider/editor.js',
        './assets/back/js/src/provider/emoji.js',
        './assets/back/js/src/provider/form.js',
        './assets/back/js/src/provider/icon.js',
        './assets/back/js/src/provider/map.js',
        './assets/back/js/src/provider/table.js',
        './assets/back/js/src/provider/ui.js',
        './assets/back/js/src/provider/upload.js',
        './assets/back/js/src/provider/misc.js',
        // Plugnis
        './assets/back/js/src/plugin/map.js',
        './assets/back/js/src/plugin/modaler.js',
        './assets/back/js/src/plugin/toast.js',
        // Components
        './assets/back/js/src/component/aside.js',
        './assets/back/js/src/component/topbar.js',
        './assets/back/js/src/component/sidebar.js',
        './assets/back/js/src/component/quickview.js',
        './assets/back/js/src/component/dock.js',
        './assets/back/js/src/component/topbar-menu.js',
        './assets/back/js/src/component/lookup.js',
        './assets/back/js/src/component/cards.js',
        './assets/back/js/src/app-extra.js',
        './assets/back/js/src/app-init.js'
    ])
    .addEntry('js/core', [
        './assets/back/vendor/pace/pace.min.js',
        './assets/back/vendor/popper/popper.min.js',
        './assets/back/vendor/lab/LAB.min.js',
        './assets/back/vendor/jquery.hotkeys/jquery.hotkeys.js',
        './assets/back/vendor/push/push.min.js',
        './assets/back/vendor/animsition/js/animsition.min.js',
        './assets/back/vendor/perfect-scrollbar/js/perfect-scrollbar.jquery.min.js'
    ])
    .addEntry('js/script', './assets/back/js/script/main.js')
    .createSharedEntry('vendor', [
        './assets/back/vendor/jquery/jquery.min.js',
        './assets/back/vendor/bootstrap/js/bootstrap.min.js',
    ])
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