//@flow
import type {Msg, Model, DriverForm, CprDetails} from '../model'
import {assocPath, evolve} from '../util'
import * as task from '../tasks'
import {assoc} from '../util'

const fillDriverForm = (cpr:CprDetails) => ( driverForm:DriverForm) => {
  console.log(cpr, driverForm)
  return ({
    ...driverForm,
    forenames: cpr.forenames,
    lastname: cpr.lastname,
    dob: cpr.dob,
    street: cpr.street,
    houseNumber: cpr.houseNumber,
    floor: cpr.floor,
    apartment: cpr.apartment,
    postcode: cpr.postcode,
    city: cpr.city || cpr.postDistrict,
    country: 'DK',
  })
}

export default {
  submitCprForm: (state:Model, cpr:number, msg:Msg) =>
    [
        assocPath(['testdriveForm', 'value', 'driver', 'status'])('PENDING')(state),
        task.all([
          task.historyPush('/new/2'),
          task.cprLookUp(String(cpr))
            .fold(msg.cprLookUpFail, msg.cprLookUpSuccess)
        ])
    ],
  cprLookUpSuccess: (state:Model, cprDetails: any, msg:Msg) =>
    [evolve({
      testdriveForm: {
        value: {
          driver: {
            status: 'SUCCESS',
            value: fillDriverForm(cprDetails)
          }
        }
      },
    })(state)],
  cprLookUpFail: (state:Model, err:string, msg:Msg) =>
    [
      assocPath(['testdriveForm', 'value', 'driver', 'status'])('FAIL')(state),
      task.all([
        task.call(msg.toastDanger, err),
        task.historyPush('/new/2')
      ])
    ]
}
