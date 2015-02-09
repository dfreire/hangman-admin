import {React} from "globals/react";
import {Router, Link} from "globals/react-router";
import {EmailInput} from "widgets/email-input";
import {PasswordInput} from "widgets/password-input";
import {Post} from "ajax";

var i18n = {
    PanelTitle: {
        en: "Sign Up",
        pt: "Registe-se"
    },
    AgreementText: {
        en: "By signing up you are agreeing to our <a href='/terms-of-service'>terms of service</a> and <a href='/privacy-policy'>privacy policy</a>.",
        pt: "Ao fazer este registo está a concordar com os nossos <a href='/terms-of-service'>termos de serviço</a> e <a href='/privacy-policy'>política de privacidade</a>."
    },
    SignUpButton: {
        en: "Sign Up",
        pt: "Registar"
    },
    SignInButton: {
        en: "Sign In",
        pt: "Entrar"
    },
    TextBetweenButtons: {
        en:"or",
        pt: "ou"
    },
    VerificationMessage: {
        en: "<h3>Thank you</h3><p>In a few moments you will receive an email with a verification link.</p><p>Please verify your account by clicking that link.</p>",
        pt: "<h3>Obrigado</h3><p>Dentro de alguns instantes receberá um mail com um link de verificação.</p><p>Por favor verifique a sua conta clicando nesse link.</p>"
    }
};

export var SignUp = React.createClass({
    mixins: [Router.State],

    getInitialState: function() {
        var state = { params: this.getParams(), hasSignedUp: false };
        return state;
    },

    getI18N: function(key) {
        return i18n[key][this.state.params.lang]
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

    onSignUp: function(e) {
        e.preventDefault();
        if (this.validate()) {
            var requestData = {
                email:     this.refs.myEmail.getValue(),
                password:  this.refs.myPassword.getValue(),
                callback:  this.state.params.lang + "/verify-account"
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

        var verificationClasses = cx({
            'alert':          true,
            'alert-success':  true,
            'hidden':         !this.state.hasSignedUp
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
                <form role="form" onSubmit={this.onSignUp}>
                    <EmailInput ref="myEmail" />
                    <PasswordInput ref="myPassword" />
                    <div className="form-group">
                        <p className="text-justify" dangerouslySetInnerHTML={{__html: this.getI18N("AgreementText")}} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block">{this.getI18N("SignUpButton")}</button>
                    </div>
                    <div className="form-group">
                        <p className="text-center">{this.getI18N("TextBetweenButtons")}</p>
                    </div>
                    <div className="form-group">
                        <Link to={this.linkTo("sign-in")} className="btn btn-default btn-block">{this.getI18N("SignInButton")}</Link>
                    </div>
                </form>
            </div>
            </div>

            <div className={verificationClasses} role="alert" dangerouslySetInnerHTML={{__html: this.getI18N("VerificationMessage")}} />

            </div>
            </div>
            </div>
        );
    }
});
