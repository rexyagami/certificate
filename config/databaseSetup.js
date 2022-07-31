const mongoose = require("mongoose");

module.exports = () => {
    let DB_URI = process.env.MONGO_URI;

    mongoose.connect(
        DB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true  @rexyagami this param was ccreating the error so ive commented it
        },
        (err) => {
            if (err) console.log(err);
            else console.log("Database connection succesfull!");
        }
    );
};
