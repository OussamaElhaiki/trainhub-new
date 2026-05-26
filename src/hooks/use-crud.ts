import { postApi } from "@/utils/server-api"

interface IOptions<T> {
  endpoint: string
  id?: string
  errorCodes: Record<string, string>
  onSuccess: (json: T) => void
  setServerError: (msg: string | null) => void
}

export function useCrud<T>(options: IOptions<T>) {
  const { endpoint, id, errorCodes, onSuccess, setServerError } = options
  const isEdit = !!id

  async function submit(data: object) {
    setServerError(null)
    const json = await postApi(
      isEdit ? `${endpoint}/${id}` : endpoint,
      data,
      isEdit ? "PUT" : "POST"
    )

    if (json?.error) {
      setServerError(errorCodes[json.error] ?? "Something went wrong")
      return
    }

    onSuccess(json as T)
  }

  return { submit, isEdit }
}
