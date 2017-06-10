/*
LazyMan('Hank').print()//输出:
Hi! This is Hank!
LazyMan('Hank').sleep(10).eat('dinner').print()//输出
Hi! This is Hank!
//等待10秒..
Wake up after 10
Eat dinner~
LazyMan('Hank').eat('dinner').eat('supper').print()//输出
Hi This is Hank!
Eat dinner~
Eat supper~
LazyMan('Hank').sleepFirst(5).eat('supper').print()//输出
//等待5秒
Wake up after 5
Hi This is Hank!
Eat supper
*/
function LazyMan(name){
    let my = new Promise(function(resolve){
        resolve('Hi This is '+name+' !')
    })
    function delay(time){
        return new Promise(function(resolve){
            setTimeout(function(){
                resolve('Wake up after '+time)
            },time*1000)
        })
    }

    return {
        eat:function(meal){
            my = my.then(function(news){
                console.log(news)
                return p
            })
            let p = new Promise(function(resolve){
                resolve('Eat '+meal+' ~')
            })
            return this
        },
        sleep:function(time){
            my = my.then((news)=>{
                console.log(news)
                return delay(time)
            })
            return this
        },
        sleepFirst: function(time){
            let myName = my  //防止覆盖，为什么在这里还要改变my的值，
            //因为，如果不改变，my的值就是第20行,已经存在my的值了，所以没必要等delay执行完再执行print()
            my = delay(time).then((news)=>{  //改变my的值，才能有效的在最后一步调用print()
                console.log(news)
                return myName
            })
             return this
/*
let aaa = 111
aaa = function (){
console.log(222)
return aaa
}
aaa  //输出
function (){
console.log(222)
return aaa
}
*/
        },
        print: function(){
            my.then(function(news){
                console.log(news) //这句怎么执行，是取决于my
            })
        }
    }
}
LazyMan('Hank').sleepFirst(2).print()