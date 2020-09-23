const express = require('express');
// listen to port 3000
const { PORT = 3000 } = process.env;
const app = express();
const path = require('path');
const userRouter = require('./routes/userRouter'); // importing the router

app.use(express.static(path.join(__dirname, 'public')));
// now the client only has access to public files

app.use('/users', userRouter); //starting user router


app.get('*', (req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
})



app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening - Port: ${PORT}`);
  // if everything works fine, the console will show which port the application is listening to
});
