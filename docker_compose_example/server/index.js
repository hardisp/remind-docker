const app = require("./app");
const db = require("./db");

db.connect()
  .then(() => {
    console.log("Conection DB on: " + db.url);
  })
  .catch((e) => {
    console.error("Connection Error:\n", e);
  });

const port = process.env.PORT || 3001;
app.listen(port, () =>
  console.log(
    `Host: http://localhost:${port} \nAPI: http://localhost:${port}/api`
  )
);
