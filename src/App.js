// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import AppRoute from "./route/AppRoute";
import { check_login_status } from "./pages/login/Login.Slice";

import LayoutNoauth from "./layouts/LayoutNoauth";
import LayoutAuth from "./layouts/LayoutAuth";
import { logout } from "./pages/login/Login.Slice";
// import dotenv from "dotenv";
// dotenv.config();
function App() {
  const dispatch = useDispatch();
  const loggedin = useSelector((state) => state.LoginSlice.loggedin);
  const userType = localStorage.getItem("usertype");

  useEffect(() => {
    dispatch(check_login_status());
    if (userType === null) {
      dispatch(logout());
    }
  }, [dispatch]);

  return (
    <>
      <Router>
        {loggedin ? (
          <div>
            <LayoutAuth />
            <br />
          </div>
        ) : (
          <div>{/* <LayoutNoauth /> */}</div>
        )}
        <div className="page_container">
          <AppRoute loggedin={loggedin} />
        </div>
      </Router>
    </>
  );
}

export default App;
