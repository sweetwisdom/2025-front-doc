function defineReactive(obj, key, val) {
  // 如果属性值是对象，则递归地使该对象变为响应式
  observe(val)

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      console.log(`获取${key}的值`)
      return val
    },
    set: function reactiveSetter(newVal) {
      if (newVal === val) return
      console.log(`设置${key}的新值`)
      val = newVal
      // 注意：如果新值也是一个对象，需要再次observe以保持响应性
      observe(newVal)
      // 这里可以触发更新逻辑
    },
  })
}

function observe(value) {
  if (!value || typeof value !== 'object') {
    return
  }

  // 遍历对象的所有属性，并为每个属性调用defineReactive使其响应式
  Object.keys(value).forEach(key => defineReactive(value, key, value[key]))
}

// 示例对象，包括多层嵌套
const obj = {
  nested: {
    a: 1,
    b: {
      c: 2,
    },
  },
  array: [1, 2, { d: 3 }],
}

observe(obj)

console.log(obj.nested.b.c) // 应输出"获取c的值"及当前值
obj.nested.b.c = 5 // 应输出"设置c的新值"
