import React from "react";
import Articles from "./components/Articles";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


const App = () =>
    <div>
      <Nav />
      <Articles />
    </div>

export default App;
