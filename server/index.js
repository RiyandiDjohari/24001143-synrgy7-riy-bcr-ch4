// Dashboard, about, list product, detail product, page not found

const http = require("http");
const cars = require("../data/cars");
const fs = require('fs');
const path = require('path');
const PUBLIC_DIRECTORY = path.join(__dirname, '../public');

function getHTML(htmlFileName) {
  const htmlFilePath = path.join(PUBLIC_DIRECTORY, htmlFileName);
  return fs.readFileSync(htmlFilePath, "utf-8");
}

const getCars = (req, res) => {
  res.writeHead(200).end(JSON.stringify(cars));
};

const getDetailCars = (req, res, id) => {
  const car = cars.find((car) =>  car.id === parseInt(id));
  car ? res.writeHead(200).end(JSON.stringify(car)) : res.writeHead(404).end("Data Not Found");
};

const getCarsByManufacture = (req, res, value) => {
    const filteredCars = cars.filter((car) => car.manufacture.toLowerCase().includes(value.toLowerCase()));
    filteredCars ? res.writeHead(200).end(JSON.stringify(filteredCars)) : res.writeHead(404).end("Data Not Found");
}

const onRequest = (req, res) => {
  const splittedUrl = req.url.split("/")[2];
  const id = +splittedUrl;

  switch (req.url) {
    case "/":
      req.url = "/index.html";
      break;
    case "/cars":
      req.url = "/cari-mobil.html";
      break;
    case "/about":
      req.url = "/about.html";
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