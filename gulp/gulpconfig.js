'use strict';

let config = {
    base: 'src',
    index: 'src/index.html',
    testIndex: 'test/index.html',
    testBase: 'test',
    sources: {
        scripts: ['src/**/*.ts', 'typings/index.d.ts'],
        templates: ['src/app/**/*.html'],
        styles: ['src/styles/*.css', 'src/styles/*.css.map'],
        assets: ['src/img/**/*'],
        fonts: ['src/fonts/*.eot', 'src/fonts/*.svg', 'src/fonts/*.ttf', 'src/fonts/*.woff', 'src/fonts/*.woff2'],
        specs: ['test/**/*.spec.ts', 'test/**/*.ts']
    },
    targets: {
        build: 'build',
        lib: 'build/lib',
        styles: 'build/css',
        assets: 'build/img',
        fonts: 'build/fonts',
        testing: 'testing',
        testassets: 'testing/img'
    },
    vendorScripts: [
        'node_modules/core-js/client/shim.js',
        'node_modules/oidc-client/dist/oidc-client.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/zone.js/dist/long-stack-trace-zone.js',
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/lodash/lodash.min.js'
    ],
    nodeModules: [
        '@angular',
        'rxjs',
        'moment',
        'jsrsasign'
    ],
    externalModules: {
    },
    typeScript: {
        buildMode: 'default',
        compilerOptions: {
            target: 'ES5',
            module: 'system',
            moduleResolution: 'node',
            sourceMap: true,
            emitDecoratorMetadata: true,
            experimentalDecorators: true,
            removeComments: false,
            noImplicitAny: false
        },
    }
};

config.typeScriptFastBuild = {
    buildMode: 'fast',
    compilerOptions: Object.assign({}, config.typeScript.compilerOptions, { isolatedModules: true })
};

module.exports = config;
