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
    const fakeBranches = [{
      name: "master",
      commit: {
        sha: "76026c571f81886717503d5ab0e656b0fdbcd7cc",
        url: "https://api.github.com/repos/olavoparno/git-commits/commits/76026c571f81886717503d5ab0e656b0fdbcd7cc",
      },
      protected: false,
    }]

    service
      .getBranches(fakeRepoName)
      .then((response: any) => {
        expect(response).toEqual(fakeBranches)
        done()
      })
  })
})
