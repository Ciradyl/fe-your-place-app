import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";

const App = () => {
  return (
    <Router>
      <MainNavigation />
      {/* Switch Block */}
      <main>
        <Switch>
          {/* Home */}
          <Route path="/" exact>
            <Users />
          </Route>
          {/* User Places */}
          <Route path="/:userId/places" exact>
            <UserPlaces />
          </Route>
          {/* Places */}
          <Route path="/places/new" exact>
            <NewPlace />
          </Route>
          <Route path="/places/:placeId">
            <UpdatePlace />
          </Route>
          {/* catch */}
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
