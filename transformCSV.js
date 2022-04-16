const fs = require('fs');
const csv = require('csvtojson');
const csvFilePath = 'data.csv'
const jsonFilePath = 'data.json'

csv({ delimiter: ";", })
    .fromFile(csvFilePath)
    .then((jsonObj) => {
        fs.writeFileSync(jsonFilePath, JSON.stringify(jsonObj));
    })

csv().fromFile(csvFilePath).then(console.log('ok'));