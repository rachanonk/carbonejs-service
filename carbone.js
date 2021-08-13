const fs = require('fs');
const carbone = require('carbone');
const express = require('express');
const bodyParser = require('body-parser');
const e = require('express');
const app = express();

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var options = {
  convertTo : 'pdf' //can be docx, txt, ...
};

  app.get('/', function (req, res) {
    res.send('hello world')
  })

  app.post('/report', function (req, res) {
      let total = {
        "confirmed": 0,
        "newcases": 0,
        "deaths": 0,
        "activeCases": 0
      }
      let data = req.body
      data.table.forEach(row => {
        let sum = {
          "confirmed": 0,
          "newcases": 0,
          "deaths": 0,
          "activeCases": 0
        }
        row.member.forEach(m => {
          sum.confirmed += m.confirmed
          if(m.newcases !== "N/A") {
            sum.newcases += m.newcases
          }
          sum.deaths += m.deaths
          sum.activeCases += m.activeCases
        })
        row.summary = sum
        total.confirmed += sum.confirmed
        total.newcases += sum.newcases
        total.deaths += sum.deaths
        total.activeCases += sum.activeCases
      });
      data.total = total

      //render xlsx template to xlsx file
      carbone.render('./template/covid_template.xlsx', data, function(err, result){
        if (err) return console.log(err);
        fs.writeFileSync('./report/covid_table_report.xlsx', result);
      });

      //render docx template to pdf file
      carbone.render('./template/covid_template.docx', data, options, function(err, result){
        if (err) return console.log(err);
        fs.writeFileSync('./report/covid_report.pdf', result);
        // process.exit(); // to kill automatically LibreOffice workers
      });

    res.json(req.body)
  })
  
  app.listen(3000)
  console.log("nodejs app is listening on port 3000");