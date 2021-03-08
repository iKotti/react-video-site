import React from "react";
import Sidebar from "./components/Sidebar";
import Videos from "./components/Videos";
import Wishlist from "./components/Wishlist";
import WatchLater from "./components/WatchLater";
import AddVideo from "./components/Forms/AddVideo";
import VideoDetail from "./components/VideoDetail";
import DarkMode from "./components/darkMode";
import Github from "./components/Github"

import "./assests/style.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {

  return (
    <Router>
      <div className="container-fluid pl-0">
        <div className="row">
        <DarkMode/>
          <div className="col-lg-2">
            <Sidebar />
          </div>
        
        <div className="col-lg-10">
          <Switch>
            <Route exact path="/" component={Videos} />
            <Route exact path="/wishlist" component={Wishlist} />
            <Route exact path="/watch-later" component={WatchLater} />
            <Route exact path="/add-video" component={AddVideo} />
            <Route exact path="/github" component={Github} />
            <Route exact path="/:slug" component={VideoDetail} />
          </Switch>
        </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
