import {React} from "globals/react"
import {Link} from "globals/react-router"
import {PasswordInput} from "widgets/inputs"

export var SignUp = React.createClass({
    getInitialState: function() {
        return {email: "", password: ""};
    },
    setEmail: function(e) {
        this.setState({email: e.target.value});
    },
    onSignUp: function(e) {
        e.preventDefault();
        console.warn(this.state, this.refs.myPassword.getValue());
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
                        <input type="text" className="form-control" onChange={this.setEmail} value={this.state.email} />
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
