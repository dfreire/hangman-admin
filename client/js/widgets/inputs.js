import {React} from "globals/react"

export var EmailInput = React.createClass({
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
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
        return (
            <div className={classes}>
                <label className="control-label">Email</label>
                <input type="text" className="form-control" onChange={this.setValue} value={this.state.value} />
            </div>
        );
    }
});

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
            var value = this.state.value;
            if (!_.isString(value)) {
                isValid = false;
            }
            if (value.length < 8) {
                isValid = false;
            }
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
        return (
            <div className={classes}>
                <label>Password</label>
                <input type="password" className="form-control" onChange={this.setValue} value={this.state.value} />
            </div>
        );
    }
});
