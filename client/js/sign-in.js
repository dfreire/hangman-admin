import {React} from "globals/react";
import {Router, Link} from "globals/react-router";
import {EmailInput} from "widgets/email-input";
import {PasswordInput} from "widgets/password-input";
import {Post} from "ajax";

var i18n = {
    PanelTitle: {
        en: "Sign In",
        pt: "Entrar"
    },
    SignInButton: {
        en: "Sign In",
        pt: "Entrar"
    },
    SignUpButton: {
        en: "Sign Up",
        pt: "Registar"
    },
    TextBetweenButtons: {
        en: "or",
        pt: "ou"
    },
    AccessDeniedMessage: {
        en: "Access Deneid: There is no user with that email and password in our system.",
        pt: "Acesso Negado: Não existe nenhum utilizador com esse email e password no nosso sistema."
    }
};

export var SignIn = React.createClass({
    mixins: [Router.State],

    getInitialState: function() {
        var state = { params: this.getParams() };
        return state;
    },

    getI18N: function(key) {
        try {
            return i18n[key][this.state.params.lang]
        } catch (err) {
            console.warn(key);
            console.error(err);
        }
    },

    linkTo: function(link) {
        return "/" + this.state.params.lang + "/" + link;
    },

    validate: function() {
        var isValid = true;
        if (!this.refs.myEmail.validate()) {
            isValid = false;
        }
        if (!this.refs.myPassword.validate()) {
            isValid = false;
        }
        return isValid;
    },

    onSignIn: function(e) {
        e.preventDefault();
        if (this.validate()) {
            var requestData = {
                email:     this.refs.myEmail.getValue(),
                password:  this.refs.myPassword.getValue(),
            };
            var that = this;
            Post("/sign-in", requestData, function(responseData) {
                console.log("sign-in", responseData);
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

        var accessDeniedMessageClasses = cx({
            'alert':         true,
            'alert-danger':  true,
            'hidden':        !this.state.hasSignedUp
        });

        return (
            <div className="my-screen-center">
            <div className="row">
            <div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-8 col-xs-offset-2">

            <div className={panelClasses}>
            <div className="panel-heading">
                <h3 className="panel-title">{this.getI18N("PanelTitle")}</h3>
            </div>
            <div className="panel-body">
                <form role="form" onSubmit={this.onSignIn}>
                    <EmailInput ref="myEmail" />
                    <PasswordInput ref="myPassword" />
                    <div className="form-group">
                        <button className="btn btn-primary btn-block">{this.getI18N("SignInButton")}</button>
                    </div>
                    <div className="form-group">
                        <p className="text-center">{this.getI18N("TextBetweenButtons")}</p>
                    </div>
                    <div className="form-group">
                        <Link to={this.linkTo("sign-up")} className="btn btn-default btn-block">{this.getI18N("SignUpButton")}</Link>
                    </div>
                </form>
            </div>
            </div>

            <div className={accessDeniedMessageClasses} role="alert" dangerouslySetInnerHTML={{__html: this.getI18N("AccessDeniedMessage")}} />

            </div>
            </div>
            </div>
        );
    }
});

