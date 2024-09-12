import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import AuthProvider from "./contexts/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";
import Login from "./pages/Auth/Login";
import Home from "./pages/Todo/Home";
import SignUp from "./pages/Auth/SignUp";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<PrivateRoute />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route element={<PrivateRoute />}>
              <Route path="/Home" element={<Home />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
