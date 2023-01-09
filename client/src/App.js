import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import Homepage from "./Homepage";
import Footer from "./Footer";

const App = () => {
  return(
  <BrowserRouter>
    <GlobalStyles />
    <Header />
    <Routes>
      <Route path="/" element={<Homepage />}></Route>
      {/*<Route path="/newcrossing" element={<NewCrossing />}></Route>
      <Route path="/policereports" element={<PoliceReports />}></Route>
      <Route path="/contact" element={<Contact />}></Route>
      <Route path="/profile" element={<Profile />}></Route> */}
    </Routes>

  </BrowserRouter>
  )
};

export default App;
