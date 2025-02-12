function observeArray(arr) {
  // 1.保留数组的原始方法
  const originMethods = Array.prototype
  // 2.创建代理方法
  const methodsToOverride = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']
  //   3.重写
  methodsToOverride.forEach(method => {
    Object.defineProperty(arr, method, {
      value: function (...args) {
        // 执行原生方法
        const result = originMethods[method].apply(this, args)
        // 在数据变更后通知视图更新（例如触发重新渲染）
        console.log(`Array method ${method} called`, args)

        // 返回原生操作的结果
        return result
      },
      writable: true,
      configurable: true,
    })
  })
  // 返回代理后的数组对象
  return arr
}
const arr = observeArray([1, 2, 3])

arr.push(4) // 会触发自定义方法，输出: Array method push called [4]
arr.pop() // 会触发自定义方法，输出: Array method pop called []
arr.shift() // 会触发自定义方法，输出: Array method shift called []
arr.unshift(0) // 会触发自定义方法，输出: Array method unshift called [0]
arr.splice(1, 1) // 会触发自定义方法，输出: Array method splice called [1, 1]
arr.sort() // 会触发自定义方法，输出: Array method sort called []
arr.reverse(1) // 会触发自定义方法，输出: Array method reverse called []
console.log(arr);

