module.exports = {
    port: 8001,
    files: ['./testing/**/*'],
    server: {
        baseDir: './',
        middleware: { 0: null }
    },
    startPath: 'testing/index.html'
};
