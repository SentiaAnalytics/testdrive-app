//@flow
import React from 'react'
import test from 'tape'
import sinon from 'sinon'
import TextInput from './text-input.js'

test.only('TextInput should show the bound value', t => {
  t.plan(1)
  const elem = <TextInput value="inputvalue"/>
  console.log(JSON.stringify(elem, null, 2))
})
