"use client";

import { NavigationMenuLink } from "@/registry/default/ui/navigation-menu"
import { Button } from "@/registry/new-york/ui/button"
import { useUser } from "@supabase/auth-helpers-react"
import Link from "next/link"
import styles from "./styles.module.css"
import { FormEvent, useState } from "react";
import { supabase } from "@/apis";
import Swal from "sweetalert2";
import { useRouter } from 'next/router'

const RecoverPassword = () => {
    const user = useUser()
    const router = useRouter();
    const [value, setValue] = useState('')

    const handleSumbit = async (e: React.FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        let { data, error } = await supabase.auth.resetPasswordForEmail(value, {
          redirectTo: 'https://daiana.vercel.app/update-password',
        })
        return Swal.fire(
            "¡Hello user!",
            "Please go check your message box",
            "success"
          ).then((result) => {
            
              router.push('/login');
            
          });
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
    return(
 <div className={styles.background}>
<form className={styles.form} onSubmit={(e) => { handleSumbit(e) }}>
  <span className={styles.title}>Recovery Password</span>
  <p className={styles.description}>
    Please enter email to recover password. If your email is valid, you will receive a message to recover your password.
  </p>
  <div>
    <input type="email" onChange={(event) => {
      setValue(event.target.value)
    }} />
    <button type="submit">Send</button>
  </div>
</form>

      </div>
      )
}

export default RecoverPassword