import React from "react"
import { hydrate } from "react-dom"
import App from "./App"

isSynced()

// Check if the clients internal clock matches the server.
// Pass in sync status and hydrate App.
async function isSynced() {

  let isSynced = true

  let result = await doFetch()
  if(!result.now && !Number.isInteger(result.now)) {
    isSynced = false
  }

  let serverTime = result.now
  let now = new Date().getTime()

  if(Math.abs(serverTime - now) > 10000) {
    isSynced = false
  }

    hydrate(<App synced={isSynced} />, document.getElementById("root"))
}

if (module.hot) {
  module.hot.accept();
}

function doFetch() {
  return fetch("/sync")
    .then(function(response) {
      if(!response.status && response.status !== 200) {
        console.log("Invalid sync api response.")
        alert("Unable to contact server.")
        return null
      }
      return response.json()
    })
}
