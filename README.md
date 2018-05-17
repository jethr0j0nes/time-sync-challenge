# Time Sync Challenge

## How to use
Clone https://github.com/jethr0j0nes/time-sync-challenge.git

```bash
git clone git clone https://github.com/jethr0j0nes/time-sync-challenge.git
cd time-sync-challenge
```

Install it and run:

```bash
npm install
npm run build
npm start
```

## Description
This is an example token sale with some built in security features.

The initial render of the react application happens server side to gurantee the initial view is accurate and cacheable in a cdn for improved performance.

The concern is that a malicious user would change their computer's clock in an attempt to display innacurate information related to the sale.

To prevent this an api end point is provided which returns the server's time.
/sync

After the initial html is loaded from the server the client js makes a request to the server's api endpoint.
If there is a mismatch between the computer's time and the servers time (greate than 10 s difference is considered a mismatch) a message is displayed telling the user to fix their computer's time and reload the page.

As an additional feature to detect the user changing their computer's clock after the page is loaded we check for large time jumps when updating the sale's timer's state.  If we detect a jump of greater than 10 s between the previous time and the current (timer updates every 1 s) we assume something is amiss and reload the page which triggers the call to the server to sync time.

The start and end of the sale are included as environment variables in the .env file which are loaded at npm run build.

## Testing
To test locally, because the local server and browser are always in sync, one can modify the /sync api endpoint in server.js to change the returned time of the server.
To test out of sync computer clock on initial load:
Change api to offset version and reload the page.

To test computer clock change afer page load:
Load page with correct time on computer and server.
Change api to offset returned server time.
Change computer clock

 **note changing server api time only works when running with npm start which includes hot module reloading or stopping and running npm start again.  It's best to stop and run npm start again between changes as hot module reloading doesn't always seem to work.
