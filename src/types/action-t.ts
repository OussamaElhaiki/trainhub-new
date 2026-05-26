export type IError = Record<string, string[]>

export type IState = {
  isSaved: boolean
  message?: string
  errors?: IError
  fields?: Record<string, string>
}