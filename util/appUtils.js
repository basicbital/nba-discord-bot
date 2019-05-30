// import { chickisms } from '../constants/chickisms'
const { chickisms } = require('../constants/chickisms')
/**
 * @return {string} return random Chick Hearn quote (chickism)
 */
const getChickism = function () {
  const length = Object.keys(chickisms).length
  const randomIndex = Math.floor(Math.random() * length)
  return chickisms[randomIndex.toString()]
}

module.exports.getChickism = getChickism
