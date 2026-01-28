const express = require('express');
const errorHandler = require('./Common/Error/errorHandler');
const correlationId = require('./Common/CorrelationId/correlationId')
const app = express();
app.use(express.json());
const userRoute = require('./App/user/routes/user.route');
const port = 3000;
app.use(correlationId)
app.use('/user', userRoute);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});