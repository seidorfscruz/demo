"use client";
import styles from "./style.module.css";
import supabase from "../../apis/supabase";
import Link from "next/link";
import * as z from "zod";
import { Layout } from "@/components/layouts";
import { Button } from "@/registry/default/ui/button";
import {Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage} from "@/registry/default/ui/form";
import { Input } from "@/registry/default/ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "@/registry/default/ui/textarea";
import { useState } from "react";
import {Avatar,AvatarFallback,AvatarImage,} from "@/registry/default/ui/avatar";
import { Label } from "@/registry/default/ui/label";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/registry/default/ui/select";
import Swal, { SweetAlertResult } from "sweetalert2";
import { Router } from "next/router";
import { useRouter } from "next/router";
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  descriptions: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  img: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  team: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const addBotPage = () => {


const router = useRouter();
const [info,setInfo]=useState({
  name: 'string',
  descriptions: 'string',
  img: '',
  team: '',
})
  function onSubmit (values: z.infer<typeof formSchema>) :void | Promise<SweetAlertResult<any>>{
    const post = async () => {
     
      try {
        const x1 = await supabase
        .from("aibot")
        .insert([
          {
            idTenant: 1,
            name: values.name,
            description: values.descriptions,
            createdUser: "User1",
            updatedUser: "UserUpdate",
            imageUrl:values.img,
            team: values.team      
                },
              ])
              .select();
              Swal.fire(
                "¡Hola, usuario!",
                "Bot creado ",
                "success"
              )
              router.push('/chatbots')
            
            } catch (err) {
              
            }
          };
          post()
  }


  function onChange(values: z.infer<typeof formSchema>) :void{
    setInfo(values);
   
  }

  const form = useForm();

  return (
    <Layout title="Documents page">
      <div className={styles.title}>
        <h1>ADD NEW BOT</h1>
      </div>
      <div className={styles.main}>
       
        <Avatar className="w-40 h-40">
              <AvatarImage src={info.img} />
              <AvatarFallback>NT</AvatarFallback>
            </Avatar>
        <div className={styles.form}>

          <Form  {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              onChange={form.handleSubmit(onChange)}
              className={styles.form1}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name bot</FormLabel>
                    <FormControl>
                      <Input placeholder="Name bot" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="img"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avatar image</FormLabel>
                    <FormControl>
                      <Input placeholder="Url image" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="descriptions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Description" {...field} />
                    </FormControl>
                    <FormDescription>
                      This will be your bot description.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
      <FormField
          control={form.control}
          name="team"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a team" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Not team">Not Team</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="legales">Legales</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
              You can select a team for your bot
           
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <br />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default addBotPage;
