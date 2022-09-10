# Getting Started with Circular calendar

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

Start the server by running:

### `npx json-server -p3001 --watch db.json`

of if you have json-server installed globally, you can use the script:

### `npm server`

Start the frontend by running:

### `npm start`

It runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

## Next steps with the project

- Adding loader when data is being fetched
- Limiting the amount of characters in one goal (so that it fits inside the circle)
- Notifying user visually that 12 goals is max amount (now the button is disabled, but I would also like to notify visually)
- Implementing drag and drop functionality for example with [react-draggable](https://www.npmjs.com/package/react-draggable)
- Implementing delete functionality for deleting a goal
- Custom styling dropdown items
