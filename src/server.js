import App from './App'
import React from 'react'
import express from 'express'
import { renderToString } from 'react-dom/server'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const server = express()

// Our api route for syncing server and client.
// Return current time.
server.get('/sync', function (req, res) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')

  let now = new Date().getTime()
  // Used for testing purposes.
  // Simulating a client that is now 20 seconds faster than the server.
  //let now = new Date().getTime() - 20000
  //let now = 3000

  res.json({ now : now})
})

// Return initial rendering of react app.
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const markup = renderToString(<App synced={true}/>);
    res.send(
      `<!doctype html>
      <html lang="">
        <head>
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta charSet='utf-8' />
            <title>Welcome to the token sale!!!</title>
             ${process.env.NODE_ENV === 'production'
               ? `<script src="${assets.client.js}" defer></script>`
               : `<script src="${assets.client.js}" defer crossorigin></script>`}
        </head>
        <body>
            <div id="root">${markup}</div>
        </body>
      </html>`
    )
  })

export default server;
