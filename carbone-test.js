const fs = require('fs');
const carbone = require('carbone');

// Data to inject
var data = {
  firstname : 'จอห์น',
  lastname : 'โดล์',
  "type": {
    "id": 1,
    "name": "มนุษย์"
  },
  "country": "สหรัฐอเมริกา",
  "movie": [
    { "name": "อินเซปชัน", "year": 2010, "meta": { "type": "SF"} },
    { "name": "เมทริกซ์", "year": 1999, "meta": { "type": "SF"} },
    { "name": "เดอะ กรีนไมล์", "year": 1999, "meta": { "type": "Drama" } },
    { "name": "แบ็คทูเดอะฟิวเจอร์", "year": 1985, "meta": { "type": "SF"} }
  ],
  "items": {
    "name": "รถยนต์",
    "wheels": 4
  },
  "meal": [
    { "name": "ไก่", "weekday": 1 },
    { "name": "ปลา"   , "weekday": 2 }
  ],
  "cars" : [
  {
    brand: "Toyota",
    models: [{ name: "Prius 2" }, { name: "Prius 3" }]
  },
  {
    brand: "Tesla",
    models: [{ name: "S" }, { name: "X" }]
  },
  {
    brand: "Lumeneo",
    models: [{ name: "Smera" }, { name: "Néoma" }]
  }
]
};

var options = {
  convertTo : 'pdf' //can be docx, txt, ...
};

// Generate a report using the sample template provided by carbone module
// This LibreOffice template contains "Hello {d.firstname} {d.lastname} !"
// Of course, you can create your own templates!
carbone.render('./template/simple.docx', data, function(err, result){
  if (err) {
    return console.log(err);
  }
  fs.writeFileSync('./report/result.docx', result);
});

// carbone.render('./template/simple.docx', data, options, function(err, result){
//   if (err) return console.log(err);
//   fs.writeFileSync('./report/result.pdf', result);
//   process.exit(); // to kill automatically LibreOffice workers
// });