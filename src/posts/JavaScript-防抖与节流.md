---
  title: JavaScript 防抖与节流
  date: 2019-01-10
  spoiler:
---

#### 防抖与节流

在日常开发中，我们有大量需求要处理用户的操作，而用户面对某些迟缓的回馈会频繁地制造的点击、滚动之类的事件。这时我们要合理的处理这些操作，不能每次都调用相应的函数。防抖与节流能以不一样的方式解决这个问题，它们的核心都是防止函数的多次调用。区别在于：
  - 防抖是将多次执行变为最后一次执行
  - 节流是将多次执行变成每个一段时间执行

***

##### 防抖

先来实现一个最简单的防抖函数：

```js
  function debounce (fn, wait) {
    let timer
    return function () {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, arguments)
      }, wait)
    }
  }
```

很简单的一个函数，具体实现就是每次以定时器的方式调用函数，并且在执行前都调用一次 clearTimeout。也就是说，如果调用函数的间隔小于 ``wait ms``，那么就会取消掉上一次的调用。函数的执行时机是在用户触发事件的 ``wait ms`` 后。

这就引来了另一个问题，并不是所有的需求都要在最后一次事件触发后才调用响应的函数，有些时候我们需要立即响应用户的触发的事件。
例如：
  - 用户在填写一个 ``input`` 框，我们的需求是将用户的输入信息去调用相应的接口。这时就需要最后一次 ``input`` 事件后去发起请求，也就是可以使用我们刚才的函数。
  - 还有的情况下，用户在使用一个 ``button`` 按钮，来触发订阅的请求，这时我们就需要第一时间发起这样的请求，并取消后面的连续点击，接下来我们来实现它。

```js
  function debounce (fn, wait) {
    let timer
    return function () {
      if (timer) {
        clearTimeout(timer)
      } else {
        fn.apply(this, arguments)
      }
      timer = setTimeout(() => {
        timer = null
      }, wait)
    }
  }
```

也比较简单，和刚才的函数相比就是多了一个分支。用户会在第一次触发事件时调用相应的函数，但在之后的连续点击都会被取消掉。

接下来我们给 ``debounce`` 添加一个 ``immediate`` 参数来合并这两个函数。

```js
  function debounce (fn, wait, immediate) {
    let timer
    return function () {
      if (timer) clearTimeout(timer)
      if (immediate) {
        if (!timer) {
          fn.apply(this, arguments)
        }
        timer = setTimeout(() => {
          timer = null
        }, wait)
      } else {
        timer = setTimeout(() => {
          fn.apply(this, arguments)
        }, wait)
      }
    }
  }
```

很简单的合并了两个函数，可以稍微重构一下，将这两个 ``setTimeout`` 合并起来。

```js
  function debounce (fn, wait, immediate) {
    let timer
    function later (context, args) {
      return setTimeout(() => {
        timer = null
        if (!immediate) {
          fn.apply(context, args) 
        }
      }, wait)
    }

    return function () {
      if (!timer) {
        timer = later(this, arguments)

        if (immediate) {
          fn.apply(this, arguments)
        }
      } else {
        clearTimeout(timer)
        timer = later(this, arguments)
      }
    }
  }
```

##### 节流

还是先来看一个简单的实现版本：

```js
  function throttle (fn, wait) {
    let last = 0
    function getNow() {
      return +(new Date())
    }
    return function () {
      if (getNow() - last > wait) {
        fn.apply(this, arguments)
        last = getNow()
      }
    }
  }
```

这个函数是获取时间戳，和上一次执行的时间戳向比较，如果大于 ``wait`` 值就调用函数。并且执行第一次的调用，我们还可以实现一个在点击后延迟 ``wait ms`` 才调用相应的函数，并在最后一次点击后还有一个延迟了 ``wait ms`` 的函数将会执行。

```js
  function throttle (fn, wait) {
    let timer
    return function () {
      if (!timer) {
        timer = setTimeout(() => {
          fn.apply(this, arguments)
          timer = null
        })
      }
    }
  }
```

很简单，利用 ``setTimeout`` 来替换时间戳就能达到目的，现在还是来合并两个两个函数：

```js
  function throttle (fn, wait, immediate) {
    let last = 0
    let timer
    return function () {
      if (immediate) {
        if (getNow() - last > wait) {
          fn.apply(this, arguments)
          last = getNow()
        }
      } else {
        if (!timer) {
          timer = setTimeout(() => {
            fn.apply(this, arguments)
            timer = null
          }, wait)
        }
      }
    }

    function getNow () {
      return +(new Date())
    }
  }
```

*这里想提一下，节流函数中的在给 ``last`` 赋值时间戳是有几个时机，并且有不同的时间戳的选择，可以根据自己的业务来选择不同的方案。在用 ``setTimeout`` 版本中给 ``timer`` 赋值为空也是同样的道理。*
