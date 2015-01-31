import {React} from "globals/react"
import {Router, Route, RouteHandler, DefaultRoute, NotFoundRoute, Redirect, Link} from "globals/react-router"
import {SignUp} from "sign-up";
import {VerifyEmail} from "verify-email";

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
        <Redirect from="/" to="sign-up" />
        <Route name="sign-up" handler={SignUp} />
        <Route name="verify-email" path="/verify-email/:token" handler={VerifyEmail} />
    </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
    React.render(<Handler/>, document.body);
});
