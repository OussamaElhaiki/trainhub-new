import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RegisterForm } from "@/components/auth/register"
import { getDictionary } from "@/lib/dictionary"

interface IProps {
  params: Promise<{ lang: string }>
}

export default async function SignupPage(props: IProps) {
  const { lang } = await props.params
  const dict = await getDictionary(lang)

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">{dict.auth.createAccount}</CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm lang={lang} dict={dict} />
        </CardContent>
      </Card>
    </div>
  )
}