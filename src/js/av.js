var APP_ID = 'BzVuUYN3PncYr1M9s3OjdU9V-gzGzoHsz';
var APP_KEY = 'CljMGSwyXKYfplnH1gIwxQiB';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

var TestObject = AV.Object.extend('TestObject');
var testObject = new TestObject();
testObject.save({
    words: 'Hello World!'
}).then(function(object) {

})