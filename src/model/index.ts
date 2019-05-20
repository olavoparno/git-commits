import { ICommits, IBranches, IRepos } from 'services/interface'

const shapeCommits = (props: any): ICommits => {
  const { author, commit } = props
  const formattedDate = new Date(commit.author.date).toDateString()

  const returnCommit = {
    author: {
      avatarUrl: author && author.avatar_url,
      gravatarId: author && author.gravatar_id,
      htmlUrl: author && author.html_url,
      id: author && author.id,
      login: author && author.login,
      reposUrl: author && author.repos_url,
      starredUrl: author && author.starred_url,
    },
    commit: {
      author: commit && {
        name: commit.author.name,
        date: formattedDate,
        email: commit.author.email,
      },
      commentsCount: commit && commit.comments_count,
      commitUrl: commit && commit.url,
      message: commit && commit.message,
    },
    friendlyUrl: props.html_url,
  }

  return returnCommit
}

const shapeBranches = (props: any): IBranches => {
  const { name, commit } = props

  const returnBranch = {
    value: commit.url,
    label: name,
  }

  return returnBranch
}

const shapeRepos = (props: any): IRepos => {
  const { full_name, commits_url } = props

  const returnRepo = {
    label: full_name,
    value: commits_url,
  }

  return returnRepo
}

export default { shapeCommits, shapeBranches, shapeRepos }