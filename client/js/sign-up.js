import {React} from "globals/react";
import {Link} from "globals/react-router";
import {EmailInput} from "widgets/email-input";
import {PasswordInput} from "widgets/password-input";
import {Post} from "ajax";

export var SignUp = React.createClass({
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
            Post("/sign-up", requestData, function(responseData) {
            });
        }
    },
    render: function() {
        return (
            <div className="my-screen-center">
            <div className="row">
            <div className="col-md-4 col-md-offset-4">

            <div className="panel panel-default">
            <div className="panel-heading">
                <h3 className="panel-title">Sign Up</h3>
            </div>
            <div className="panel-body">
                <form role="form" onSubmit={this.onSignUp}>
                    <EmailInput ref="myEmail" />
                    <PasswordInput ref="myPassword" />
                    <div className="form-group">
                        <p className="text-justify">
                            By signing up you are agreeing to our <a href="/terms-of-service">terms of service</a> and <a href="/privacy-policy">privacy policy</a>.
                        </p>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block">Sign Up</button>
                    </div>
                    <div className="form-group">
                        <p className="text-center">or</p>
                    </div>
                    <div className="form-group">
                    </div>
                </form>
            </div>
            </div>

            </div>
            </div>
            </div>
        );
    }
});
//<Link to="sign-in" className="btn btn-default btn-block">Sign In</Link>
