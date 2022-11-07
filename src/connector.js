const { Storage } = require('@google-cloud/storage')
const csv = require('csvtojson')

let options = {
  projectId: 'phoenix-cit'
}

// The ID of your GCS bucket
const bucketName = 'paul-octopus-2022'

// download file from bucket
const fetchFileAsJSON = async (fileName) => {
  // use local service_account if not in prod
  if (!process.env.PROD) {
    options['keyFilename'] = 'key.json'
  }

  // Creates a client using Application Default Credentials
  const storage = new Storage(options)

  // dowload the file rankins.csv from the storage
  await storage
    .bucket(bucketName)
    .file(fileName)
    .download({ destination: '/tmp/' + fileName })

  console.log(`File ${fileName} downloaded`)

  // return the rankings json
  return await csv().fromFile('/tmp/' + fileName)
}

module.exports = { fetchFileAsJSON }
