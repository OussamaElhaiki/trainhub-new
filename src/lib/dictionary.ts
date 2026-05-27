export type IDictionary = typeof import("@/dictionaries/en.json")

export const locales = ["en", "fr"] as const
export type ILocale = (typeof locales)[number]

const dictionaries: Record<ILocale, () => Promise<IDictionary>> = {
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
  fr: () => import("@/dictionaries/fr.json").then((m) => m.default),
}

export async function getDictionary(locale: string): Promise<IDictionary> {
  const key = locales.includes(locale as ILocale) ? (locale as ILocale) : "en"
  return dictionaries[key]()
}
