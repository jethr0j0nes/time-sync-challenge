import React from "react";
import Sale from "./components/Sale"
import NotSynced from "./components/notSynced"

const startAt = process.env.RAZZLE_START_AT
const finishAt = process.env.RAZZLE_FINISH_AT

const sale = {
  startAt,
  finishAt,
};

const App = (props) => {

  const markup = props.synced ? (
    <Sale sale={sale} />
  ) : (
    <NotSynced />
  )

  return (
    <div>
      {markup}
    </div>
  )
}

export default App
