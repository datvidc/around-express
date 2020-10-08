const express = require('express');
const mongoose = require('mongoose'); // importing mongoose
const path = require('path');
const userRouter = require('./routes/users'); // importing the router
const cardRouter = require('./routes/cards'); // importing the router


// listen to port 3000
const { PORT = 3000 } = process.env;
const app = express();


mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
// now the client only has access to public files

app.use('/users', userRouter);
 //starting user router

app.use('/cards', cardRouter);
//starting Cards router

//this goes last-catchall.
app.get('*', (req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
})

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening - Port: ${PORT}`);
  // if everything works fine, the console will show which port the application is listening to
});
