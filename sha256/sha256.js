const sha256 = require('js-sha256');
const fs = require('fs');

console.log(sha256('18598270175'));

fs.readFile(__dirname + '/tel.txt', 'utf16le', (err, data) => {
    if (err) throw err;
    console.log('************');
    let num = ''
    data.split(/\t*\n/).forEach((i,n)=>{
        i = i.trim()
        num = num + sha256(i) +'\r\n'
    })
    fs.writeFile(__dirname + '/num.txt',num,err=>{
        if (err) throw err;
        console.log('文件已保存');
    })

});