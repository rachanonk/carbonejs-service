const fs = require('fs');
const carbone = require('carbone');
const express = require('express');
const bodyParser = require('body-parser');
const e = require('express');
const { CanvasRenderService } = require('chartjs-node-canvas');
const app = express();

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var options = {
  convertTo : 'pdf' //can be docx, txt, ...
};


const width = 400; //px
const height = 400; //px
const canvasRenderService = new CanvasRenderService(width, height);

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
        total.confirmed += row.confirmed
        total.newcases += row.newcases
        total.deaths += row.deaths
        total.activeCases += row.activeCases
      });
      data.total = total;

      var configuration = {
        type: 'pie',
        data: {
          labels: [],
          datasets: [{
            label: 'label 1',
            data: [],
            backgroundColor: [],
          }]
        }
      };

      //confirmed cases graph generation
      configuration.data.datasets.label = 'Confirmed Cases'
      data.table.forEach(row => {
        let rgba = {
            red: getRandomInt(255),
            green: getRandomInt(255),
            blue: getRandomInt(255),
            alpha: 1,
        }
        let bg = 'rgba(' + rgba.red +', ' + rgba.green +', ' + rgba.blue +', '+ rgba.alpha +')';
        configuration.data.labels.push(row.country);
        configuration.data.datasets[0].data.push(row.confirmed);
        configuration.data.datasets[0].backgroundColor.push(bg);
      });
      (async () => {
        const imageBuffer = await canvasRenderService.renderToBuffer(configuration);
        fs.writeFileSync('./template/elements/confirmed.png', imageBuffer);
    })();

      //render xlsx template to xlsx file
      carbone.render('./template/covid_simple.xlsx', data, function(err, result){
        if (err) return console.log(err);
        fs.writeFileSync('./report/covid_table_report.xlsx', result);
      });

      //render docx template to pdf file
    //   carbone.render('./template/covid_simple.docx', data, options, function(err, result){
    //     if (err) return console.log(err);
    //     fs.writeFileSync('./report/covid_report.pdf', result);
    //     // process.exit(); // to kill automatically LibreOffice workers
    //   });

    res.json(req.body)
  })

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
  app.listen(3000)
  console.log("nodejs app is listening on port 3000");