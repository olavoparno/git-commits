import { Container } from "unstated"

import { IAllCommits } from '../../services/interface'
import GithubService from '../../services/GithubService'
import shapeCommits from "../../model";

class AppContainer extends Container<IAllCommits> {
  constructor() {
    super()

    this.state = {
      commits: this.fetchCommits(),
      isLoading: true,
      validRepo: false,
      currentRepo: 'Repository name',
    }
  }

  service: GithubService = new GithubService()

  fetchCommits(repoName: string = 'olavoparno/git-commits'): any {
    this.setState({
      isLoading: true,
    })
    this.service
      .getCommits(repoName)
      .then((commits: any) => {
        const modeledCommits = Object.values(commits).map((commit: any) => {
          return shapeCommits(commit)
        })
        this.setState({
          commits: modeledCommits,
          isLoading: false,
          validRepo: true,
          currentRepo: repoName,
        })
      })
      .catch(() => {
        this.setState({
          commits: [],
          isLoading: false,
          validRepo: false,
          currentRepo: repoName,
        })
      })
  }
}

export default AppContainer