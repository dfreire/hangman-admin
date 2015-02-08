import {React} from "globals/react";
import {Router} from "globals/react-router"
import {Link} from "globals/react-router";
import {Post} from "ajax";

var i18n = {
    ConfirmedAccountText: {
        en: "Your account has been confirmed.",
        pt: "O seu registo foi confirmado."
    }
}

export var ConfirmAccount = React.createClass({
    mixins: [Router.State],

    getInitialState: function() {
        var state = { params: this.getParams(), hasSignedUp: false };

        var requestData = {
            token: state.params.token
        };
        Post("/confirm-account", requestData, function(responseData) {
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
