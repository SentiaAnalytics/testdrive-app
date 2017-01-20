//@flow
import test from 'tape'
import {apply, assocPath, compose} from './util'

test('compose should call function i right order', t => {
  t.plan(1)
  const f1 = x => x + '1'
  const f2 = x => x + '2'
  const f3 = x => x + '3'

  const fn = compose(f3, f2, f1)

  t.equals(fn('0'), '0123')
})

test('assocPath should update a deep property', t => {
  t.plan(1)
  const init = {
    a : {
      b: {
        c: 'hello'
      },
      inv: 'invariant'
    }
  }
  const actual = assocPath(['a', 'b', 'c'])('sup')(init)
  t.deepEquals(actual, {a: { b: { c: 'sup'}, inv: 'invariant'}})
})

test('apply should apply all arguments', t => {
  t.plan(1)
  const f = a => b => c => a + b + c
  const actual = apply(f, 'a', 'b', 'c')
  t.equal(actual, 'abc')
})
