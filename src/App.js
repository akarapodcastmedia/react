import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInSignUp from "./login";
import Verify from "./verify";
import Dashboard from "./dashboard";

function App() {
       return(
          <BrowserRouter>
              <Routes>
                <Route >
                  <Route path="/" element={<SignInSignUp />} />
                  <Route path="/verify" element={<Verify />} />
                  <Route path="/board" element={<Dashboard />} />
                </Route>
              </Routes>
          </BrowserRouter>
       )
 }

export default App;
