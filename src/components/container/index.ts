import { Container } from 'unstated'

import GithubService from '../../services/GithubService'
import { IAllCommits } from '../../services/interface'
import Model from '../../model';

class AppContainer extends Container<IAllCommits> {
  constructor() {
    super()

    this.state = {
      branches: [],
      commits: [],
      currentRepo: {
        label: '',
        value: '',
      },
      lastCommits: [],
      isLoading: false,
      selectedBranch: {
        label: 'All Commits',
        value: '',
      },
      userName: 'reactjs',
      userRepos: [],
      validRepo: false,
    }

    this.fetchRepos()
  }

  service: GithubService = new GithubService()

  public fetchBranches(repoName: string): any {
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
            currentRepo: { label: repoName, value: ''},
            selectedBranch: firstBranch,
            validRepo: true,
          })
        }
        this.fetchCommits(repoName)
      })
      .catch(() => {
        this.setState({
          branches: [],
          commits: [],
          lastCommits: [],
          currentRepo: { label: repoName, value: ''},
          validRepo: false,
        })
      })
      .finally(() => {
        this.tiltLoading(false)
      })
  }

  public fetchCommits(repoName: string): any {
    this.tiltLoading(true)
    this.service
      .getCommits(repoName)
      .then((commits: any) => {
        const modeledCommits = Object.values(commits).map((commit: any) => {
          return Model.shapeCommits(commit)
        })

        this.setState({
          commits: modeledCommits,
          currentRepo: { label: repoName, value: ''},
          lastCommits: modeledCommits,
          validRepo: true,
        })
      })
      .catch(() => {
        this.setState({
          commits: [],
          lastCommits: [],
          currentRepo: { label: repoName, value: ''},
          validRepo: false,
        })
      })
      .finally(() => {
        this.tiltLoading(false)
      })
  }

  public fetchRepos = (userName: string = this.state.userName): any => {
    this.tiltLoading(true)
    this.service
      .getRepos(userName)
      .then((repos: any) => {
        const modeledRepos = Object.values(repos).map((repo: any) => {
          return Model.shapeRepos(repo)
        })
        if (modeledRepos && modeledRepos.length > 0) {
          const [firstRepo] = modeledRepos
          this.setState({
            currentRepo: firstRepo,
            userName: userName,
            userRepos: modeledRepos,
          })
          this.fetchCommits(firstRepo.label)
        }
      })
      .finally(() => {
        this.tiltLoading(false)
      })
  } 

  private tiltLoading = (value: boolean) => {
    this.setState({
      isLoading: value,
    })
  }
}

export default AppContainer