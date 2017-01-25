//@flow
import Task from 'data.task'
import uuid from 'uuid/v4'
import type {Testdrive} from '../model'
import {confirmTestdriveSuccess} from '../actions'

export const submitTestdrive = (testdrive:Testdrive) =>
  Task.of(confirmTestdriveSuccess({...testdrive, id: uuid()}))
