import z from 'zod'

const logInSchema = z.object({
    
    email: z
        .string({ required_error: "email is required" })
        .trim()
        .email({ message: "invalid email address" })
        .min(3, { message: "email must be atleast 3 char" })
        .max(255, { message: "email must not be more than 255" }),
    password: z
        .string({ required_error: "password is reqquired" })
        .min(3, { message: "password must be atleast 3 " })
        .max(255, { message: "password must not be more than 255" }),
});

const signUpSchema = logInSchema.extend({
    username: z
        .string({ required_error: "user name is reqquired" })
        .trim()
        .min(3, { message: "username must be atleast 3 char" })
        .max(255, { message: "username must not be more than 255" }),
    phone: z
        .string({ required_error: "phone is required" })
        .trim()
        .min(10, { message: "phone must be atleast 10 " })
        .max(20, { message: "phone must not be more than 255" }),
});

export {signUpSchema,logInSchema};