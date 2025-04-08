import './App.css'
import SinupPage from './pages/SignupPage'
import { ThemeProvider } from '@emotion/react'
import Theme from './theme/Theme'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import AuthProvider from './context/Authentication'
import { ToastContainer } from "react-toastify";
import ProtectedRoute from './utils/ProtectedRoute'
import TaskDashboard from './pages/TaskDashboard'
import Login from './components/auth/Login'
import DataProvider from './context/DataContext'

function App() {

  return (
    <ThemeProvider theme={Theme}>
      <AuthProvider>
        <DataProvider>
       {/* Feedback toast container */}
      <ToastContainer position='bottom-center' autoClose={3000} hideProgressBar={false}/>
      <Router>
        <Routes>
          <Route path="/" element={<SinupPage />} />
          {/* Protected Route */}
          <Route path="/tasks" element={<ProtectedRoute element={<TaskDashboard/>}/>} />
          {/* <Route path="/tasks" element={<TaskDashboard/>}/> */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
      </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
