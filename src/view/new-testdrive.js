//@flow
import React from 'react'
import {Loc} from '../model'
import {Slider, Slide} from './slider'
import Brand from './brand'
import Model from './model'
import Licenseplate from './licenseplate'
import Driverslicense from './driverslicense'
import Cpr from './cpr'
import Confirm from './confirm'
import Driver from './driver'
import {pick, flip} from '../util'
import {Layout, Col, Padding} from './layout'
import Icon from './icon'
import PageIndicator from './page-indicator'
import {Button} from './button'


export default (props) => {
  const page = Number(props.location.params.page)
  const pickProps = flip(pick)(props)
  return (
    <Layout column primary>
      <Col>
        <Padding>
          <Layout space-between>
            <Button onClick={_ => props.msg.goBack()}>
              <Icon white type="chevron_left" />
            </Button>
              <PageIndicator current={page} of={7}/>
            <Icon primary type="chevron_right"/>
          </Layout>
        </Padding>
      </Col>
      <Col grow={1} shrink={1}>
        <Slider page={page}>
          <Slide><Driverslicense {...pickProps(['msg', 'testdriveRequest']) } /></Slide>
          <Slide><Cpr {...pickProps(['msg', 'cprForm'])} /></Slide>
          <Slide><Driver {...pickProps(['msg', 'driverForm'])} /></Slide>
          <Slide><Brand {...pickProps(['msg', 'brands', 'search'])} /></Slide>
          <Slide><Model {...pickProps(['msg', 'models', 'search'])} /></Slide>
          <Slide><Licenseplate {...pickProps(['msg', 'search', 'licenseplates'])} /></Slide>
          <Slide><Confirm {...pickProps(['msg', 'consentForm', 'testdriveStatus', 'modals'])} /></Slide>
        </Slider>
      </Col>
    </Layout>
  )
}
