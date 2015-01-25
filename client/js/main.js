import {React} from "globals/react"
import {Router, Route, RouteHandler, DefaultRoute, NotFoundRoute, Redirect, Link} from "globals/react-router"
import {SignUp} from "sign-up";

var Container = React.createClass({
    render: function() {
        return (
            <div className="container">
                <RouteHandler/>
            </div>
        );
    }
});

var routes = (
    <Route handler={Container} path="/">
        <DefaultRoute handler={SignUp} />
        <Route name="sign-up" handler={SignUp} />
    </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
    React.render(<Handler/>, document.body);
});
