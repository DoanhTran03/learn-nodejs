//Replace template code using async/await as practice
console.log('Before');

const getUser = (id) => {
    return new Promise((resovle,reject) => {
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resovle({ id: id, gitHubUsername: 'mosh' });
        }, 2000);
    })
}

function getRepositories(username) {
    return new Promise((resovle, reject) => {
        setTimeout(() => {
          console.log('Calling GitHub API...');
          resovle(['repo1', 'repo2', 'repo3']);
        }, 2000);
    })
}

function getCommits(repo) {
    return new Promise ((resovle, reject) => {
        setTimeout(() => {
          console.log('Calling GitHub API...');
          resovle(['commit']);
        }, 2000);
    })
}
const displayCommits = async (id) => {
    try {

        const user = await getUser(1);
        const repos = await getRepositories(user.gitHubUsername);
        const commits = await getCommits (repos[0])
        console.log('Result: ' + commits)
    }
    catch (err) {
        console.log(err)
    }
}
displayCommits(1);
console.log('After')