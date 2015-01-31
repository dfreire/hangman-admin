import {React} from "globals/react";
import {Router} from "globals/react-router"
import {Link} from "globals/react-router";
import {Post} from "ajax";

export var VerifyEmail = React.createClass({
    mixins: [Router.State],

    getInitialState: function() {
        var requestData = {
        };
        Post("/verify-email", requestData, function(responseData) {
        });
        return this.getParams();
    },
    render: function() {
        return (
            <div className="my-screen-center">
            <div className="row">
            <div className="col-md-4 col-md-offset-4">

            <div className="alert alert-success" role="alert">Verify email... {this.state.token}</div>

            </div>
            </div>
            </div>
        );
    }
});
