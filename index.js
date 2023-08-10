const getUserData = (user) => {
    console.log('After...');
    setTimeout(()=>{
        console.log(`User data fetched`)
    },2000)
    console.log("Before...")
}
getUserData();