import {React} from "globals/react"

export var PasswordInput = React.createClass({
    getInitialState: function() {
        return {value: ""};
    },
    setValue: function(e) {
        this.setState({value: e.target.value});
    },
    getValue: function() {
        return this.state.value;
    },
    render: function() {
        return (
            <input type="password" className="form-control" onChange={this.setValue} value={this.state.value} />
        );
    }
});

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
        console.warn("isValid", isValid);
        this.setState({isValid: isValid});
        return isValid;
    },
    render: function() {
        var cx = React.addons.classSet;
        var classes = cx({
            'form-control': true,
            'has-error': !this.state.isValid
        });
        return (
            <input type="text" className={classes} onChange={this.setValue} value={this.state.value} />
        );
    }
});
