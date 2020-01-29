const request = require('request')
const _ = require('lodash')

const createRequest = (input, callback) => {
  const coin = input.data.coin || 'eth'
  const market = input.data.market || 'usd'
  const url = `https://web3api.io/api/v2/market/prices/${coin.toLowerCase()}/latest`
  const queryObj = {
    quote: market.toLowerCase()
  }

  const options = {
    url: url,
    headers: {
      'x-api-key': process.env.API_KEY
    },
    qs: queryObj,
    json: true
  }
  request(options, (error, response, body) => {
    if (error || response.statusCode >= 400 || _.isEmpty(body.payload)) {
      callback(response.statusCode, {
        jobRunID: input.id,
        status: 'errored',
        error: body,
        statusCode: response.statusCode
      })
    } else {
      const result = JSON.parse(body.payload[`${coin.toLowerCase()}_${market.toLowerCase()}`].price)
      body.result = result
      callback(response.statusCode, {
        jobRunID: input.id,
        data: body,
        result: result,
        statusCode: response.statusCode
      })
    }
  })
}

exports.gcpservice = (req, res) => {
  createRequest(req.body, (statusCode, data) => {
    res.status(statusCode).send(data)
  })
}

exports.handler = (event, context, callback) => {
  createRequest(event, (statusCode, data) => {
    callback(null, data)
  })
}

exports.handlerv2 = (event, context, callback) => {
  createRequest(JSON.parse(event.body), (statusCode, data) => {
    callback(null, {
      statusCode: statusCode,
      body: JSON.stringify(data),
      isBase64Encoded: false
    })
  })
}

module.exports.createRequest = createRequest
