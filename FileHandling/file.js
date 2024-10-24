const fs = require("fs");
console.log("Hello World!");
// fs.writeFileSync("test.txt", "Hello, World!");
fs.appendFileSync("test.txt", "Hello, duniya!");

// sync//
// const result = fs.readFileSync("contacts.txt", "utf8");
// console.log(result);

// async//
fs.readFile("contacts.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});
// you can also unlink and copy flies and also  o you can seee statics//
