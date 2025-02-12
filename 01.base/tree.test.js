const flatData = [
  {id: 1, name: 'Node 1', parentId: null},
  {id: 2, name: 'Node 1.1', parentId: 1},
  {id: 3, name: 'Node 1.2', parentId: 1},
  {id: 4, name: 'Node 2', parentId: null},
  {id: 5, name: 'Node 2.1', parentId: 4},
];

function flatToTree(inputData) {
  const result = []
  let keySet = new Map()
  inputData.forEach(item => {
    keySet.set(item.id, {...item})
  })
  inputData.forEach(item => {

    if (item.parentId === null) {
      result.push(keySet.get(item.id))
    } else {
      const parent = keySet.get(item.parentId)
      if (parent) {
        if (!parent.children) {
          parent.children = []
        }
        parent.children.push(keySet.get(item.id))
      }
    }


  })
  return result
}



//1.2  树形转扁平
function treeToFlat(data) {
  let result = []
  data.forEach(e => {
    if (e.children) {
      result= result.concat(treeToFlat(e.children))
    }
    result.push({
      id: e.id,
      name: e.name,
      parentId: e.parentId
    })
  })
  return result
}


const data = flatToTree(flatData)
console.log(JSON.stringify(data))
console.log(treeToFlat(data))
//2.0 简易方法

function flatToTreeSim(inputData, pid) {
  const res = []
  for (const item of inputData) {
    if (item.parentId === pid) {
      let children = flatToTreeSim(inputData, item.id)
      if (children.length > 0) {
        item.children = children
      }
      res.push(item)

    }

  }
  return res
}

/*

const data = flatToTreeSim(flatData,null)
console.log(JSON.stringify(data))

*/
