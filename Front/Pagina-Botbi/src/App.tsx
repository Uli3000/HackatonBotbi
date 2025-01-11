import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./Context/AuthContext";
import Login from "./Views/Login";
import ProtectedRoute from "./Views/ProtectedRoute";
import MainPage from "./Views/MainPage";
import Clientes from "./Views/Clientes";
import Sidebar from "./Views/Sidebar";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route
                path="/home"
                element={
                  <div style={{ display: "flex", height: "100vh" }}>
                    <Sidebar />
                    <MainPage />
                  </div>
                }
              />
              <Route
                path="/clientes"
                element={
                  <div style={{ display: "flex", height: "100vh" }}>
                    <Sidebar />
                    <Clientes />
                  </div>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
