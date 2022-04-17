import React from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./App.css";

import theme from "./theme";

// Pages
import Test from "./pages/TestPage/Test";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import NewPartners from "./pages/NewPartners/NewPartners";
import AwaitingMatches from "./pages/AwaitingMatches/AwaitingMatches";
import ExistingMatches from "./pages/ExistingMatches/ExistingMatches";
import PaymentButton from "./components/PaymentButton";

// Import other components
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Navbar />
        <Box className="page-container">
          <Box className="content-wrap">
            <Routes>
              <Route path="/" element={<NewPartners />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/meet" element={<NewPartners />} />
              <Route path="/notifications" element={<AwaitingMatches />} />
              <Route path="/matches" element={<ExistingMatches />} />
              <Route
                path="/testing"
                element={<PaymentButton onSuccess={console.log} />}
              />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
