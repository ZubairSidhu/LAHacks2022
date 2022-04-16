import React from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./App.css";

// Pages
import Test from "./pages/TestPage/Test";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Box className="page-container">
          <Box className="content-wrap">
            <Routes>
              <Route path="/" element={<Test />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
