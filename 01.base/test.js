function test(){
  [1,4,6].forEach(e=>{
    if(e>3){
      return true
    }
  })
  return false
}

//console.log(test())
//false foreact无法return
function  test2(){
  let aa={
    a:1,
    b:2,
    c:3,
    d:4
  }
  for (const key in aa) {
    console.log(key)
    if(key==='b'){
      console.log(key,Reflect.get(aa,key))
      return true
    }

  }
  return false
}

console.log(test2())