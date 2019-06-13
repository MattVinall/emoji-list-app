const csvToJSON = require('csvtojson');
const FileSystem = require('fs');

csvToJSON().fromFile('emojis.csv').then((emojis) => {
	console.log(emojis);
});
