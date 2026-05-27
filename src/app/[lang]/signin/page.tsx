import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SignInForm } from "@/components/auth/signin"
import { getDictionary } from "@/lib/dictionary"

interface IProps {
  params: Promise<{ lang: string }>
}

export default async function SigninPage(props: IProps) {
  const { lang } = await props.params
  const dict = await getDictionary(lang)

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">{dict.auth.signIn}</CardTitle>
        </CardHeader>
        <CardContent>
          <SignInForm lang={lang} dict={dict} />
        </CardContent>
      </Card>
    </div>
  )
}