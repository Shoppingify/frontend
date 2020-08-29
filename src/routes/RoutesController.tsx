import React from 'react';

// Libs
import { Switch, Route, Redirect } from 'react-router-dom';

// Pages
import ItemsPage from "../pages/items/ItemsPage";
import HistoryPage from "../pages/history/HistoryPage";
import StatisticsPage from "../pages/statistics/StatisticsPage";

// Route types
import PrivateRoute from "../components/route/PrivateRoute";
import LoginPage from "../pages/login/LoginPage";
import PublicRoute from "../components/route/PublicRoute";

function RoutesController() {
  return (
    <Switch>
      <PrivateRoute component={ItemsPage} path="/items" />
      <PrivateRoute component={HistoryPage} path="/history" />
      <PrivateRoute component={StatisticsPage} path="/statistics" />
      <PublicRoute component={LoginPage} path="/login" />
      <Route render={ () => <Redirect to="/items" /> }/>
    </Switch>
  );
}

export default RoutesController;