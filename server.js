const app = require("./app");
const connectDB = require("./config/dbConfig");
const config = require("./config/appConfig");

connectDB();

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
