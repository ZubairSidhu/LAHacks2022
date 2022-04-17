import React from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./App.css";

import theme from "./theme";

// Pages
import Test from "./pages/TestPage/Test";
import SignUp from "./pages/SignUp/SignUp";
import NewPartners from "./pages/NewPartners/NewPartners";
import AwaitingMatches from "./pages/AwaitingMatches/AwaitingMatches";
import ExistingMatches from "./pages/ExistingMatches/ExistingMatches";
import PaymentButton from "./components/PaymentButton";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box className="page-container">
          <Box className="content-wrap">
            <Routes>
              <Route path="/" element={<Test />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/new-partners" element={<NewPartners />} />
              <Route path="/awaiting-matches" element={<AwaitingMatches />} />
              <Route path="/existing-matches" element={<ExistingMatches />} />
              <Route path="/testing" element={<PaymentButton />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
