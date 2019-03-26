const config = require('./jest.config')
config.testRegex = 'unitTest.js$'
console.log('RUNNING UNIT TESTS')
module.exports = config
