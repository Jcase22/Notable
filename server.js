const app = require ('./app')
const port = 4444

app.listen(port, () => {
  console.log(`App is listening on port: ${port}`)
})