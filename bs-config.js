module.exports = {
    port: 8020,
    files: ['./build/**/*.{html,css,js}'],
    server: {
        baseDir: './build',
        middleware: { 0: null }
    },
    open: false,
    injectChanges: true
};
