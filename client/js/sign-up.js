import {React} from "globals/react";
import {Router, Link} from "globals/react-router";
import {EmailInput} from "widgets/email-input";
import {PasswordInput} from "widgets/password-input";
import {Post} from "ajax";

import {i18n} from "sign-up_en";

export var SignUp = React.createClass({
    mixins: [Router.State],

    getInitialState: function() {
        console.log(this.getParams());
        return { hasSignedUp: false };
    },

    onSignUp: function(e) {
        e.preventDefault();

        var isValid = true;
        if (!this.refs.myEmail.validate()) {
            isValid = false;
        }
        if (!this.refs.myPassword.validate()) {
            isValid = false;
        }

        if (isValid) {
            var requestData = {
                email:     this.refs.myEmail.getValue(),
                password:  this.refs.myPassword.getValue()
            };
            var that = this;
            Post("/sign-up", requestData, function(responseData) {
                that.setState({hasSignedUp: true});
            });
        }
    },

    render: function() {
        var cx = React.addons.classSet;

        var panelClasses = cx({
            'panel':          true,
            'panel-default':  true,
            'hidden':         this.state.hasSignedUp
        });

        var confirmationClasses =  cx({
            'alert':          true,
            'alert-success':  true,
            'hidden':         !this.state.hasSignedUp
        });

        return (
            <div className="my-screen-center">
            <div className="row">
            <div className="col-md-4 col-md-offset-4">

            <div className={panelClasses}>
            <div className="panel-heading">
                <h3 className="panel-title">{i18n.PanelTitle}</h3>
            </div>
            <div className="panel-body">
                <form role="form" onSubmit={this.onSignUp}>
                    <EmailInput ref="myEmail" />
                    <PasswordInput ref="myPassword" />
                    <div className="form-group">
                        <p className="text-justify" dangerouslySetInnerHTML={{__html: i18n.AgreementText}} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block">{i18n.SignUpButton}</button>
                    </div>
                    <div className="form-group">
                        <p className="text-center">{i18n.TextBetweenButtons}</p>
                    </div>
                    <div className="form-group">
                    </div>
                </form>
            </div>
            </div>

            <div className={confirmationClasses} role="alert">
                <p>We have sent you an email with a verification link.</p>
                <p>Please verify your account by clicking that link.</p>
            </div>

            </div>
            </div>
            </div>
        );
    }
});
//<Link to="sign-in" className="btn btn-default btn-block">Sign In</Link>
