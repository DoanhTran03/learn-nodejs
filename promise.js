const promise = new Promise((resolve, reject) => {
    setTimeout(()=>{
        resolve({id: 10, name: 'Robert'})
        reject(new Error('Data base error'))
    },2000)
})

promise.then(result => console.log(result)).catch(err => console.log(err));