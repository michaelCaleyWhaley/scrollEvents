# Scroll Event - Best practices

Research on the current options available to throttle or otherwise reduce the load on browsers from scroll events.

Featured:
  - Lodash
  - John Resig solution
  - Caley solution (me)

## The problem
  - Preventing too many events on scroll
  - Providing enough linear and reliable events to still be useful

### Useful Links

| Plugin | README |
| ------ | ------ |
| Lodash | https://lodash.com/docs |
| John Resig Blog | https://johnresig.com/blog/learning-from-twitter/ |

## Lodash

Lodash is 'the de-facto standard for event throttling in Javascript'. Obviously loading an entire library to throttle a scroll event is not ideal, so Lodash provides a command line cli which allows you to customise packages https://www.npmjs.com/package/lodash-cli .

If you're going to use Lodash first consider:
  - Even at a reduced size Lodash will still need to be downloaded by the client.
  - Lodash will simply reduce the number of times the scroll event is fired, so if your feature needs a lot of events this is still not ideal.
  - Setting a callback on a scroll event is still considered bad practice even using Lodash.

## John Resig solution

In John Resig's (author of Jquery) solution the event handler is removed completely from the scroll callback and handled by an interval check which John advises is much better as it can only emit a set number of events which are totally in the hands of the programmer, rather than at the mercy of individual browsers.

```sh
var outerPane = $details.find(".details-pane-outer"),
    didScroll = false;
 
$(window).scroll(function() {
    didScroll = true;
});
 
setInterval(function() {
    if ( didScroll ) {
        didScroll = false;
        // Check your page position and then
        // Load in more results
    }
}, 250);
```

## Caley solution

I decided to build upon Johns solution using an interval instead of the scroll callback, with the difference being that Johns interval continually runs and mine only runs around the period that the scroll event is fired. This allows the option of having the events still running for a period after the scroll (or not depending on requirements).

```sh
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

```