//@flow
import type {Msg, Model, DriverForm, CprDetails} from '../model'
import * as task from '../tasks'
import {assoc} from '../util'

const fillDriverForm = (driverForm:DriverForm) => (cpr:CprDetails) =>
  ({
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

export default {
  cprLookUpSuccess: (state:Model, cprDetails: any, msg:Msg) =>
    [
      {
        ...state,
        driverForm: fillDriverForm(state.driverForm)(cprDetails)
      },
      task.historyPush('/new/2')
    ],
  cprLookUpFail: (state:Model, err:string, msg:Msg) =>
    [
      state,
      task.call(msg.toastDanger, err)
    ]

}
