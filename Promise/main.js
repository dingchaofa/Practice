/*
红灯三秒亮一次，绿灯一秒亮一次，黄灯2秒亮一次；如何让三个灯按照这个规律不断交替重复亮灯？（用Promse实现）三个亮灯函数已经存在：
function red(){
console.log('red');
}
function green(){
console.log('green');
}
function yellow(){
console.log('yellow');
}*
*/

function red(){
    console.log('red');
}
function green(){
    console.log('green');
}
function yellow(){
    console.log('yellow');
}
function myPromise(fn,time){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            fn()
            resolve()
        },time)
        })
    }

var light = new Promise(function(resolve,reject){
    resolve()
})
function alterLight(){
    light
        .then(()=>{
            return myPromise(red,3000)
        })
        .then(()=>{
            return myPromise(green,1000)
        })
        .then(()=>{
            return myPromise(yellow,2000)
        }).then(alterLight)
}
alterLight()