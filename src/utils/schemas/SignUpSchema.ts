import { z } from 'zod'

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

export const SignUpSchema = z.object({
    email: z
        .string()
        .email({
            message: '올바른 이메일을 입력해주세요.'
        }),
    username: z
        .string()
        .min(1, {
            message: '이름을 입력해주세요.'
        })
        .max(100, {
            message: '이름은 100글자 이하로 입력해주세요.'
        }),
    role: z
        .string()
        .min(2, {
            message: '역할을 선택해주세요.'
        }),
    password: z
        .string()
        .min(1, {
            message: '비밀번호를 입력해주세요.'
        })
        .max(100, {
            message: '비밀번호는 100자리 이하로 입력해주세요..'
        })
        .refine(
            (value) => passwordRegex.test(value),
            {
                message: '비밀번호는 최소 6자리 이상, 영문, 숫자, 특수문자를 포함해야 합니다.'
            },
        ),
    confirmPassword: z
        .string()
        .min(1, {
            message: '비밀번호를 확인해주세요.'
        })
}).refine(
    (data) => data.password === data.confirmPassword,
    {
        message: '비밀번호와 일치 하지 않습니다.',
        path: ['confirmPassword'], // 에러가 표시될 스키마키값
    }
).superRefine((values, ctx) => {

})