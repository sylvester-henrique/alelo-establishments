# alelo-establishments

Aplication to generate a report of alelo establishments

## How to generate report

- open the Alelo URL https://www.alelo.com.br/onde-aceita

- Open Chrome devtools -> network

- On the search bar, query for "token"

- Copy the value "access_token" in the "Response" tab

- In the postman environment (it is in ```postman``` diretory), change the "token" variable value to the copied value

- make the "Acceptance Network" request to retrieve the establishments. Fill the **latitude** and **longitude** values to the desired coordinates.

- copy the response to the ```source-data/alelo-establishments.json``` file

- run main.js

- the result file ```result-data/alelo-establishments-result.csv``` will be generated