# `mouseEvent`
The `mouseEvent getModifierState()` is used to return a boolean value that indicates whether the specified modifier key is
activated or not. The modifiers such as **CapsLock, ScrollLock and NumLock** are activated when they are clicked, and
deactivated when they are clicked again.

Let's take an input element to detect the CapsLock on/off behavior with an example,
```html
<input type="password" onmousedown="enterInput(event)" />

<p id="feedback"></p>

<script>
  function enterInput(e) {
    var flag = e.getModifierState("CapsLock");
    if (flag) {
      document.getElementById("feedback").innerHTML = "CapsLock activated";
    } else {
      document.getElementById("feedback").innerHTML =
        "CapsLock not activated";
    }
  }
</script>
```

Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)