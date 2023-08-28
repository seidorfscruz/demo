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
  const [teams, setTeams] = useState<any[]>([])

  // useEffect(()=>{
  //   if(!authBasic()) router.push('/login')
  // },[])


  const handleSubmitForm = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const chatbotObject = form.getValues()
    
   
      const newChatbotObject = {
        idTenant: 1,
        name: chatbotObject.name,
        description: chatbotObject.description,
        createdUser: "FSantacruz",
        updatedUser: "UserUpdate",
        imageUrl,
        team: teamSelected 
      }
      const x = await supabase.from("aibot").insert([ newChatbotObject ]).select();
if(x.error){
  Swal.fire( "Hello, User", "Chatbot can't be created", "success" )
}else{ 
  Swal.fire( "Hello, User", "Chatbot successfully createde", "success" )
   router.push('/chatbots')
}

}

  const handleChangeFormValues = (event: ChangeEvent<HTMLFormElement>) => {
    const formValues = form.getValues();
  }

  async function fetchData() {
    const x = await supabase.from("teams").select();
    if (x.error) {
      console.log(x.error);
    } else {
      setTeams(x.data);
    }
    console.log(teams)
  }
  

  useEffect(() => {
    fetchData()
  }, []);

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
                        {teams?.map((team) => {
                          return (
                            <SelectItem key={team.id} value={team.id}>
                              {team.name}
                            </SelectItem>
                          );
                        })}
                        
                      
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
