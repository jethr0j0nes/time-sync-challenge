import React from 'react'
import { render , hydrate } from 'react-dom'
import App from './App'
import Sync from './Sync'
import NotSynced from './components/notSynced'

isSynced()

// We check if the clients internal clock matches the server and display a warning if not.
async function isSynced() {

  let isSynced = await Sync()

  if(isSynced) {
    hydrate(<App />, document.getElementById('root'));
  }
  else {
    render(<NotSynced />, document.getElementById('root'));
  }
}

if (module.hot) {
  module.hot.accept();
}
