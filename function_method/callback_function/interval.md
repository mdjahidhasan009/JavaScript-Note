# interval
The `setInterval()` method is used to repeatedly execute a function or code snippet at a specified interval. The 
interval is specified in milliseconds. The `setInterval()` method returns an interval ID that can be used to stop the 
execution of the function using the `clearInterval()` method.

### `clearInterval` Method
The clearInterval() function is used in JavaScript to stop a timer set with the setInterval() function. The setInterval()
function returns an interval ID, which can be passed to clearInterval() to cancel the interval.

Example
In the following example, the setInterval method sets a timer to display an alert message every 3 seconds. This interval
can be stopped using the clearInterval method.
```html
<!DOCTYPE html>
<html>
<head>
  <title>clearInterval Example</title>
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
      msg = setInterval(greeting, 3000);
    }

    function stop() {
      clearInterval(msg);
    }
  </script>
</body>
</html>
```

### Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)
