// import {GlobalWithFetchMock} from "jest-fetch-mock"

import GithubService from 'services/GithubService'

let service: GithubService
// let customGlobal: GlobalWithFetchMock
let serviceFail: GithubService

describe('Test for GithubService class failures', () => {
  beforeAll(() => {
    serviceFail = new GithubService()
  })
  // it('should throw an error', done => {
  //   const wrongConfig = {
  //     id: '123456',
  //     year: '2018'
  //   }
  //   serviceFail
  //     .getBranches(wrongConfig.id, wrongConfig.year)
  //     .then((response: any) => {
  //       expect(response).toEqual(
  //         `Error on fetching data for ${Config.api.baseUrl}/cities/${wrongConfig.id}/year/${wrongConfig.year}/.`
  //       )
  //       done()
  //     })
  //   })
})
