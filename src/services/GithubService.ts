import { IGithubService } from './interface'

/**
 * This class fetchs commits information
 * @example
 * const service = new GithubService()
 * const commits = service.getCommits()
 *
 * @exports GithubService
 * @implements {GithubService}
 */
class GithubService implements IGithubService {
  /**
   * Public getBranches method
   *
   * @param {string} repoName - Repository name
   * @returns Promise<any> of repository branches
   * @memberof GithubService
   */
  public getBranches = (repoName: string): Promise<any> => {
    const path = `https://api.github.com/repos/${repoName}/branches`
    return this.fetchData(path)
  }

  /**
   * Public getCommits method
   *
   * @param {string} repoName - Repository name
   * @returns Promise<any> of repository commits
   * @memberof GithubService
   */
  public getCommits = (repoName: string): Promise<any> => {
    const path = `https://api.github.com/repos/${repoName}/commits`
    return this.fetchData(path)
  }

   /**
   * Public getRepos method
   *
   * @param {string} userName - Username
   * @returns Promise<any> of user repositories
   * @memberof GithubService
   */
  public getRepos = (userName: string): Promise<any> => {
    const path = `https://api.github.com/users/${userName}/repos`
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
        if (response.ok) {
          return response.json()
        } else {
          throw Error(`Cannot fetch data for ${path}.`);
        }
      })
      .then(data => {
        return data
      })
      .catch(() => `Cannot fetch data for ${path}.`)
  }
}

export default GithubService