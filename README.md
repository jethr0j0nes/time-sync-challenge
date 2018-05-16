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

The concern is that a malicious user would change their computers clock in an attempt to display innacurate information related to the sale.

To prevent this an api end point is provided which returns the servers time.
/sync

After the initial html is loaded from the server the client js makes a request to the servers api endpoint.
If there is a mismatch between the computers time and the servers time (greate than 10 s difference is considered a mismatch) a message is displayed telling the user to fix their computers time and reload the page.

As an additional feature to detect the user changing their computers clock after the page is loaded we check for large time jumps when updating the sales timers state.  If we detect a jump of greater than 10 s between the previous time and the current (timer updates every 1 s on it's own) we assume something is amiss and reload the page which triggers the call to the server to sync time.

The start and end of the sale are included as environment variables in the .env file.
