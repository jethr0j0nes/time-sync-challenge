


async function Sync() {

  let result = await doFetch()

  if(!result.now && !Number.isInteger(result.now)) {
    return false
  }

  let serverTime = result.now
  let now = new Date().getTime()

  if(Math.abs(serverTime - now) > 10000) {
    return false
  }

  return true
}

const doFetch = () => {

  return fetch('/sync')
    .then(function(response) {
      if(!response.status && response.status !== 200) {
        console.log('Invalid sync api response.')
        return null
      }
      return response.json()
    })
}

export default Sync
