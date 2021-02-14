import Status from './status'
import { raiseNativeNotification } from '../lib/notifications'
import { SettingsState } from '../lib/types'

class Service {
  name: string
  domain: string
  status: Status
  prevStatus: Status

  updateStatus(settings: SettingsState) {
    console.log('base update status')
  }

  triggerNotification(settings: SettingsState) {
    if (this.status !== this.prevStatus) {
      raiseNativeNotification(this.name, this.status, this.domain, settings)
    }
  }

  constructor(name: string, domain: string) {
    this.name = name
    this.domain = domain
    this.status = Status.OPERATIONAL
    this.prevStatus = Status.OPERATIONAL
  }
}

export default Service
