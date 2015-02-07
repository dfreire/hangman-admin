import {React} from "globals/react"
import {Router, Route, RouteHandler, DefaultRoute, NotFoundRoute, Redirect, Link} from "globals/react-router"
import {SignUp} from "sign-up";
import {SignIn} from "sign-in";
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

var Lang = React.createClass({
    render: function() {
        return ( <RouteHandler/> );
    }
});

var routes = (
    <Route handler={Container} path="/">
        <Redirect from="/" to="/en/sign-up" />
        <Route name="sign-up"      path="/:lang/sign-up"             handler={SignUp} />
        <Route name="verify-email" path="/:lang/verify-email/:token" handler={VerifyEmail} />
        <Route name="sign-in"      path="/:lang/sign-in"             handler={SignIn} />
    </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
    React.render(<Handler/>, document.body);
});
