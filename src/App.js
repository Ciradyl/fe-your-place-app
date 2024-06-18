import React, { useCallback, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { NewPlace, UpdatePlace, UserPlaces } from "./places/__index__";
import { Auth, Users } from "./user/__index__";
import { MainNavigation } from "./shared/components/Navigation/__index__";
import { AUTHENTICATION_CONTEXT } from "./shared/context/auth-context";

const App = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState();

  const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
  }, []);

  let APP_ROUTES;
  if (token) {
    APP_ROUTES = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    APP_ROUTES = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AUTHENTICATION_CONTEXT.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        {/* Switch Block */}
        <main>{APP_ROUTES}</main>
      </Router>
    </AUTHENTICATION_CONTEXT.Provider>
  );
};

export default App;
