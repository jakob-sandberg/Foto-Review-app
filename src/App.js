import React from "react";
import Navigation from "./components/Navigation";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import LogoutPage from "./pages/LogoutPage";
import AlbumPage from "./pages/AlbumPage";
import RequireAuth from "./components/RequireAuth";
import AlbumPageCustomer from "./pages/AlbumPageCustomer";
import CustomerDone from "./pages/CustomerDone";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        {/* Guest routes */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/customerdone" element={<CustomerDone />} />
        {/* Protected routes */}
        <Route
          path="/"
          element={
            <RequireAuth redirectTo="/login">
              <Homepage />
            </RequireAuth>
          }
        />
        <Route
          path="/album/:id"
          element={
            <RequireAuth redirectTo="login">
              <AlbumPage />
            </RequireAuth>
          }
        />

        {/* customer route */}
        <Route path="/review/:id" element={<AlbumPageCustomer />} />
      </Routes>
    </div>
  );
}

export default App;
