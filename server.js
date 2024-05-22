const fs = require('node:fs');
const {Transform} = require('node:stream');

;(async() => {
	const readStream = fs.createReadStream(__dirname + '/input-text.txt', {encoding: 'utf-8'});
	const writeStream = fs.createWriteStream(__dirname + '/output-text.txt', {encoding: 'utf-8'});
	const process = new Transform({
		transform(chunk, encoding, callback) {
			console.log('Input data:');
			console.log(chunk.toString()+'\n');
			const data = chunk.toString();
			
			const rows = data.split('\n');
			let result = '';
			rows.forEach(row => {
				const words = row.replace(/[\W_]+/g, ' ').split(' ');
				console.log('Row:', row, '.', 'Words:', words)
				const wordEntries = new Map();
				words.forEach(word => {
					const writedWord = wordEntries.get(word);
					if (writedWord) {
						wordEntries.set(word, writedWord + 1)
					}
					else {
						wordEntries.set(word, 1)
					}
				});
				console.log(wordEntries+'\n')
				result += JSON.stringify(Array.from(wordEntries.keys()).sort().reduce((acc, cur) => {
					acc.push(wordEntries.get(cur))
					return acc
				}, [])) + '\n';
			})
			console.log(result)
			callback(null, result)
		},
		flush(callback) {
			this.push();
			callback();
		}
	} );

	readStream.pipe(process).pipe(writeStream)
})()


