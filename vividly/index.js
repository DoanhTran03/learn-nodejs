const express = require("express");
const app = express();

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/logging')();
require('./startup/validation')();  
require('./startup/prod')(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Backend is listening on http://localhost/${PORT}`));
