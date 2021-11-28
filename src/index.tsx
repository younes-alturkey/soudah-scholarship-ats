import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import axios from 'axios'
import { store } from './app/store'
import { Provider } from 'react-redux'

// eslint-disable-next-line
const { REACT_APP_API_BASE_URL, REACT_APP_API_BASE_URL_LOCAL } = process.env

// axios.defaults.baseURL = REACT_APP_API_BASE_URL_LOCAL
axios.defaults.baseURL = REACT_APP_API_BASE_URL
axios.defaults.headers['Content-Type'] = 'application/json'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
