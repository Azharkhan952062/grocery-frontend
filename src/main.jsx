import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import NavigatorSetter from "./components/NavigatorSetter";
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from './context/AppContext.jsx';
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  {/* <NavigatorSetter> */}
    <AppContextProvider>
      <App />
    </AppContextProvider>
    {/* </NavigatorSetter> */}
  </BrowserRouter>
);
