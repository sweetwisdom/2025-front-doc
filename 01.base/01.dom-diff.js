function domdiff(oldVNode, newVNode) {
  if (oldVNode.tag !== newVNode.tag) {
    return false
  }
  if (oldVNode.key !== newVNode.key) {
    return false
  }
//  对比属性

  for (const key in oldVNode.attrs) {
    if (oldVNode.attrs[key] !== newVNode.attrs[key]) {
      return false
    }
  }
  //对比子节点
  if(oldVNode.children.length!==newVNode.children.length){
    return  false
  }
  for (let i = 0; i < oldVNode.children.length ; i++) {
    if(!domdiff(oldVNode.children[i],newVNode.children[i])){
      return false
    }

  }


  return true

}

// 测试
const oldVNode = {tag: 'div', key: 1, attrs: {class: 'container'}, children: [{tag: 'div', key: 1, attrs: {class: 'container'}, children: []}]};
const newVNode = {tag: 'div', key: 1, attrs: {class: 'container'}, children: [{tag: 'div', key: 1, attrs: {class: 'container'}, children: []}]};
console.log(domdiff(oldVNode, newVNode))