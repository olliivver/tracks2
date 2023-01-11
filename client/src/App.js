import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import Homepage from "./Homepage";
import PoliceReports from "./PoliceReports";
import NewCrossing from "./NewCrossing";
import Contact from "./Contact";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/newcrossing" element={<NewCrossing />}></Route>
        <Route path="/policereports" element={<PoliceReports />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
