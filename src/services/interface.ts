/**
 * Typings for Commit State object
 * @interface ICommit
 */
export interface ICommits {
  author?: IAuthor;
  commit: ICommit
  friendlyUrl: string
}

/**
 * Typings for Branch object
 * @interface IBranches
 */
export interface IBranches {
  value: string;
  label: string;
}

/**
 * Typings for Repository object
 * @interface IRepos
 */
export interface IRepos {
  label: string;
  value: string;
}

/**
 * Typings for Commit object
 * @interface ICommit
 */
export interface ICommit {
  author: ISimpleAuthor;
  message: string;
  commitUrl: string;
  commentsCount: number;
}

/**
 * Typings for Commit Author object
 * @interface ISimpleAuthor
 */
export interface ISimpleAuthor {
  name: string;
  email: string;
  date: string;
}

/**
 * Typings for Big Author object
 * @interface IAuthor
 */
export interface IAuthor {
  id: number;
  login: string;
  avatarUrl: string;
  gravatarId: string;
  htmlUrl: string;
  reposUrl: string;
  starredUrl: string;
}

/**
 * Typings for State object
 * @interface IAllCommits
 */
export interface IAllCommits {
  branches: IBranches[];
  commits: ICommits[];
  currentRepo: IRepos;
  lastCommits: ICommits[];
  isLoading: boolean;
  selectedBranch: IBranches;
  userName: string;
  userRepos: IRepos[];
  validRepo: boolean;
}

/**
 * Typings for Github service
 * @interface IGithubService
 */
export interface IGithubService {
  getBranches: (repoName: string) => Promise<any>
  getCommits: (repoName: string, branch?: string) => Promise<any>
}