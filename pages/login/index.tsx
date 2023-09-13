import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/registry/new-york/ui/button"
import { UserAuthForm } from "@/components/ui/UserAuthForm"
import * as React from "react"
import { Icons } from "@/components/ui/icons"
import { Button } from "@/registry/new-york/ui/button"
import { Input } from "@/registry/new-york/ui/input"
import { Label } from "@/registry/new-york/ui/label"
import { useRouter } from 'next/router';
import Swal, { SweetAlertResult } from "sweetalert2";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/types/supabase"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}
import Index from '../index'

export default function AuthenticationPage() {
  const supabase = createClientComponentClient<Database>()
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [infoLogin, setInfoLogin] = React.useState({
    username: '',
    password: '',
  })
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const [data, setData] = React.useState<undefined | any[]|null>()






  const handleSumbit = async(e: React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault()
    const x = await supabase.auth.signInWithPassword({
      email: infoLogin.username,
      password: infoLogin.password
    })

    if(x.error){
      console.log(x)
      Swal.fire(
        "¡ERROR!",
        "Usuario o Clave incorrecta",
        "error"
      )
    }else{
      const user = {
        id: x.data.user.id,
        token: x.data.session.access_token 
      };
      localStorage.setItem('user', JSON.stringify(user))
    
      Swal.fire(
        "Bienvenido",
        "Usuario Logueado correctamente",
        "success"
      )
      router.push('/');
      console.log(x)
      
    }
  }

  const handleChange =(e: React.ChangeEvent<HTMLInputElement>)=>{
    const { name, value } = e.target;
    setInfoLogin((prevInfoLogin) => ({
      ...prevInfoLogin,
      [name]: value,
    }));
  }

  if (user)
  return (
<div>
<h1>
  Usuario ya logueado
</h1>
<Link href="/">
<Button>GO TO HOME</Button>
</Link>
</div>
)

  return (
    <>
      <div className="container relative  h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Daiana
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                  User Login
              </h1>
              <p className="text-sm text-muted-foreground">
              Welcome back! Log in to your account to access a personalized experience. Enter your credentials below to continue
              </p>
            </div>
            
            <div >
      <form >
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Username"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={handleChange}
              name="username"
            />
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              onChange={handleChange}
              name="password"
            />
          </div>
          <Button type="submit" onClick={(e)=>{
            e.preventDefault()
            handleSumbit(e)
          }} 
          >
        
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button>
      
    </div>


            <p className="px-8 text-center text-sm text-muted-foreground">
              Recover Password {" "}
              <Link
                href="/recover-password"
                className="underline underline-offset-4 hover:text-primary"
              >
                Click Here
              </Link>{" "}
              <br />
              
If you continue on the site you accept{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}