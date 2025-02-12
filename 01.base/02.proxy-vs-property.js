function defineReactive(obj, key, val) {
  // 递归处理嵌套的对象以使其变为响应式
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
      // 这里可以触发更新逻辑
    },
  })
}

function observe(value) {
  if (!value || typeof value !== 'object') {
    return
  }
  Object.keys(value).forEach(key => defineReactive(value, key, value[key]))
}
function reactive(target) {
  if (!target || typeof target !== 'object') {
    return target
  }

  // 捕获器处理器对象
  const handler = {
    get: function (target, key, receiver) {
      console.log(`获取${String(key)}的值`)
      return Reflect.get(target, key, receiver)
    },
    set: function (target, key, value, receiver) {
      console.log(`设置${String(key)}的新值`)
      return Reflect.set(target, key, value, receiver)
      // 可在此添加更新逻辑
    },
    deleteProperty: function (target, key) {
      console.log(`删除${String(key)}属性`)
      return Reflect.deleteProperty(target, key)
    },
  }

  return new Proxy(target, handler)
}

//   // 示例对象
//   const obj = reactive({});

//   obj.foo = 'bar'; // 设置foo的值
//   console.log(obj.foo); // 获取foo的值
//   delete obj.foo; // 删除foo属性
// 示例对象
const obj = {}
observe(obj)

obj.foo = 'bar' // 设置foo的值
console.log(obj.foo) // 获取foo的值
