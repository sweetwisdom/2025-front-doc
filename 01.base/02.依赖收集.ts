// 简易响应式系统
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

let activeEffect = null

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

function reacttive2(obj) {
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
    set(target, key,val) {
      const oldVal = Reflect.get(target, key)
      if (oldVal !== val) {
        Reflect.set(target, key, val)
        const dep = depsMap.get(key)
        dep&&dep.notify()
      }
      return true;

    },
  }
  return new Proxy(obj, hander)
}

// 测试
const state = reactive({count: 0})
watchEffect(() => {
  console.log(`count: ${state.count}`)
})
state.count++ // 输出: count: 1
state.count++ // 输出: count: 1
