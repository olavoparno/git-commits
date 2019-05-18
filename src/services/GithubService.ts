import { IGithubService } from './interface'

/**
 * This class fetchs travelling information
 * @example
 * const service = new GithubService()
 * const commits = service.getCommits()
 *
 * @exports GithubService
 * @implements {GithubService}
 */
class GithubService implements IGithubService {
  repoPath: string = ""

  constructor(repoPath = "olavoparno/git-commits") {
    this.repoPath = repoPath;
  }

  /**
   * Public getCommits method
   *
   * @param {string} path - Endpoint URL used by the fetch method
   * @returns Promise<any>
   * @memberof GithubService
   */
  public getCommits = (): Promise<any> => {
    const path = `https://api.github.com/repos/${this.repoPath}/commits`
    return this.fetchData(path)
  }

  /**
   * Private fetch method
   *
   * @param {string} path - Endpoint complete URL used by the fetch method
   * @returns Promise<any>
   * @memberof GithubService
   */
  private fetchData = (path: string): Promise<any> => {
    return fetch(path)
      .then(response => {
        return response.json()
      })
      .then(data => {
        return data
      })
      .catch(() => `Error on fetching data for ${path}.`)
  }
}

export default GithubService