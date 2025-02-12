// 简易响应式系统
/**
 * 
 在 Vue 3 中，watchEffect 允许你自动追踪依赖并在其变化时执行副作用。每当 watchEffect 执行时，Vue 会自动收集其所依赖的响应式数据，并将其与当前 watchEffect 关联。

在多个 watchEffect 之间，activeEffect 会被 Vue 内部自动管理。每个 watchEffect 都有自己的副作用函数，这些副作用函数会根据其依赖的响应式数据自动更新。当多个 watchEffect 并行工作时，Vue 会通过 activeEffect 来确保正确的依赖收集和触发更新。
 */

let activeEffect = null

class Dep {
  constructor() {
    this.subscribers = new Set()
  }

  // 订阅
  depend() {
    if (activeEffect) {
      this.subscribers.add(activeEffect)
    }
  }

  // 通知
  notify() {
    this.subscribers.forEach(effect => effect())
  }
}

function watchEffect(effect) {
  activeEffect = effect
  effect()
  activeEffect = null
}

function reactive(obj) {
  Object.keys(obj).forEach(key => {
    const dep = new Dep()
    let value = obj[key]
    Object.defineProperty(obj, key, {
      get() {
        dep.depend()
        return value
      },
      set(newValue) {
        if (newValue !== value) {
          value = newValue
          dep.notify()
        }
      },
    })
  })
  return obj
}

function reactive2(obj) {
  const depsMap = new Map() // 存储每个属性的依赖

  const hander = {
    get(target, key) {
      // 先获取依赖
      let dep = depsMap.get(key)
      if (!dep) {
        dep = new Dep()
        depsMap.set(key, dep)
      }
      //   收集依赖
      dep.depend()

      return Reflect.get(target, key)
    },
    set(target, key, val) {
      const oldVal = Reflect.get(target, key)
      if (oldVal !== val) {
        Reflect.set(target, key, val)
        const dep = depsMap.get(key)
        dep && dep.notify()
      }
      return true
    },
  }
  return new Proxy(obj, hander)
}

// 测试
const state = reactive2({ count: 0, name: '12' })
watchEffect(() => {
  let aa = state.count
  // let bb = state.name
  console.log(`count: `, aa)
})

// state.count++ // 输出: count: 1
state.count++ // 输出: count: 1
state.name = '15'
