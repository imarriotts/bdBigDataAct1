const fs = require('fs');
const csv = require('csvtojson');
const csvFilePath = 'data_act_01.csv'
const jsonFilePath = 'data_act_01.json'

csv({ delimiter: ";", })
    .fromFile(csvFilePath)
    .then((jsonObj) => {
        fs.writeFileSync(jsonFilePath, JSON.stringify(jsonObj));
    })

csv().fromFile(csvFilePath).then(console.log('ok'));