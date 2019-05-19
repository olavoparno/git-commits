import { ICommits, IBranches } from "services/interface"

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

export default { shapeCommits, shapeBranches }