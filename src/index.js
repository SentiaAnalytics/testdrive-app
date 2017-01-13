//@flow
import startApp from  './startApp.js'
import view from './view.js'
import update from './update'

const model = {
  title: 'hello world'
}


startApp({
  view,
  model,
  update,
  root: document.getElementById('root')
})
