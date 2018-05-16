import React from 'react';
import Sale from './components/Sale'

const startAt = process.env.RAZZLE_START_AT
const finishAt = process.env.RAZZLE_FINISH_AT

const sale = {
  startAt,
  finishAt,
};

const App = () => {
  return (
    <div>
      <Sale sale={sale}/>
    </div>
  )
}

export default App
