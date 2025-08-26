# NETFLIX GPT 

- Create Vite + React
- Configured Tailwind
- Build Header
- Routing Of Our App
- Login Form
- Sign UP Form
- Form Validation
- Used useRef Hook
- Deployed app Using Google-Firebase
- Create Sign Up User in User Acoount
- Created the Browser and Logout Option

# Features

- Login/Sign Up 
   - SignIn/Up Form
   - Redirect To Browsers Page

- Browse (only after Authentication)
  - Header
  - Main Movie
    - Trailer In Background
    - Tittle and desvription
    - MovieSuggestion
      - MovieList * N

- NetflixGpt
  - Serach Bar
  - Movie Suggestion

  # 🚀 What is Redux?

Redux is like a state manager for your React app.
Think of it as a big storage box where you keep all the important data of your app.

Normally, React components keep their own state (useState).

But if you have a big app (like a food delivery app, shopping cart, social media), many components need to share the same data.

Instead of passing props everywhere, Redux gives you a central place (Store) to keep and manage that data.

🛠 Key Components of Redux (in simple words):

- Store 🏪

This is the big storage box where all your app’s state lives.

You create only one store in your app.

👉 Example: You keep info like user login, cart items, theme mode inside the store.

- Slice 🍰

A slice is like a small section of the store.

Each slice handles one feature of your app.

👉 Example:

cartSlice (handles items in cart)

userSlice (handles login info)

themeSlice (handles light/dark mode)

Each slice has:

Initial State → starting data

Reducers → functions that update the state

- Reducer 🔄

A reducer is just a function that updates the state.

Reducer takes:

The current state

The action (what you want to do)

Returns the new state

👉 Example:
If action is "ADD_TO_CART", reducer will add that item to the cart array.

- Action 🎬

An action is like a message that says "what to do".

It’s just an object with a type (and sometimes extra data).

👉 Example:

{ type: "cart/addItem", payload: { id: 1, name: "Pizza" } }


- Dispatch 📢

Dispatch is how you send an action to Redux.

Think of it like telling Redux: “Hey, do this update!”.

👉 Example:

dispatch(addItem({ id: 1, name: "Pizza" }));


- Provider 🛡

Provider is a special component that wraps your entire app.

It gives all components access to the Redux store.

Without Provider, components won’t be able to read or update the store.

👉 Example:

<Provider store={store}>
   <App />
</Provider>


- useSelector & useDispatch Hooks 🎣

useSelector → lets you read data from the store

useDispatch → lets you send actions to update the store

👉 Example:

const cartItems = useSelector((state) => state.cart.items); // read cart
const dispatch = useDispatch(); // send actions





# Please ensure that you have a CORS plugin enabaled in your browser