---
  title: 实现一个最简单的Express
  date: 2019-01-15
  spoiler: 使用Node.js完成一个简易的Express框架，完成其核心功能。
---

## 前言

> Express 基于 Node.js 平台，快速、开放、极简的 Web 开发框架

个人认为学习框架最好的方式是 阅读官方文档 -> 写一个 Demo -> 实现框架其核心功能。
现在就让我们来实现一个最简单的 Express框架，这有利于我们更好的理解 Express 的工作机制。

## GO

1. 这里我们通过 ``class`` 来构建一个 Express，在使用时必须使用 ``new`` 关键字。现在，我们要实现其最简单的功能。调用 ``http`` 模块的 ``createServer`` 方法，传入一个通过 ``use`` 收集的响应请求的函数。

```js
  const http = require('http')

  class Express {
    constructor () {
      this.handle = undefined
    }

    use (fn) {
      this.handle = fn
    }
    
    listen (port, callback = () => {}) {
      http.createServer(this.handle).listen(port, callback)
    }
  }
```

2. 接下来我们将实现一个可以传入多个响应请求的函数。当接收到Http请求时，我们从第一个函数开始执行，要执行下一个函数需要通过 ``next`` 方法调用。

```js
  class Express {
    constructor () {
      this.handles = []
    }

    use (fn) {
      this.handles.push(fn)
    }

    dispatch (req, res) {
      let id = 0
      const next = () => {
        this.handles[id++](req, res, next)
      }

      next()
    }

    listen (port, callback = () => {}) {
      http.createServer(this.dispatch.bind(this)).listen(port, callback)
    }
  }
```

3. 这里功能加的有点多，但是都比较简单。我们用 ``init`` 方法，给实例添加了各种 ``method`` 对应的方法，其实现和 ``use`` 类似。接着我们将 ``push`` 到 ``hanlde`` 中的函数抽象成一个 ``Layer`` 类，其附带了 ``method``、``url`` 和 ``handle`` 属性，每次调用函数的逻辑都封装带 ``Layer`` 类中。（Express的路径匹配使用了 ``path-to-regexp`` npm包，这里我们为了保持简单，使用简单的字符串匹配）

```js
  const METHODS = ['get', 'post', 'put', 'delete']

  class Express {
    constructor () {
      this.handles = []
      this.init()
    }

    init () {
      METHODS.forEach(method => this[method] = (url, fn) => {
        this.handles.push(new Layer(method, url, fn))
      })
    }

    use (fn) {
      this.handles.push(new Layer('FROM_USE', '*', fn))
    }

    dispatch (req, res) {
      let id = 0
      const next = () => {
        if (this.handles.length > id) {
          this.handles[id++].handleRequest(req, res, next)
        }
      }
      next()
    }


    // listen ...
  }

  class Layer {
    constructor (method, url, fn) {
      this.method = method
      this.url = url
      this.handle = fn
    }
    
    isMatched (req) {
      return (this.url === '*' || this.url === req.url) &&
      (this.method === 'FROM_USE' || this.method === req.method.toLowerCase())
    }

    handleRequest (req, res, next) {
      if (!this.isMatched(req)) {
        next()
      } else {
        this.handle(req, res, next)
      }
    }
  }
```

4. 最后我们添加一个简单的错误处理机制，主要就是判断这个 ``handle`` 的形参的个数是否等于四，来判断这是不是一个错误处理函数。

```js
  class Express {
    // constructor ...

    // init ...

    // use ...

    dispatch (req, res) {
      let id = 0
      const next = (error) => {
        if (this.handles.length > id) {
          if (error) {
            this.handles[id++].handleError(error, req, res, next)
          } else {
            this.handles[id++].handleRequest(req, res, next)
          }
        }
      }
      next()
    }

    // listen ...
  }

  class Layer {
    // constructor ...
    
    // isMatched ...

    handleRequest (req, res, next) {
      if (!this.isMatched(req)) {
        next()
      } else {
        try {
          this.handle(req, res, next)
        } catch (e) {
          next(e)
        }
      }
    }

    handleError (error, req, res, next) {
      if (!this.isMatched(req) || this.handle.length !== 4) {
        next(error)
      } else {
        try {
          this.handle(error, req, res, next)
        } catch (e) {
          next(e)
        }
      }
    }
  }
```


## 结语

为了保持简单性，我们抛弃了Express的部分功能和一些参数间的逻辑判断，让我们更清晰的看到Express框架的内核实现。下面是一些Express中比较重要但是在这里还未实现的功能，可以自行实现一遍，或者阅读Express对应的源码。
  1. path-to-regexp 模块来处理路径匹配
  2. 一个 use 或 method 方法中，传入多个函数，其中可能带有错误处理函数