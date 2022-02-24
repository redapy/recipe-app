## Recipe app
- Recipe app is a CRUD React app built following [The Net Ninja tutorial](https://www.udemy.com/course/build-web-apps-with-react-firebase/).
- Users can read (fetch) recipes from a `fake-JSON-server`, add recipes to it , and delete them.
- I wrote all tests suit myself using jest and React-Testing-Library.
- This app is styled with CSS stylesheets.
## What I learned
I learnt a lot of things while building this is app, but here are the most important stuff:
### How to create a custom hook that fetch or post data: `useFetch(url, method)`
- the `useFetch` hook has 4 states: 
  - `data`: where to store the respond when we get it from the server.
  - `isLoading`: to indicate the process of fetching data.
  - error: in Which we store if there is any Error.
  - options: to hold the post options.
- Inside a `useEffect` we have a `fetchData()` function that updates the states depending on the `try catch` block respond.
- This hook accepts two arguments, the URL and the method. depending on the method it decide to` POST` or `GET` data.
- It checks what is the the second argument (method). If it's `POST`, it call the `fetchData()` with the `options` state.
- It makes use of the javaScript `AbortController` object, inside a cleanup function, to abort the async task (fetching) once the the component is unmounted.
### React Context and `useReducer()`:
