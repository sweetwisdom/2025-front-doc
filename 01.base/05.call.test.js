/*
* call 参数单个传递，逗号风格
* apply 参数数组传递
* */
//借用方法
const greeter = {
  name: 'Alice',
  sayHello: function (age, age2) {
    console.log(`Hello, my name is ${this.name} and I am ${age} years old ${age2} .`);
  },
};

const person = {
  name: 'Bob',
};

// 使用 call
//greeter.sayHello.call(person, 25, 33); // 输出: Hello, my name is Bob and I am 25 years old.
//
//// 使用 apply
//greeter.sayHello.apply(person, [25, 33]); // 输出: Hello, my name is Bob and I am 25 years old.

//bind 常用语执行延迟函数，尤其是在事件处理过程
//实现call apply
Function.prototype.myCall = function (context, ...args) {
  context = context || window
//  将当前函数 this 作为context的一个树形
  const fn = Symbol('fn')
  context[fn] = this
//  调用函数
  const result = context[fn](...args)
//  删除临时属性
  delete delete context[fn]
  return result
}
Function.prototype.myApply = function (context, args) {
  context = context || window
//  将当前函数 this 作为context的一个树形
  const fn = Symbol('fn')
  context[fn] = this
//  调用函数
  const result = context[fn](...args)
//  删除临时属性
  delete context[fn]
  return result

}

// 测试
/*

function sayHello(age,age2) {
  console.log(`Hello, my name is ${this.name} and I am ${age}  ${age2}years old.`);
}

const persons = { name: 'Bob' };
sayHello.myApply(persons, [30,22]); // 输出: Hello, my name is Bob and I am 30 years old.

*/
//手动实现bind
Function.prototype.myBind = function (context, ...bindArgs) {
 const  self =this
  return  function (...args){
   const allArges= bindArgs.concat(args)
    return self.apply(context,allArges)
  }
}

function sayHello(age, hobby) {
  console.log(`Hello, my name is ${this.name}, I am ${age} years old, and I love ${hobby}.`);
}

//const person = { name: 'Charlie' };
const boundSayHello = sayHello.myBind(person, 35);
boundSayHello('coding cooking'); // 输出: Hello, my name is Charlie, I am 35 years old, and I love coding.