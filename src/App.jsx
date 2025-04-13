import "./App.css";
import SinupPage from "./pages/SignupPage";
import { ThemeProvider } from "@emotion/react";
import Theme from "./theme/Theme";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthProvider from "./context/Authentication";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./utils/ProtectedRoute";
import TaskDashboard from "./pages/TaskDashboard";
import DataProvider from "./context/DataContext";
import { PublicRoute } from "./utils/helper";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Router>
        <AuthProvider>
          <DataProvider>
            {/* Feedback toast container */}
            <ToastContainer
              position='bottom-center'
              autoClose={3000}
              hideProgressBar={false}
            />
            <Routes>
              <Route path='/' element={<PublicRoute element={<SinupPage />}/>} />
              {/* <Route path='/' element={<SinupPage />} /> */}
              {/* Protected Route */}
              <Route
                path='/tasks'
                element={<ProtectedRoute element={<TaskDashboard />} />}
              />
              {/* <Route path="/tasks" element={<TaskDashboard/>}/> */}
              <Route path='*' element={<Navigate to='/' />} />
            </Routes>
          </DataProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
