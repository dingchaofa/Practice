function LazyMan(name) {
    let queue = []
    let api = {
        sleep: function (time) {
            queue.push(function () {
                setTimeout(function () {
                    console.log(`Wake up after ${time} ~`)
                    doNext()
                }, time * 1000)
            })
            return this
        },
        eat: function (what) {
            queue.push(function () {
                console.log(`Eat ${what} ~`)
                doNext()
            })
            return this
        },
        sleepFirst: function (time) {
            queue.unshift(function () {
                setTimeout(function () {
                    console.log(`Wake up after ${time} ~`)
                    doNext()
                }, time * 1000)
            })
            return this
        },
        hi: function () {
            queue.push(function () {
                console.log(`Hi! This is ${name} !`)
                doNext()
            })
            setTimeout(function () {
                doNext()
            }, 0)
        }
    }
    api.hi()
    function doNext() {
        let fn = queue.shift()
        fn && fn.call()
    }
    return api
}
//LazyMan('Hank')
//LazyMan('Hank').sleep(3).eat('dinner').eat('lunch')
//LazyMan('Hank').eat('lunch').eat('dinner')
//LazyMan('Hank').eat('lunch').sleep(3).eat('dinner').eat('lch')
LazyMan('Hank').eat('dinner').sleepFirst(3)
//LazyMan('Hank').sleepFirst(3).eat('dinner')