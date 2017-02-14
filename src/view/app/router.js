//@flow
import React from 'react'
import history from '../../history'
import type {Msg, Model} from '../../model'
import {compose} from '../../util'
import Home from '../home'
import Testdrive from '../testdrive'
import Login from '../login'
import Toast from '../toast'
import {Layout} from '../layout'
import './app.scss'
import Test from '../test'
import Tesseract from '../tesseract'
import ImageFilter from '../image-filter'

import Route from '../route'
import NewTestdrive from '../new-testdrive'

export default (msg:Msg, state:Model) => {
  const {
    user,
    loginForm,
    toast,
    testdriveList,
    location,
  } = state
  return (
    <div className="app">
      <Toast {...{msg, toast}} />

      <Route pattern="/" location={location} render={() =>
        <Home {...{msg, testdriveList} } />
      }/>

      <Route pattern="/login" location={location} render={() =>
        <Login {...{msg, loginForm, user} } />
      }/>

      <Route pattern="/test" location={location} render={() =>
        <Test />
      }/>
      <Route pattern="/tesseract" location={location} render={() =>
        <Tesseract />
      }/>
      <Route pattern="/filter" location={location} render={() =>
        <ImageFilter />
      }/>

      <Route pattern="/testdrives/:testdriveId" location={location} render={() =>
        <Testdrive {...{testdriveList, location}} />
      }/>

      <Route pattern="/new/:page" location={location} render={() =>
        <NewTestdrive {...{msg, ...state} } />
      }/>

    </div>

  )
}
