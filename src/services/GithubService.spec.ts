import {GlobalWithFetchMock} from "jest-fetch-mock"

import TravelService from './index'
import { ICity, IWeather, ICondition } from './interface'
import Config from '@Config/index'
import Mock from '@Mock/index'

let service: TravelService
let customGlobal: GlobalWithFetchMock
let serviceFail: TravelService

describe('Test for TravelService class failures', () => {
  beforeAll(() => {
    serviceFail = new TravelService()
  })
  it('should throw an error', done => {
    const wrongConfig = {
      id: '123456',
      year: '2018'
    }
    serviceFail
      .getConditions(wrongConfig.id, wrongConfig.year)
      .then((response: any) => {
        expect(response).toEqual(
          `Error on fetching data for ${Config.api.baseUrl}/cities/${wrongConfig.id}/year/${wrongConfig.year}/.`
        )
        done()
      })
    })
})
