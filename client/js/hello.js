export function show() {
    var time = "today";
    React.render(
        <h1>{`Hello there, how are you ${time}?`}</h1>,
        document.getElementById('example')
    );
}
