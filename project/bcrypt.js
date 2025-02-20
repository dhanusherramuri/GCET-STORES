const bcrypt = require('bcrypt');
const saltRounds = 10;
const hashedPassword = await bcrypt.hash("Dhanush", saltRounds);
console.log(hashedPassword); // Store this in your database
