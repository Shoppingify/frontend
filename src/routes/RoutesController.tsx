import React from 'react'

// Libs
import { Switch, Route, Redirect } from 'react-router-dom'

// Pages
import ItemsPage from '../pages/items/ItemsPage'
import HistoryPage from '../pages/history/HistoryPage'
import StatisticsPage from '../pages/statistics/StatisticsPage'

// Route types
import PrivateRoute from '../components/route/PrivateRoute'
import HistoryShowPage from '../pages/history/HistoryShowPage'

// TODO refactor, last route is currently public, might cause bugs
/**
 * Private routes controller
 */
function RoutesController() {
    return (
        <Switch>
            <PrivateRoute component={ItemsPage} exact path="/items" />
            <PrivateRoute component={HistoryShowPage} path="/history/:listId" />
            <PrivateRoute component={HistoryPage} path="/history" />

            <PrivateRoute component={StatisticsPage} path="/statistics" />
            <Route render={() => <Redirect to="/items" />} />
        </Switch>
    )
}

export default RoutesController
