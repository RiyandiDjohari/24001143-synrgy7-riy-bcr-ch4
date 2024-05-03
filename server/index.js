// Dashboard, about, list product, detail product, page not found

const http = require("http");
const fs = require('fs');
const path = require('path');
const PUBLIC_DIRECTORY = path.join(__dirname, '../public');

function getHTML(htmlFileName) {
  const htmlFilePath = path.join(PUBLIC_DIRECTORY, htmlFileName);
  return fs.readFileSync(htmlFilePath, "utf-8");
}

const onRequest = (req, res) => {
  switch (req.url) {
    case "/":
      req.url = "/index.html";
      break;
    case "/cars":
      req.url = "/cari-mobil.html";
      break;
    default:
      break;
  }

  let path = "public" + req.url;
  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end(getHTML("404.html"));
    } else {
      res.writeHead(200);
      res.end(data);
    }
  });
};

const server = http.createServer(onRequest);

server.listen(8000, "localhost", () => console.log("server is running..."));