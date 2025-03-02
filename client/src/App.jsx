import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import UseAuthForm from "./components/UseAuthForm";
import { Toaster } from "react-hot-toast";


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="signin" element={<UseAuthForm type="sign-in" />} />
          <Route path="signup" element={<UseAuthForm type="sign-up" />} />
        </Route>
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default App;
