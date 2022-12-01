const predictor = require('./src/predictor.js')
const { Parser } = require('json2csv')

const json2csvParser = new Parser()

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
const predict = async (req, res) => {
  // check if request has 'playoffs' argument
  let playoffsRequested = 'playoffs' in req.query
  if (playoffsRequested) console.log(`Playoffs requested`)

  // get predction JSON
  let resp = await predictor.predict(playoffsRequested)
  console.log(`Response obtained`)

  // parse JSON into CSV
  let csv = json2csvParser.parse(resp)
  console.log(`CSV generated:\n${csv}`)

  // update response attributes
  res.status(200)
  res.header('Content-Type', 'text/csv')
  res.attachment('prediction.csv')

  // return parsed csv to download
  return res.send(csv)
}

module.exports = { predict }
