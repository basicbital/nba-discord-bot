const config = require('./jest.config')
config.testRegex = 'intTest\\.js$'
console.log('RUNNING INTEGRATION TESTS')
module.exports = config
