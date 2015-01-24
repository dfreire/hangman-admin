export var Hello = React.createClass({
    render: function() {
        var time = "today";
        return (
            <h1>{`Hello there, how are you ${time}?`}</h1>
        );
    }
});
