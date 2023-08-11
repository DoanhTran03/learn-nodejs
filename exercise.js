const getCustomer = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ id: 1, name: "Mosh Hamedani", isGold: true, email: "email" });
    }, 2000);
  });
};

const getTopMovies = () => {
  return new Promise((resovle, reject) => {
    setTimeout(() => {
      resovle(["movie1", "movie2"]);
    }, 2000);
  });
};

const sendEmail = (email, movies) => {
  return new Promise((resovle) => {
    setTimeout(() => {
      resovle("Email sent...");
    }, 2000);
  });
};

const notifyUser = async () => {
    const customer = await getCustomer(1);
    console.log(customer);
    if(customer.isGold) {
        const movies = await getTopMovies();
        console.log(movies);
        const email = await sendEmail(customer.email, movies);
        console.log(email);
    }
}
notifyUser();