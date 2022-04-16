const fs = require('fs');
const jsonFilePath = 'data.json'

fs.readFile(jsonFilePath, 'utf8', function readFileCallback(err, data) {
    if (err) {
        console.log(err);
    } else {
        jsonData = JSON.parse(data);
        const properties = new Set(...jsonData.map(row => Object.keys(row)));
        console.log("properties", Array.from(properties).join('\n '))
        properties.forEach(property => {
            // if (property === 'AddressType') {
            console.log("-------", property, "------")
            const dataProperty = (jsonData.map(row => row[property]))//LISTA DE DATOS POR PROPIEDAD
            const dataPropertyUniques = new Set(dataProperty)//PROPIEDADES UNICAS
            const dataPropertyNull = dataProperty.filter(data => (data === undefined || data === ''))//PROPIEDADES NULL o VACIAS
            const dataPropertyRepeated = new Set(findDuplicates(dataProperty))
            // const repeatedData = jsonData.filter(data => { if (data[property] == "160913455") return data })
            // console.log("---repeatedData", repeatedData)
            //TODO pasar a CSV la data
            console.log("---dataProperty", dataProperty.length)
            console.log("---dataPropertyRepeated", property === 'CrimeId' ? dataPropertyRepeated : dataPropertyRepeated.size)
            console.log("---dataPropertyUniques", dataPropertyUniques.size)
            console.log("---dataPropertyNull", dataPropertyNull.length)
            // }
        });
    }
});

const findDuplicates = (arr) => {
    let sorted_arr = arr.slice().sort();
    let results = [];
    for (let i = 0; i < sorted_arr.length - 1; i++) {
        if (sorted_arr[i + 1] == sorted_arr[i]) {
            results.push(sorted_arr[i]);
        }
    }
    return results;
}
