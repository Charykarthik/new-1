const {BigQuery} = require('@google-cloud/bigquery');
const {Storage} = require('@google-cloud/storage');
const bigquery = new BigQuery();
const storage = new Storage();

exports.transferData = async (event, context) => {
const file = storage.bucket(event.bucket).file(event.name);
const [metadata] = await file.getMetadata();
const dataset = bigquery.dataset('karthikdata');
const table = dataset.table(metadata.name);
await table.load(file);
};
