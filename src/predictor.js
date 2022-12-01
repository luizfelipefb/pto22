const connector = require('./connector.js')

const getRanking = async () => {
  let json = await connector.fetchFileAsJSON('ranking.csv')

  // get latest date
  let date = new Date('1970-01-01')
  json.forEach((e) => {
    if (new Date(e.rank_date) > date) {
      date = new Date(e.rank_date)
    }
  })

  // get latest ranking from each country
  let filtered = json.filter((e) => new Date(e.rank_date).getTime() == date.getTime())

  // get ranked object
  let obj = {}
  filtered.forEach((e) => {
    // cleanup different name
    if (e.country_full == 'IR Iran') {
      e.country_full = 'Iran'
    }
    if (e.country_full == 'Korea DPR') {
      e.country_full = 'South Korea'
    }

    // add country to ranking list
    obj[e.country_full] = e
  })

  return obj
}

const getSchedule = async (playoffs) => {
  let filename = 'matches-schedule.csv'
  if (playoffs) filename = 'playoffs-schedule.csv'
  return await connector.fetchFileAsJSON(filename)
}

const predict = async (playoffs) => {
  const ranking = await getRanking()
  const schedule = await getSchedule(playoffs)

  let results = []
  schedule.forEach((s) => {
    /*
     * simply give a 1x0 win to best ranking country
     */

    // decide winner based on ranking
    let homeWinner = Number(ranking[s.country1].rank) < Number(ranking[s.country2].rank)

    // generate match result
    let match = {
      home: s.country1,
      home_score: homeWinner ? 1 : 0,
      away_score: !homeWinner ? 1 : 0,
      away: s.country2
    }

    // add match result to pool
    results.push(match)
  })

  console.log(`Matches result builded: ${JSON.stringify(results)}`)

  return results
}

module.exports = { predict }
