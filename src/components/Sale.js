import React from 'react'

class Sale extends React.Component {
  constructor(props) {
    super(props)
    this.state = {now: new Date()}
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    )
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick() {
    this.setState((prevState, props) => {

      let now = new Date().getTime()
      let prevTime = new Date(prevState.now).getTime()

      // If someone changes there computer clock after loading the page we reload it.
      if(Math.abs(now - prevTime) > 10000) {
        // Verify we are in the browser
        if (typeof window !== 'undefined' && window.document) {
          window.location.reload(true)
        }
      }

      return {
        now: new Date()
      }
    });
  }

  timeRemaining(now, startAt) {
    // get total seconds between the times
    let t = (startAt - now) / 1000

    let days = Math.floor( t/(60*60*24))
    let hours =  Math.floor((t/(60*60)) % 24)
    let minutes = Math.floor(t/(60) % 60)
    let seconds = Math.floor(t % 60)

    return days + ' days ' + hours + ' hours ' + minutes + ' minutes ' + seconds + ' seconds remaining until start.'
  }

  render() {

    let saleInfo = ''
    const now = new Date().getTime()
    const startAt = new Date(this.props.sale.startAt).getTime()
    const finishAt = new Date(this.props.sale.finishAt).getTime()

    if (now <  startAt) {
      saleInfo = this.timeRemaining(now, startAt)
    }
    else if (now > startAt && now < finishAt) {
      saleInfo = 'Sale is live!!!!!'
    }
    else if (now > finishAt) {
      saleInfo = 'Sale is over.'
    }

    return (
      <div>
        <h1>Welcome to the token sale!!!</h1>
        <div>{saleInfo}</div>
      </div>
    );
  }
}

export default Sale







