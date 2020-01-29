# Chainlink External Adapter for Amberdata

## Input Params

- `coin`: The asset to query
- `market`: The currency to convert to

## Output Format

```
{
 "jobRunID": "278c97ffadb54a5bbb93cfec5f7b5503",
 "data": {
  "status": 200,
  "title": "OK",
  "description": "Successful request",
  "payload": {
   "link_eth": {
    "timestamp": "2020-01-29T14:00:00.000Z",
    "price": "0.01535433700000000000"
   }
  },
  "result": 0.015354337
 },
 "result": 0.015354337,
 "statusCode": 200
}
```

## Install

```bash
npm install
```

## Test

```bash
npm test
```

## Create the zip

```bash
zip -r cl-ea.zip .
```

## Install to AWS Lambda

- In Lambda Functions, create function
- On the Create function page:
  - Give the function a name
  - Use Node.js 12.x for the runtime
  - Choose an existing role or create a new one
  - Click Create Function
- Under Function code, select "Upload a .zip file" from the Code entry type drop-down
- Click Upload and select the `cl-ea.zip` file
- Handler should remain index.handler
- Add the environment variable (repeat for all environment variables):
  - Key: API_KEY
  - Value: Your_API_key
- Save


## Install to GCP

- In Functions, create a new function, choose to ZIP upload
- Click Browse and select the `cl-ea.zip` file
- Select a Storage Bucket to keep the zip in
- Function to execute: gcpservice
- Click More, Add variable (repeat for all environment variables)
  - NAME: API_KEY
  - VALUE: Your_API_key
