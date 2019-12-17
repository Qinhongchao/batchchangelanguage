const getType = (data) => Object.prototype.toString.call(data).replace(/(\[|\]|object|\s)/g, '');
//首字母转大写
const firstLetterToUpperCase = str => str.replace(/^./, function(r) {
    return r.toUpperCase()
});
let h = firstLetterToUpperCase("abc")
module.exports = {
    getType,
    firstLetterToUpperCase
};




// function functionReplacer(key, value) {
//     if (typeof(value) === 'function') {
//         return value.toString();
//     }
//     return value;
// }

// function functionReviver(key, value) {
//     if (key === "") return value;

//     if (typeof value === 'string') {
//         var rfunc = /function[^\(]*\(([^\)]*)\)[^\{]*{([^\}]*)\}/,
//             match = value.match(rfunc);

//         if (match) {
//             var args = match[1].split(',').map(function(arg) {
//                 return arg.replace(/\s+/, '');
//             });
//             return new Function(args, match[2]);
//         }
//     }
//     return value;
// }

// var person = {
//     name: 'John Smith',
//     age: 42,
//     isJohn: function() {
//         let a = 'ui';
//         this[a] = 09
//         return !!this.name.match(/John/);
//     }
// };

// jsonString = JSON.stringify(person, functionReplacer);
// restoredPerson = JSON.parse(jsonString, functionReviver);

// console.log(jsonString);
// console.log(restoredPerson.isJohn.toString());