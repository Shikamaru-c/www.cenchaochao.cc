---
  title: 实现一个最简单的Express
  date: 2019-01-15
  spoiler: 使用Node.js完成一个简易的Express框架，完成其核心功能。
---

## 前言

在日常开发中，我们经常会使用Node.js来搭建一个简单的Server。// More-TODO

###

```js
  const http = require('http')

  class Express {
    constructor () {
      this.layer = undefined
    }

    use (layer) {
      this.layer = layer
    }

    callback (req, res) {
      this.layer(req, res)
    }
    
    listen (port, callback = () => {}) {
      http.createServer(this.callback.bind(this)).listen(port, callback)
    }
  }
```

### 

```js
  class Express {
    constructor () {
      this.layers = []
    }

    use (layer) {
      this.layers.push(layer)
    }

    run (req, res) {
      this.layers.forEach(layer => layer(req, res))
    }

    callback (req, res) {
      this.run(req, res)
    }

    // listen ...
  }
```

###

```js
  class Express {
    // constructor ...

    use (layer) {
      this.layers.push(layer)
    }

    run (req, res) {
      let id = 0
      const next = () => {
        this.layers[id++](req, res, next)
      }

      next()
    }

    // callback ...

    // listen ...
  }
```

###

```js
  const METHODS = ['get', 'post', 'put', 'delete']

  class Express {
    constructor () {
      this.layers = []
      this.init()
    }

    init () {
      METHODS.forEach(method => this[method] = (url, callback) => {
        this.layers.push(new Layer(url, callback))
      })
    }

    use (callback) {
      this.layers.push(new Layer('*', callback))
    }

    run (callback) {
      let id = 0
      const url = req.url
      const next = () => {
        const layer = this.layers[id++]
        if (layer.isMatched(url) {
          layer(req, res, next)
        } else {
          next()
        }
      }
      next()
    }

    // callback ...

    // listen ...
  }

  class Layer {
    constructor (url, callback) {
      this.url = url
      this.fn = callback
    }
    
    isMatched (url) {
      return this.url === '*' || this.url === url
    }
  }
```