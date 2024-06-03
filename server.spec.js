const fs = require('node:fs');
const path = require('node:path');
const TreeViewer = require('./server');

const data = {
	"name": 1,
	"items": [{
		"name": 2,
		"items": [{ "name": 3, "items": [{"name": 0}] }, { "name": 4 }]
	}, {
		"name": 5,
		"items": [{ "name": 6 }]
	},
		{
			"name": 7,
			"items": [{ "name": 8, "items": [{"name": 9}] }]
		}]
};


describe('Tree Viewer', () => {
	const treeViewer = new TreeViewer();
	it('should getNodeView called', async () => {
		const getNodeView = jest.spyOn(treeViewer, 'getNodeView');
		const drawTree = jest.spyOn(treeViewer, 'drawTree');
		treeViewer.drawTree(data)
		expect(drawTree).toHaveBeenCalledTimes(1);
		expect(drawTree).toHaveBeenCalledWith(data);
		expect(getNodeView).toHaveBeenCalled()
	});
});
