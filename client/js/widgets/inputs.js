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
        return {value: ""};
    },
    setValue: function(e) {
        this.setState({value: e.target.value});
    },
    getValue: function() {
        return this.state.value;
    },
    validate: function(fn) { 
        if (_.isFunction(fn)) {
            return fn(this.state.value);
        } else {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(this.state.value);
        }
    },
    render: function() {
        return (
            <input type="text" className="form-control" onChange={this.setValue} value={this.state.value} />
        );
    }
});
