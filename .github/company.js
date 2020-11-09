

console.log(window.location.search);
var urlParams = new URLSearchParams(window.location.search);
console.log(urlParams.has('post')); // true