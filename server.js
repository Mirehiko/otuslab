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

function getNodeView(item, step) {
    let res = []
    if (!step) {
        res.push( item.name);
    }

    item.items?.forEach((child, index) => {
        const isNotLast = index !== item.items.length -1;
        res.push((isNotLast ? '├── ' : '└─ ') + child.name)
        res.push(...getNodeView(child, step ? step : true).map(i => `${isNotLast ? '│' : ''}   ` + i))
    })
    return res;
}

function drawTree(data) {
    getNodeView(data).forEach(i => {
        console.log(i)
    })
}

drawTree(data)



