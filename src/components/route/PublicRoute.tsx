import React from 'react'

// Libs
import { Route, RouteProps } from 'react-router-dom'

// Ok to use any? Investigate further if for some reason this causes issues
interface PropTypes extends RouteProps {
    component: React.ComponentType<any>
}

/**
 * Public route component
 *
 * @param Component
 *  Component to be displayed
 * @param rest
 *  Props passed in
 */
const PublicRoute: React.FC<PropTypes> = ({
    component: Component,
    ...rest
}) => {
    return <Route {...rest} render={(props) => <Component {...props} />} />
}

export default PublicRoute
