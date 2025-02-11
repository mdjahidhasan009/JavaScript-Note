# timeout
In JavaScript, the `setTimeout()` method is used to execute a function after a specified number of milliseconds. 
The `setTimeout()` method returns a timeout ID, which can be passed to the `clearTimeout()` method to cancel the timer.

### `clearTimeout` Method
The clearTimeout() function is used in JavaScript to clear a timer set with the setTimeout() function before it executes.
The setTimeout() function returns a timeout ID, which can be passed to clearTimeout() to cancel the timer.

**Example** <br/>
In the following example, the setTimeout method sets a timer to display an alert message after 3 seconds. This timer can
be stopped using the clearTimeout method.
```html
<!DOCTYPE html>
<html>
<head>
  <title>clearTimeout Example</title>
</head>
<body>
  <button onclick="start()">Start</button>
  <button onclick="stop()">Stop</button>

  <script>
    var msg;

    function greeting() {
      alert('Good morning');
    }

    function start() {
      msg = setTimeout(greeting, 3000);
    }

    function stop() {
      clearTimeout(msg);
    }
  </script>
</body>
</html>
```


### Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)