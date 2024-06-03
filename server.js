module.exports = class TreeViewer {
	getNodeView(item, step) {
		let res = []
		if (!step) {
			res.push( item.name);
		}

		item.items?.forEach((child, index) => {
			const isNotLast = index !== item.items.length -1;
			res.push((isNotLast ? '├── ' : '└─ ') + child.name)
			res.push(...this.getNodeView(child, step ? step : true).map(i => `${isNotLast ? '│' : ''}   ` + i))
		})
		return res;
	}

	drawTree(data) {
		this.getNodeView(data).forEach(i => {
			console.log(i)
		})
	}
}



