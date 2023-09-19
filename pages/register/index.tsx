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
import { FormEvent, useState } from "react";
import Swal from "sweetalert2";
import { supabase } from "@/apis";
import DaianaLogo from '@/assets/img/brand/logo-daiana.png'
import Image from "next/image";
import { SelectItem } from "@/registry/new-york/ui/select";
import { paises } from "@/constant/paises";
import { ScrollArea } from "@/registry/default/ui/scroll-area";
const Register = ()=>{
    const user = useUser()
    const form = useForm();
    const router = useRouter();
    const isLoading = form.formState.isSubmitting;
    const supabaseClient = useSupabaseClient()

  
    const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {

      event.preventDefault();
   

      const chatbotObject = form.getValues();
      console.log(chatbotObject.country)
      console.log(chatbotObject.email)
      if (
        !chatbotObject.email ||
        !chatbotObject.firstname ||
        !chatbotObject.lastname ||
        !chatbotObject.company ||
        !chatbotObject.password ||
        !chatbotObject.passwordConfirm ||
        !chatbotObject.country ||
        !chatbotObject.phone ||
        !chatbotObject.confirmemail 

        ) {
          Swal.fire("Warning", "Please complete all the required fields", "warning");
          return;
        }
        let emailExist = await supabase
        .from('users')
        .select("*").eq('email', chatbotObject.email)
        if( emailExist.data ){
         if(emailExist.data?.length>0){
          Swal.fire("Warning", "Email already exist", "warning");
          return;
         }
        }
      
        if (chatbotObject.password !== chatbotObject.passwordConfirm) {
          Swal.fire("Warning", "Passwords do not match", "warning");
          return;
        }
    
         const xTenant = await supabase.from("tenants").insert([
            { email: chatbotObject.email,
            company: chatbotObject.company},
          ]).select();

          if(xTenant.data){
      
          const x  = await supabaseClient.auth.signUp(
            {
              email: chatbotObject.email,
              password: chatbotObject.password,
              options: {
                emailRedirectTo:'https://daiana.vercel.app/',
                data: {
                  first_name: chatbotObject.firstname,
                  last_name: chatbotObject.lastname,
                  phone: chatbotObject.phone,
                  country: chatbotObject.country,
                  company: chatbotObject.company,
                  id_tenantint:xTenant.data[0].idTenant
                }
              }
            } )
            if(x.data){
                Swal.fire("Please, confirm email", "User successfully created", "success");
                router.push("/login");
                return;
            } 
            console.log(x.error)
          }
          console.log(xTenant.error)
          Swal.fire("Error ", "User not created", "error");
          router.push("/chatbots");
          return;
      
      };
    

    return (
        <div>
          <div className="flex justify-center">
        <Image style={{ height: '300px', width: '500px' }} src={ DaianaLogo } alt="not found" />
        </div>
        <div className="flex justify-center space-y-4 p-8 pt-6">
        <h2 className="text-3xl font-bold tracking-tight">User Register</h2>
      </div>

      <div className="h-full p-4 space-y-2 max-w-5xl mx-auto">

        <div className="space-y-2 w-full col-span-2 pb-10">
          <div>
            <h3 className="text-lg font-semibold">General Information</h3>
            <p className="text-sm text-muted-foreground">Create a new user</p>
          </div>
          <Separator className="bg-primary/10" />
        </div>

  

        <Form {...form}>
          <form onSubmit={handleSubmitForm} className="space-y-5 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  <FormField
    control={form.control}
    name="email" // Nombre único para el primer campo
    render={({ field }) => (
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input
          type="email"
            disabled={isLoading}
            placeholder="Enter your email"
            {...field}
          />
        </FormControl>
      </FormItem>
    )}
  />
    <FormField
    control={form.control}
    name="confirmemail" // Nombre único para el primer campo
    render={({ field }) => (
      <FormItem>
        <FormLabel>Confirm email</FormLabel>
        <FormControl>
          <Input
          type="email"
            disabled={isLoading}
            placeholder="Enter your email"
            {...field}
          />
        </FormControl>
      </FormItem>
    )}
  />

</div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
<FormField
    control={form.control}
    name="firstname" // Nombre único para el segundo campo
    render={({ field }) => (
      <FormItem>
        <FormLabel>First Name</FormLabel>
        <FormControl>
          <Input
            disabled={isLoading}
            placeholder="Enter your firstname"
            {...field}
          />
        </FormControl>
      </FormItem>
    )}
  />
  <FormField
    control={form.control}
    name="lastname" // Nombre único para el primer campo
    render={({ field }) => (
      <FormItem>
        <FormLabel>Last Name</FormLabel>
        <FormControl>
          <Input
            disabled={isLoading}
            placeholder="Enter your lastname"
            {...field}
          />
        </FormControl>
      </FormItem>
    )}
  />
  <FormField
    control={form.control}
    name="company" // Nombre único para el segundo campo
    render={({ field }) => (
      <FormItem>
        <FormLabel>Company</FormLabel>
        <FormControl>
          <Input
            disabled={isLoading}
            placeholder="Enter your company"
            {...field}
          />
        </FormControl>
      </FormItem>
    )}
  />
    <FormField
    control={form.control}
    name="phone" // Nombre único para el segundo campo
    render={({ field }) => (
      <FormItem>
        <FormLabel>Phone</FormLabel>
        <FormControl>
          <Input
           type="number"
            disabled={isLoading}
            placeholder="Enter your phone"
            {...field}
          />
        </FormControl>
      </FormItem>
    )}
  />
    <FormField
    control={form.control}
    name="country" // Nombre único para el segundo campo
    render={({ field }) => (
      <FormItem>
        <FormLabel>Country</FormLabel>
        <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
  <SelectTrigger name="country">
    <SelectValue placeholder="Select country"  />
  </SelectTrigger>
  <SelectContent  {...field}>
  <ScrollArea className="h-72 w-100 rounded-md border">
    {paises?.map((item, index) => (
      <SelectItem key={index} value={item} >
        {item}
      </SelectItem>
    ))}
    
  </ScrollArea>
  </SelectContent>
</Select>
        </FormControl>
      </FormItem>
    )}
  />
</div>
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
                Register
              </Button>
            </div>
          </form>
        </Form>
      </div>
      </div>
    )
}

export default Register;
