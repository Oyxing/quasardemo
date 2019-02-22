// Configuration for your app

module.exports = function(ctx) {
    return {
        // app plugins (/src/plugins)
        plugins: [
            'i18n',
            'axios',
            'elementui',
            'Cookies',
            'VueJsonp'
        ],
        css: [
            'app.styl',
            'font.css',
        ],
        extras: [
            ctx.theme.mat ? 'roboto-font' : null,
            'material-icons' // optional, you are not bound to it
            // 'ionicons',
            // 'mdi',
            // 'fontawesome'
        ],
        supportIE: true,
        build: {
            scopeHoisting: true,
            // vueRouterMode: 'history',
            // vueCompiler: true,
            // gzip: true,
            // analyze: true,
            // extractCSS: false,
            extendWebpack(cfg) {}
        },
        devServer: {
            https: true,
            port: 8082,
            open: true // opens browser window automatically
        },
        // framework: 'all' --- includes everything; for dev only!
        framework: {
            components: [
                'QLayout',
                'QLayoutHeader',
                'QLayoutDrawer',
                'QPageContainer',
                'QPage',
                'QToolbar',
                'QToolbarTitle',
                'QBtn',
                'QUploader',
                'QIcon',
                'QList',
                'QListHeader',
                'QItem',
                'QItemMain',
                'QItemSide',
                'QInput',
                'QTable',
                // 只选择你正在使用的内容：
                'QTh',
                'QTr',
                'QTd',
                'QTableColumns'
            ],
            directives: [
                'Ripple',
            ],
            // Quasar plugins
            plugins: [
                    'Notify'
                ]
                // iconSet: ctx.theme.mat ? 'material-icons' : 'ionicons'
                // i18n: 'de' // Quasar language
        },
        // animations: 'all' --- includes all animations
        animations: [],
        ssr: {
            pwa: false
        },
        pwa: {
            // workboxPluginMode: 'InjectManifest',
            // workboxOptions: {},
            manifest: {
                // name: 'Quasar App',
                // short_name: 'Quasar-PWA',
                // description: 'Best PWA App in town!',
                display: 'standalone',
                orientation: 'portrait',
                background_color: '#ffffff',
                theme_color: '#027be3',
                icons: []
            }
        },
        cordova: {
            // id: 'org.cordova.quasar.app'
        },
        electron: {
            // bundler: 'builder', // or 'packager'
            extendWebpack(cfg) {
                // do something with Electron process Webpack cfg
            },
            packager: {
                // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

                // OS X / Mac App Store
                // appBundleId: '',
                // appCategoryType: '',
                // osxSign: '',
                // protocol: 'myapp://path',
                arch: 'ia32',
                platform: 'win32'
                    // Window only
                    // win32metadata: { ... }
            },
            builder: {
                // https://www.electron.build/configuration/configuration

                appId: 'youbei-app'
            }
        }
    }
}