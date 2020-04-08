export interface IPathAware {
  path: string
}

export interface IRepositoryAware extends IPathAware {
  repository?: string
}

export interface ISourceAware {
  source: string
}

export interface ITitleAware {
  title: string
}
