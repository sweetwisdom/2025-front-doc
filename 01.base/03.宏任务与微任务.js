async function async1() {
  console.log(1);
  await async2();
  console.log(2);
}

async function async2() {
  console.log(3);
  new Promise((resolve, reject) => {
    resolve();
    console.log(4);
  });
}

async function main() {
  console.log("start")
  setTimeout(() => {
    console.log("2-1")
  }, 0)
 await async1()

  setTimeout(() => {
    console.log("3-1")
  }, 10)

}
main()
// 1 3 2 4 2-1