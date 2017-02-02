//@flow
import test from 'tape'
import sinon from 'sinon'
import startApp from './startApp.js'
import {cmd} from './cmd.js'
import Task from 'data.task'
import {map} from '../util'

const delayedTask = t => val => new Task((reject, resolve) => setTimeout(() => resolve(val), t))

test('startApp should call view with initial state', t => {
  t.plan(3)
  const model  = {title: 'hello world'}
  const update = sinon.spy(x => x)
  const view = sinon.spy()
  startApp({model, view, update})
  t.equals(update.calledOnce, true, 'should call update once')
  t.equals(view.calledOnce, true, 'should call view once')
  t.deepEqual(view.args[0][1], {title: 'hello world'}, 'should call view once')

})

test('startApp should update when an action is dispatched', t => {
  t.plan(3)
  const model  = {title: 'hello world'}
  const update = sinon.spy((state, action) => {
    switch (action.type) {
      case 'SET_TITLE':
        return {...state, title: action.payload}
        default:
          return state
    }
  })
  const view = sinon.spy()
  const store = startApp({model, view, update})
  store.dispatch({type: 'SET_TITLE', payload: 'new title'})
  t.equals(update.callCount, 2, 'should call update twice')
  t.equals(view.callCount, 2, 'should call view twice')
  t.deepEqual(view.args[1][1], {title: 'new title'}, 'should have new title')
})
