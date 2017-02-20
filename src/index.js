require('./style.less')

if (process.env.NODE_ENV === 'development') {
  require.ensure([], function() {
    console.log('module1.before');
    var module1 = require('./module1');
    console.log('module1.after');

    document.getElementById('container').innerText = 'module1';
  })
} else {
  require.ensure([], function() {
    console.log('module2.before');
    var module2 = require('./module2');
    console.log('module2.after');

    document.getElementById('container').innerText = 'module2';
  })
}
