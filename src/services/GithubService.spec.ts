import GithubService from 'services/GithubService'

let service: GithubService
let serviceFail: GithubService

describe('Test for GithubService class failures', () => {
  beforeAll(() => {
    serviceFail = new GithubService()
  })
  it('should throw an error', async () => {
    const wrongRepoName = 'SalamanderXabuDeilson'
    const response = await serviceFail.getBranches(wrongRepoName)
    
    expect(response).toEqual('Cannot fetch data for https://api.github.com/repos/SalamanderXabuDeilson/branches.')
    })
})

describe('Test for GithubService class resolution', () => {
  beforeAll(() => {
    service = new GithubService()
  })

  it('should return repo branches', done => {
    const fakeRepoName = 'olavoparno/git-commits'

    service
      .getBranches(fakeRepoName)
      .then((response: any) => {
        expect(response.length).toBeGreaterThanOrEqual(1)
        done()
      })
  })
})
