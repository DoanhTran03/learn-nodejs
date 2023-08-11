const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Operation 1 on Progress...')
        resolve(1);
    }, 2000);
})

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Operation 2 on Progress...')
        resolve(2)
    }, 2000);
})

Promise.all([p1, p2])
.then(result => console.log(result))

Promise.race([p1, p2])
.then(result => console.log(result)) 