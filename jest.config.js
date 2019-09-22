module.exports = {
    setupFilesAfterEnv: ['<rootDir>/tests/test-setup.js'],
    collectCoverageFrom: ['**/src/js/**/*.{js,jsx}', '!**/src/js/index.jsx']
};