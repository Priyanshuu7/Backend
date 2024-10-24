const http = require("http");
const fs = require("fs");

const myserver = http.createServer((req, res) => {
  //   console.log(req.url);
  //   console.log(req.headers);
  const log = `${Date.now()}: New request aayi h\n`;
  fs.appendFile("log.txt", log, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
  if (req.url === "/") {
    res.end("Welcome to our home page");
  } else if (req.url === "/about") {
    res.end("Here is our short history");
  } else {
    res.end("404 page not found");
  }
});
myserver.listen(5000, () => {
  console.log("server is running on port 5000");
});
