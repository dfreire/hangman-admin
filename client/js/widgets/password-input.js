import {React} from "globals/react"

export var PasswordInput = React.createClass({
    getInitialState: function() {
        return {value: "", isValid: true};
    },
    setValue: function(e) {
        this.setState({value: e.target.value});
    },
    getValue: function() {
        return this.state.value;
    },
    validate: function(fn) { 
        var isValid = true;
        if (_.isFunction(fn)) {
            isValid = fn(this.state.value);
        } else {
            var re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
            isValid = re.test(this.state.value);
        }
        this.setState({isValid: isValid});
        return isValid;
    },
    render: function() {
        var cx = React.addons.classSet;
        var classes = cx({
            'form-group':    true,
            'has-feedback':  !this.state.isValid,
            'has-error':     !this.state.isValid
        });
        var helpClasses = cx({
            'hidden':       this.state.isValid,
            'text-danger':  true
        });
        return (
            <div className={classes}>
                <label className="control-label">Password</label>
                <input type="password" className="form-control" onChange={this.setValue} value={this.state.value} />
                <small className={helpClasses}>The password must be at least 8 characters long and must contain at least one upper case letter, one lower case letter, one digit, and one special character.</small>
            </div>
        );
    }
});
