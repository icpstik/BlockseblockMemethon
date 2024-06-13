import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import UserProvider from './context/UserProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  // </React.StrictMode>,
  <UserProvider>
    <App />
  </UserProvider>
)
