const fs = require('node:fs');
const {Transform} = require('node:stream');


class ParserTransform extends Transform {
	result = '';
	_transform(chunk, encoding, callback) {
		console.log('Input data:');
		console.log(chunk.toString()+'\n');
		const data = chunk.toString();

		const rows = data.split('\n');
		this.result = '';
		rows.forEach(row => {
			const words = row.replace(/[\W_]+/g, ' ').split(' ');
			console.log('Row:', row, '.', 'Words:', words)
			const wordEntries = new Map();
			words.forEach(word => {
				const writtenWord = wordEntries.get(word);
				if (writtenWord) {
					wordEntries.set(word, writtenWord + 1)
				}
				else {
					wordEntries.set(word, 1)
				}
			});
			console.log(wordEntries+'\n')
			this.result += JSON.stringify(Array.from(wordEntries.keys()).sort().reduce((acc, cur) => {
				acc.push(wordEntries.get(cur))
				return acc
			}, [])) + '\n';
		})
		console.log(this.result)
		callback(null)
	}

	_flush(callback) {
		console.warn('asdasd', this.result)
		this.push(this.result)
	}
}

;(async() => {
	const readStream = fs.createReadStream(__dirname + '/input-text.txt', {encoding: 'utf-8'});
	const writeStream = fs.createWriteStream(__dirname + '/output-text.txt', {encoding: 'utf-8'});
	readStream.pipe(new ParserTransform()).pipe(writeStream)
})()


