"use client";

import { ChangeEvent, DetailedHTMLProps, FormEvent, FormHTMLAttributes, useEffect, useState } from "react";
import supabase from "../../apis/supabase";
import * as z from "zod";
import { Layout } from "@/components/layouts";
import { Button } from "@/registry/default/ui/button";
import {Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage} from "@/registry/default/ui/form";
import { Input } from "@/registry/default/ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "@/registry/default/ui/textarea";
import {Avatar,AvatarFallback,AvatarImage,} from "@/registry/default/ui/avatar";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/registry/default/ui/select";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
// import authBasic from '../../middlewares/auth'
import styles from "./style.module.css";

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

 

const AddBotPage = () => {
  
  const form = useForm();
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string>('')
  const [teamSelected, setTeamSelected] = useState<string>('')


  // useEffect(()=>{
  //   if(!authBasic()) router.push('/login')
  // },[])


  const handleSubmitForm = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const chatbotObject = form.getValues()
    
    try {
      const newChatbotObject = {
        idTenant: 1,
        name: chatbotObject.name,
        description: chatbotObject.description,
        createdUser: "FSantacruz",
        updatedUser: "UserUpdate",
        imageUrl,
        team: teamSelected 
      }
      await supabase.from("aibot").insert([ newChatbotObject ]).select();

      Swal.fire( "¡Hecho!", "Bot creado satisfactoriamente", "success" )
      router.push('/chatbots')
    } catch (err) {
      console.log(err)
    }
  }

  const handleChangeFormValues = (event: ChangeEvent<HTMLFormElement>) => {
    const formValues = form.getValues();
  }

  return (
    <Layout title="Documents page">
      <div className={styles.title}>
        <h1>ADD NEW BOT</h1>
      </div>

      <div className={ styles.main }>
        <Avatar className='w-40 h-40'>
          <AvatarImage src={ imageUrl } />
          <AvatarFallback>NT</AvatarFallback>
        </Avatar>

        <div className={styles.form}>
          <Form {...form}>
            <form onSubmit={ handleSubmitForm } onChange={ handleChangeFormValues } className={ styles.form1 }>
              <FormField
                control={ form.control }
                name='name'
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
                control={ form.control }
                name='imageUrl'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avatar image</FormLabel>
                    <FormControl>
                      <Input placeholder="Insert your URL image" {...field} onChange={ (e) => setImageUrl(e.target.value) } />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={ form.control }
                name='description'
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
                name='team'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team</FormLabel>
                    <Select onValueChange={ (value) => setTeamSelected(value) }>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a team" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="notteam">Not Team</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="legales">Legales</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      You can select a team for your bot
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )} />

              <br />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default AddBotPage;
