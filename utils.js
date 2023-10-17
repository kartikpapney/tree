export const constructTree = (data) => {

    const idToNodeMap = {}
    data.forEach(node => {
        idToNodeMap[node._id] = { 
                [node._id]:  {
                label: node.label,
                children: []
            }
        };
    });
    const rootNodes = [];
    data.forEach(node => {
        if (node.parent === null) {
            rootNodes.push(idToNodeMap[node._id]);
        } else {
            idToNodeMap[node.parent][node.parent].children.push(idToNodeMap[node._id]);
        }
    });

    return rootNodes;
};