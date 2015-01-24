import {Hello} from "hello";

var Router        = ReactRouter;
var Route         = ReactRouter.Route;
var RouteHandler  = ReactRouter.RouteHandler;
var DefaultRoute  = ReactRouter.DefaultRoute;
var NotFoundRoute = ReactRouter.NotFoundRoute;
var Redirect      = ReactRouter.Redirect;
var Link          = ReactRouter.Link;

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
        <DefaultRoute handler={Hello} />
    </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.body);
});
