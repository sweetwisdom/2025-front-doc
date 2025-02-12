//树形数据转换

let arrayData = [
  { id: 1, parentId: null, name: 'Node 1' },
  { id: 2, parentId: 1, name: 'Node 1.1' },
  { id: 3, parentId: 1, name: 'Node 1.2' },
  { id: 4, parentId: 2, name: 'Node 1.1.1' }
]




/*
let tree = buildTree(arrayData)
console.log(arrayData)
console.log(tree)
*/

// 扁平数据转树形数据
function flatToTree(flatData) {
  const map = new Map();
  const tree = [];

  flatData.forEach(item => {
    map.set(item.id, { ...item, children: [] });
  });

  flatData.forEach(item => {
    if (item.parentId === null) {
      tree.push(map.get(item.id));
    } else {
      const parent = map.get(item.parentId);
      if (parent) {
        parent.children.push(map.get(item.id));
      }
    }
  });

  return tree;
}

// 树形数据转扁平数据
function treeToFlat(treeData, parentId = null) {
  let flatData = [];

  treeData.forEach(node => {
    const { id, name, children } = node;
    flatData.push({ id, name, parentId });

    if (children && children.length > 0) {
      flatData = flatData.concat(treeToFlat(children, id));
    }
  });

  return flatData;
}

// 测试
const flatData = [
  { id: 1, name: 'Node 1', parentId: null },
  { id: 2, name: 'Node 1.1', parentId: 1 },
  { id: 3, name: 'Node 1.2', parentId: 1 },
  { id: 4, name: 'Node 2', parentId: null },
  { id: 5, name: 'Node 2.1', parentId: 4 },
];

const treeData = flatToTree(flatData);
console.log('Tree Data:', JSON.stringify(treeData, null, 2));

const newFlatData = treeToFlat(treeData);
console.log('Flat Data:', JSON.stringify(newFlatData, null, 2));

//方法2
function buildTree(array, parentId = null) {
  let tree = []
  for (let item of array) {
    if (item.parentId === parentId) {
      let children = buildTree(array, item.id)
      if (children.length) {
        item.children = children
      }
      tree.push(item)
    }
  }
  return tree
}
