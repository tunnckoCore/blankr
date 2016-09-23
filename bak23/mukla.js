'use strict'

app
  .use(function one (done) {
    this.one = 'one'
    // console.log('first:', this.one)
    // throw new Error('foo')
    fs.readFile('package.json', done)
  })
  .use(function two () {
    this.two = 'two'
    // console.log('second:', this.two)
    // console.log('args:', a, b, c) // => 1 2 3
    // throw new Error('foo')
    return fs.readFileSync('not exist', 'utf8')
  })
  .use(function * gen () {
    return Promise.resolve(123)
  })
  .use(function syncness () {
    return 777
  })
  .use(function sync () {
    return function (done) {
      done(null, [555, 23])
    }
  })
  .use(function syncReturnPromise () {
    return function promise () {
      return Promise.resolve(555)
    }
  })
  .use(function three (done) {
    this.three = 'three'
    // console.log('third:', this.three)
    // console.log('ctx:', this)
    fs.stat('./test.js', done)
  })
  .use(function nested () {
    // console.log('this1:', this)
    return function nested2 () {
      // console.log('this2:', this)
      return function sync () {
        // console.log('this3:', this)
        // console.log('this.foo === 123?', this.foo === 123)
        return Promise.resolve([8,7,6])
      }
    }
  })
  .use(function nesting () {
    return function foobar () {
      return function nestedCb () {
        return function cbak (done) {
          dsfsdf // error
          done(null, 123)
        }
      }
    }
  })
  .use(function sasasa () {
    return function foobar () {
      return function nestedCb () {
        return function sync () {
          return 123
        }
      }
    }
  })
