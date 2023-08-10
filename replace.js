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
getUser(10).then(result => console.log(result));
console.log('After');

function getRepositories(username) {
    return new Promise((resovle, reject) => {
        setTimeout(() => {
          console.log('Calling GitHub API...');
          callback(['repo1', 'repo2', 'repo3']);
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
getCommits('DoanhTran03').then(result => console.log(result));
