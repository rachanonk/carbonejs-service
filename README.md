carbonejs-service

To experiment CarboneJs, I implemented CarboneJs on NodeJs with express application to service the data into table and document type reports.

For getting start with the application
1 RUN `docker build -t carbone-app .`

2 RUN `docker run -p3000:3000 carbone-app`

3 RUN `curl localhost:3000` or brows `localhost:3000` on a web browser to test that the API is working
    - The response should be `hello world`

4 RUN `curl -X POST -H "Content-Type: application/json" -d @./data-example.json http://localhost:3000/report`

5 Your docker should now has files `'/home/node/app/report/covid_table_report.xlsx'` and `'/home/node/app/report/covid_report.pdf'`