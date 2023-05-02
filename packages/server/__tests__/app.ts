import http from "http";
import app from "../server";

const port = 3003;

const server: http.Server = app.listen(port, () => {
  console.log(`Test server is running on port ${port}`);
});

export default server;
