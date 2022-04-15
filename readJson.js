const fs = require('fs');
const jsonFilePath = 'data_act_01.json'

fs.readFile(jsonFilePath, 'utf8', function readFileCallback(err, data) {
    if (err) {
        console.log(err);
    } else {
        jsonData = JSON.parse(data);
        const properties = new Set(...jsonData.map(row => Object.keys(row)));
        console.log("properties", Array.from(properties).join('\n '))
        properties.forEach(property => {
            console.log("-------", property, "------")
            const dataProperty = (jsonData.map(row => row[property]))//LISTA DE PROPIEDADES
            const dataPropertyUniques = new Set(dataProperty)//PROPIEDADES UNICAS
            const dataPropertyNull = dataProperty.filter(data => (data === undefined || data === ''))//PROPIEDADES NULL o VACIAS
            console.log("---dataProperty", dataProperty.length)
            console.log("---dataPropertyUniques", dataPropertyUniques.size)
            console.log("---dataPropertyNull", dataPropertyNull.length)
        });
    }
});