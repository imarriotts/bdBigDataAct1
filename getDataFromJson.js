const fs = require('fs');
const jsonFilePath = 'data.json'
const jsonCleanFilePath = 'cleanData.json'

let cleanJson = [];
let i = 0
fs.readFile(jsonFilePath, 'utf8', function readFileCallback(err, data) {
    if (err) {
        console.log(err);
    } else {
        jsonData = JSON.parse(data);
        const properties = new Set(...jsonData.map(row => Object.keys(row)));
        jsonData.forEach(element => {
            let addElement = true;
            properties.forEach(property => {
                const data = element[property];
                switch (property) {
                    case 'CrimeId':
                        if (!isNumeric(data)) addElement = false
                        break;
                    case 'OriginalCrimeTypeName':
                        if (!isValidString(data)) addElement = false
                        break;
                    case 'OffenseDate':
                        break;
                    case 'CallDateTime':
                        break;
                    case 'Disposition':
                        if (data.length != 3 && data != 'Not recorded') addElement = false
                        break;
                    case 'Address':
                        break;
                    case 'City':
                        if (!isValidString(data)) addElement = false
                        break;
                    case 'State':
                        if (!isValidString(data)) addElement = false
                        if (data.length != 2) addElement = false
                        break;
                    case 'AgencyId':
                        if (!isNumeric(data)) addElement = false
                        break;
                    case 'AddressType':
                        if (!isValidString(data)) addElement = false
                        break;
                    default:
                        break;
                }
            });
            if (addElement) cleanJson.push(element)
        });
    }
    // console.log(cleanJson)
    console.log(cleanJson.length)
    fs.writeFile(jsonCleanFilePath, JSON.stringify(cleanJson), (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;
        // success case, the file was saved
        console.log('OK');
    });

});

const isNumeric = (str) => {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

const isValidString = (str) => {
    if (typeof str != "string") return false
    if (str === '') return false
    if (str.includes('*')) return false
    if (str.includes('/')) return false
    if (str.includes('\\')) return false
    if (str.includes('`')) return false
    if (isNumeric(str)) return false
    return true
}