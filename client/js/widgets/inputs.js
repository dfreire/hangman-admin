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
