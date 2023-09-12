import { Button } from "@/registry/default/ui/button";
import styles from "./styles.module.css"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/registry/default/ui/form";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/registry/default/ui/select";
import { Textarea } from "@/registry/default/ui/textarea";
import { Separator } from "@/registry/default/ui/separator";
import { useForm } from "react-hook-form";
import { Input } from "@/registry/default/ui/input";
import { FormMessage } from "@/registry/new-york/ui/form";
import { useRouter } from "next/router";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { FormEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { supabase } from "@/apis";

const Register = ()=>{
    const user = useUser()
    const form = useForm();
    const router = useRouter();
    const isLoading = form.formState.isSubmitting;
    const supabaseClient = useSupabaseClient()

    useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {

        console.log(event, session)
        if(!session){
            router.push('/login')
        }
      })}, [])


    const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const chatbotObject = form.getValues();
        console.log(chatbotObject);
        if (
          !chatbotObject.password ||
          !chatbotObject.passwordConfirm  
        ) {
          Swal.fire("Warning", "Please complete all the required fields", "warning");
          return;
        }

        if (chatbotObject.password !== chatbotObject.passwordConfirm) {
          Swal.fire("Warning", "Passwords do not match", "warning");
          return;
        }
    
          const x  = await supabase.auth.updateUser({ password: chatbotObject.password }) 

            if(x.data){
                const { error } = await supabase.auth.signOut()
                Swal.fire("Change ok", "New password successfully created", "success");
                router.push("/login");
                return;
            } 
          
          
          Swal.fire("Error ", "User not created", "error");
          router.push("/login");
          return;
        
      };
    

    return (
        <div>
        <div className="flex justify-center space-y-4 p-8 pt-6">
        <h2 className="text-3xl font-bold tracking-tight">Create a new password</h2>
      </div>

      <div className="h-full p-4 space-y-2 max-w-5xl mx-auto">

        <div className="space-y-2 w-full col-span-2 pb-10">
          <div>
            <h3 className="text-lg font-semibold">General Information</h3>
            <p className="text-sm text-muted-foreground">Create a new password</p>
          </div>
          <Separator className="bg-primary/10" />
        </div>

  

        <Form {...form}>
          <form onSubmit={handleSubmitForm} className="space-y-5 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  <FormField
    control={form.control}
    name="password" // Nombre único para el primer campo
    render={({ field }) => (
      <FormItem>
        <FormLabel>Password</FormLabel>
        <FormControl>
          <Input
          type="password"
            disabled={isLoading}
            pattern=".{6,}"
            title="Password must be at least 6 characters long"
            placeholder="Enter your password"
            {...field}
          />
        </FormControl>
      </FormItem>
    )}
  />
  <FormField
    control={form.control}
    name="passwordConfirm" // Nombre único para el segundo campo
    render={({ field }) => (
      <FormItem>
        <FormLabel>Confirm your password</FormLabel>
        <FormControl>
          <Input
            type="password"
            pattern=".{6,}"
            title="Password must be at least 6 characters long"
            disabled={isLoading}
            placeholder="Confirm your password"
            {...field}
          />
        </FormControl>
      </FormItem>
    )}
  />
</div>

            <div className="flex justify-center">
              <Button
                disabled={ isLoading }
                size='lg'
                type="submit"
              >
                CHANGE PASSWORD
              </Button>
            </div>
          </form>
        </Form>
      </div>
      </div>
    )
}

export default Register;