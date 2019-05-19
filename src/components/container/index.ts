import { Container } from "unstated"

import { IAllCommits } from '../../services/interface'
import GithubService from '../../services/GithubService'
import Model from "../../model";

class AppContainer extends Container<IAllCommits> {
  constructor() {
    super()

    this.state = {
      branches: [],
      commits: [],
      isLoading: true,
      validRepo: false,
      currentRepo: 'Repository name',
      selectedBranch: {
        value: '',
        label: 'All Commits',
      }
    }

    this.fetchBranches()
  }

  defaultRepo: string = 'olavoparno/git-commits'
  service: GithubService = new GithubService()

  public fetchBranches(repoName: string = this.defaultRepo): any {
    this.tiltLoading(true)
    this.service
      .getBranches(repoName)
      .then((branches: any) => {
        const modeledBranches = Object.values(branches).map((branch: any) => {
          return Model.shapeBranches(branch)
        })

        if (modeledBranches && modeledBranches.length > 0) {
          const [firstBranch] = modeledBranches
          this.setState({
            branches: modeledBranches,
            validRepo: true,
            currentRepo: repoName,
            selectedBranch: firstBranch,
          })
        }
        this.fetchCommits(repoName)
      })
      .catch(() => {
        this.setState({
          branches: [],
          commits: [],
          validRepo: false,
          currentRepo: repoName,
        })
      })
    this.tiltLoading(false)
  }

  public fetchCommits(repoName: string = this.defaultRepo): any {
    this.tiltLoading(true)
    this.service
      .getCommits(repoName)
      .then((commits: any) => {
        const modeledCommits = Object.values(commits).map((commit: any) => {
          return Model.shapeCommits(commit)
        })

        const shortenedCommits = modeledCommits.slice(0, 20)

        this.setState({
          commits: shortenedCommits,
          validRepo: true,
          currentRepo: repoName,
        })
      })
      .catch(() => {
        this.setState({
          commits: [],
          validRepo: false,
          currentRepo: repoName,
        })
      })
    this.tiltLoading(false)
  }

  private tiltLoading = (value: boolean) => {
    this.setState({
      isLoading: value,
    })
  }
}

export default AppContainer