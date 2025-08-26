// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import {Provider} from "react-redux";
import Body from "./Component/Body"
import appStore from "./Utils/appStore";

function App() {
  return (
   <Provider store={appStore}><Body/></Provider>
  )
}

export default App
