const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const { GOOGLE_CLOUD_PROJECT, SECRET_MANAGER_ID } = require('../config');

const loadSecrets = async () => {
    const client = new SecretManagerServiceClient();
    const [version] = await client.accessSecretVersion({
        name: `projects/${GOOGLE_CLOUD_PROJECT}/secrets/${SECRET_MANAGER_ID}/versions/latest`,
    });

    const payload = version.payload.data.toString('utf8');
    const secrets = JSON.parse(payload);
    process.env.JWT_SECRET = secrets.JWT_SECRET;
};

module.exports = { loadSecrets };
