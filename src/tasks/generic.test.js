import test from 'tape'
import Task from 'data.task'
import * as task from './generic'


test('task.all should return a task of the list of results', t => {
  t.plan(1)
  task.all([Task.of(1), Task.of(2), Task.of(3)])
    .fork(x => t.fail('task error'), res => t.deepEquals(res, [1, 2, 3]))

})
