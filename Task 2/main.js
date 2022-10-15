const app = require("./app/server");
const port = process.env.port || 3000;

app.listen(port, console.log(`http:/localhost:${port}`));
