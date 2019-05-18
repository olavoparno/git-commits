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
    }
  }

  service: GithubService = new GithubService()

  fetchCommits(): any {
    this.service
      .getCommits()
      .then((commits: any) => {
        const modeledCommits = Object.values(commits).map((commit: any) => {
          return shapeCommits(commit)
        })

        this.setState({
          commits: modeledCommits,
          isLoading: !this.state.isLoading,
        })
      })
  }
}

export default AppContainer