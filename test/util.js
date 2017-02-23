const webdriverio = require('webdriverio');
exports.run = (f) => (x) =>
  new Promise((resolve, reject) => {
    const gen = f(x)
    const run = (x) => {
      try {
        const next = gen.next(x)
        next.done ? resolve(next.value) : next.value.then(run, reject)
      } catch (e) {
        reject(e)
      }
    }
    run()
})
var options = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};
exports.browser = webdriverio
    .remote(options)
