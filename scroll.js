
var running = false;
function scrollyWolly() {
    if (running) {
        running = false;
        var scrollInterval = setInterval(function () {
            // RUN CODE IN HERE
            console.log('event');
        }, 10);
        setTimeout(function () {
            clearInterval(scrollInterval);
        }, 100);
    } else {
        running = true;
    }
}

window.addEventListener('scroll', scrollyWolly);

