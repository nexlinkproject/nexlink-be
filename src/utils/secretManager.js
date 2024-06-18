const { SecretManagerServiceClient } = require('@google-cloud/secret-manager')
require('dotenv').config()
const GOOGLE_CLOUD_PROJECT = process.env.GOOGLE_CLOUD_PROJECT

const loadSecrets = async (secretName) => {
  const client = new SecretManagerServiceClient()
  const [version] = await client.accessSecretVersion({
    name: `projects/${GOOGLE_CLOUD_PROJECT}/secrets/${secretName}/versions/latest`
  })

  const payload = version.payload.data.toString('utf8')
  return payload
}

module.exports = { loadSecrets }