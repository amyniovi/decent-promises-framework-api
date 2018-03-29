var fs = require("fs");

fs.readFile(__dirname + "/ReadMeCrap.txt","utf8", function(error, data){
if(error)
{
    console.log(__dirname);
    console.error(error);
    return;
}
if (data)
console.log(data);
});