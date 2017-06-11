/* 用队列思维解决异步机制 
承接lazyMan问题
1. 先把同步的函数放到数组里，待异步函数执行完再调用同步函数
*/
function LazyMan(name) {
    let queue = []
    let api = {
        _time: false,
        sleep: function (time) {
            queue.push(function () {
                setTimeout(function () {
                    console.log(`Wake up after ${time} ~`)
                    doNext()
                }, time * 1000)
            })
            this._time = true
            doNext()
            return this
        },
        eat: function (what) {
            queue.push(function () {
                setTimeout(function () {
                    console.log(`Eat ${what} ~`)
                    doNext()
                }, 0)
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
                setTimeout(() => {
                    console.log(`Hi! This is ${name} !`)
                    if (!api._time) {  //如果存在sleep函数，则不执行doNext
                        doNext()
                    }
                }, 0)
            })
            setTimeout(function () {  //异步是为了让任务全部添加到queue中
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
//LazyMan('Hank').eat('dinner').sleepFirst(3)
LazyMan('Hank').sleepFirst(3).eat('dinner')