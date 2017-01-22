//@flow
import Task from 'data.task'
import type {Testdrive} from './model'

export const submitTestdrive = (testdrive:Testdrive) =>
  new Task((reject, resolve) => setTimeout(() => resolve(testdrive)))
