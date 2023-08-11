//Replace template code using promise as practice
console.log('Before');

const getUser = (id) => {
    return new Promise((resovle,reject) => {
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resovle({ id: id, gitHubUsername: 'mosh' });
        }, 2000);
    })
}
console.log('After');

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

//Consuming promise
getUser(1)
.then(user => getRepositories(user.username))
.then(repos => getCommits(repos[0]))
.then (commits => console.log(commits))
.catch(err => console.log(err))