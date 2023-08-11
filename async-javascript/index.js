//Example of async function
const getUserData = (user) => {
    console.log('After...');
    setTimeout(()=>{
        console.log(`User data fetched`)
    },2000)
    return console.log("Before...")
}
const user = getUserData({name: 'Robert'})