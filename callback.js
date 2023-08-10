//Using call back function
// console.log('Before')
// getUserData(10, (user) => {
//     console.log(user);
// });
// console.log('After')
// function getUserData (id, callback) {
//     setTimeout(()=>{
//         console.log(`User data fetched`);
//         callback({id: id, name: 'David'});
//     },2000);
// } 

getRepositories('Robert', (repositories) => {
    console.log(repositories);  
})

function getRepositories (username, callback) {
    setTimeout(()=>{
        console.log('Getting user repositories');
        callback(['repo1','repo2','repo3'])
    },2000)
}