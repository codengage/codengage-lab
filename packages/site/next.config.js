const withTM = require('next-transpile-modules');

const package = require('./package.json')

const dependencies = Object.keys(package.dependencies).filter(dependency => dependency.startsWith('@codengage'))

module.exports = withTM(dependencies);