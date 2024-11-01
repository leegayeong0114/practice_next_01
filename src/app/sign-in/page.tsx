'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { SignInSchema } from '@/utils/schemas/SignInSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { requestToken } from '@/api/TokenApi'
import { TokenResponse } from '@/types/Token'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

type SignInFormType = z.infer<typeof SignInSchema>

export default function SignIn() {

    const { toast } = useToast()
    const router = useRouter()

    const form = useForm<SignInFormType>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    })

    async function onSubmit(data: SignInFormType) {

        let formData = new FormData()

        formData.append('username', data.username)
        formData.append('password', data.password)

        const result: any = await requestToken(formData)

        if (result.status === 200) {
            const data = result.data as TokenResponse
            await fetch('/api/auth', {
                method: 'POST',
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(res => {
                    router.push('/')
                })
                .catch(err => {
                    toast({
                        title: `⚠️ 로그인 실패 (토큰 저장 실패) ⚠️`,
                        variant: 'destructive',
                        duration: 2000,
                    })
                })
        } else {
            toast({
                title: `⚠️ ${result.data.detail} ⚠️`,
                variant: 'destructive',
                duration: 2000,
            })
        }
    }

    return (
        <div className="py-10 sm:py-20 items-center justify-items-center grid">
            <Card className={cn("w-[430px] mt-auto")}>
                <CardHeader>
                    <CardTitle>SignIn</CardTitle>
                    <CardDescription>아이디, 비번 찾기</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="relative space-y-3 overflow-x-hidden"
                        >
                            <FormField
                                control={form.control}
                                name="username"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>password</FormLabel>
                                        <FormControl>
                                            <Input type="text" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <div className={"flex gap-4 a"}>
                                <Button type="submit">
                                    Sign In
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}