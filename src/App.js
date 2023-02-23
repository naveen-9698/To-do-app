import React, { useState } from "react";
import './App.css';
import Welcome from "./pages/Welcome";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export const CredentialsContext = React.createContext();
function App() {
  const credentialsState = useState(null);
  return (
    <div className="app-container">
      <CredentialsContext.Provider value={credentialsState}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Welcome />
            </Route>
          </Switch>
        </Router>
      </CredentialsContext.Provider>

    </div>
  );
}

export default App;
