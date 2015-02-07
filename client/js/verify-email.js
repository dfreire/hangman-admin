import {React} from "globals/react";
import {Router} from "globals/react-router"
import {Link} from "globals/react-router";
import {Post} from "ajax";
import {i18n} from "verify-email-i18n";

export var VerifyEmail = React.createClass({
    mixins: [Router.State],

    getInitialState: function() {
        var state = { params: this.getParams(), hasSignedUp: false };

        var requestData = {
            token: state.params.token
        };
        Post("/verify-email", requestData, function(responseData) {
        });

        console.log(state.params);
        return state;
    },

    getI18N: function(key) {
        return i18n[key][this.state.params.lang]
    },
    
    render: function() {
        return (
            <div className="my-screen-center">
            <div className="row">
            <div className="col-md-4 col-md-offset-4">

            <div className="alert alert-success" role="alert">{this.getI18N("ConfirmedAccountText")}</div>

            </div>
            </div>
            </div>
        );
    }
});
