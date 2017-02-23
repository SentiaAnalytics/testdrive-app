const {run, browser} = require('../util')

before(() => browser.init())
after(() => browser.end())
describe('Auth', () => {
  it('should login', run(function*(t) {
    yield browser.url('http://www.facebook.com')
    const title = yield browser.getTitle()
    console.log('Title was: ' + title);
  }))

  it('should login', run(function*(t) {
    yield browser.url('http://www.google.com')
    const title = yield browser.getTitle()
    console.log('Title was: ' + title);
  }))

  it('should login', run(function*(t) {
    yield browser.url('http://www.amazon.com')
    const title = yield browser.getTitle()
    console.log('Title was: ' + title);
  }))
})
ø
