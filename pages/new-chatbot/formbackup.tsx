"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import supabase from "../../apis/supabase";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Layout } from "@/components/layouts";
import { Button } from "@/registry/default/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/registry/default/ui/form";
import { Input } from "@/registry/default/ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "@/registry/default/ui/textarea";
import {Avatar,AvatarFallback,AvatarImage,} from "@/registry/default/ui/avatar";
import {Select,SelectContent,SelectGroup,SelectItem,SelectTrigger,SelectValue,} from "@/registry/default/ui/select";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
// import authBasic from '../../middlewares/auth'
import styles from "./style.module.css";
import { Separator } from "@/registry/default/ui/separator";


const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description is required.",
  }),
  img: z.string().min(2, {
    message: "Please provide an image for this chatbot.",
  }),
  team: z.string().min(2, {
    message: "Please enter a team name.",
  }),
});

 

const CreateNewChatbotScreen = () => {
  
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string>('')
  // const [teamSelected, setTeamSelected] = useState<string>('')
  const [teams, setTeams] = useState<any[]>(['Innovation', 'Human Resources', 'Marketing', 'Sales', 'Customer Service'])
  const [initialData, setInitialData] = useState({name: '', description: '', img: '', team: ''})
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '', description: '', img: '', team: ''
    }
  });

  const isLoading = form.formState.isSubmitting;

  // useEffect(()=>{
  //   if(!authBasic()) router.push('/login')
  // },[])


  // const handleSubmitForm = async(event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const chatbotObject = form.getValues()
    
  //   const newChatbotObject = {
  //     idTenant: 1,
  //     name: chatbotObject.name,
  //     description: chatbotObject.description,
  //     createdUser: "FSantacruz",
  //     updatedUser: "UserUpdate",
  //     imageUrl,
  //     team: teamSelected 
  //   }
  //   const x = await supabase.from("aibot").insert([ newChatbotObject ]).select();
  //   if(x.error){
  //     Swal.fire( "Hello, User", "Chatbot can't be created", "success" )
  //   } else { 
  //     Swal.fire( "Hello, User", "Chatbot successfully createde", "success" )
  //     router.push('/chatbots')
  //   }
  // }

  const onSubmit = async(values: z.infer<typeof formSchema>) => {

  }

  const handleChangeFormValues = (event: ChangeEvent<HTMLFormElement>) => {
    const formValues = form.getValues();
  }

  // async function fetchData() {
  //   const x = await supabase.from("teams").select();
  //   if (x.error) {
  //     console.log(x.error);
  //   } else {
  //     setTeams(x.data);
  //   }
  //   console.log(teams)
  // }
  

  // useEffect(() => {
  //   fetchData()
  // }, []);

  return (
    <Layout title="Documents page">
      <div className="flex items-center space-y-2 p-8 pt-6">
        <h2 className="text-3xl font-bold tracking-tight">Create new chatbot</h2>
      </div>

      <div className='h-full p-4 space-y-2 max-w-3x1 mx-auto'>
        <Form {...form}>
          <form
            className="space-y-8 pb-10"
            onSubmit={ form.handleSubmit(onSubmit) }
          >
            <div className="space-y-2 w-full">
              <div>
                <h3 className="text-lg font-medium">General information</h3>
                <p className="text-xs text-muted-foreground">General information about your chatbot</p>
              </div>

              <Separator className="bg-primary/10" />
            </div>
            
            <div className="flex items-center justify-center space-y-2 hover:opacity-75">
              <Avatar className='w-40 h-40 p-2 border-4 border-dashed'>
                <AvatarImage src={ imageUrl } />
                <AvatarFallback>NT</AvatarFallback>
              </Avatar>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-8/12 mx-auto">
              <FormField
                name='name'
                control={ form.control }
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={ isLoading }
                        placeholder="Give your chatbot a name"
                      />
                    </FormControl>
                    <FormDescription>
                      This is how your chatbot will be named
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name='description'
                control={ form.control }
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={ isLoading }
                        placeholder="Give it a description"
                      />
                    </FormControl>
                    <FormDescription>
                      Short description for your chatbot
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                name='team'
                control={ form.control }
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team</FormLabel>
                    <Select
                      disabled={ isLoading }
                      onValueChange={ field.onChange }
                      value={ field.value }
                      defaultValue={ field.value }
                    >
                      <FormControl>
                        <SelectTrigger className="bg-background">
                          <SelectValue
                            defaultValue={ field.value }
                            placeholder="Select a team"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          teams.map((team) => (
                            <SelectItem key={ team } value={ team }>
                              { team }
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select a team for your chatbot
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>

            {/* <FormField
              control={ form.control }
              name='img'
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
            )}/> */}

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default CreateNewChatbotScreen;
