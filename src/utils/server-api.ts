const SITE = process.env.NEXT_PUBLIC_APP_URL

export const getApi = async <T>(url: string, options: RequestInit = {}): Promise<T | undefined> => {
  const response = await fetch(`${SITE}${url}`, options)
  try {
    return await response.json() as T
  } catch {
    return undefined
  }
}

export const postApi = async (url: string, body: object, method = "POST") => {
  const response = await fetch(`${SITE}${url}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  return await response.json()
}

export const putApi = async (url: string, body: object) => {
  return await postApi(url, body, "PUT")
}

export const deleteApi = async (url: string, id: string) => {
  const response = await fetch(`${SITE}${url}/${id}`, { method: "DELETE" })
  return await response.json()
}
