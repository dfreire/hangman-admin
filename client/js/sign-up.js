import {React} from "globals/react"
import {Link} from "globals/react-router"
import {EmailInput, PasswordInput} from "widgets/inputs"

export var SignUp = React.createClass({
    onSignUp: function(e) {
        e.preventDefault();
        var email    = this.refs.myEmail.getValue();
        var password = this.refs.myPassword.getValue();
        console.warn(email, password);
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
                    <div className="form-group">
                        <label>Email</label>
                        <EmailInput ref="myEmail" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <PasswordInput ref="myPassword" />
                    </div>
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
