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
### how to use React Context and `useReducer()`:
- Recipe App has two global states that need to be shared/used in different components: `mode` and `color`. The `mode` state is to decide weathere to use dark or light mode, and the `color` state to change the `Navbar` color.
- To avoid props drilling we use the React Context.
- Inside `ThemeContext.js` we created a `ThemeContext` using `createContext()`, and then created a custom Provider `<ThemeProvider>` that will wrapp the children it may have and pass the value prop, so that all the nested components will be able to get acces to it.
- The `<ThemeProvider>` will also encapsulate all the logic that can update the value prop we passing.
- The value prop passed is an object that contain our `state` returned from the `useReducer()` and also the functions that can update the state.
## ScreenShots
![recipe](https://user-images.githubusercontent.com/85396770/155761231-6df4ab0e-6ee4-44c8-9e2b-af3a80a32da5.PNG)
![recipe1](https://user-images.githubusercontent.com/85396770/155761257-229dea9b-9eb0-4698-8ede-d720f1ace5eb.PNG)
![recipe2](https://user-images.githubusercontent.com/85396770/155761279-e7076d29-1776-4d4b-82e0-9bdcd06b7a9c.PNG)
## Local Devolopement
1. use `npm install` to install all the dependencies.
2. This app using fake server, so first of all run `json-server --watch ./data/db.json`
3. then start the devolopment server  `npm start`.
4. use `npm run test` to run all the test suits
5. Enjoy playing around
- for more information  please refer to [react-app](/react-app.md)
