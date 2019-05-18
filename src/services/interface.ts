/**
 * Typings for Commit object
 * @interface ICommit
 */
export interface ICommits {
  author?: IAuthor;
  commit: ICommit
  friendlyUrl: string
}

export interface ICommit {
  author: ISimpleAuthor;
  message: string;
  commitUrl: string;
  commentsCount: number;
}

export interface ISimpleAuthor {
  name: string;
  email: string;
  date: string;
}

export interface IAuthor {
  id: number;
  login: string;
  avatarUrl: string;
  gravatarId: string;
  htmlUrl: string;
  reposUrl: string;
  starredUrl: string;
}

export interface IAllCommits {
  commits: ICommits[];
  isLoading: boolean;
}

export interface IGithubService {

}