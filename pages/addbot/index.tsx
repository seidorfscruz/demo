"use client";
import styles from "./style.module.css";
import Link from "next/link";
import * as z from "zod";
import { Layout } from "@/components/layouts";
import { Button } from "@/registry/default/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/default/ui/form";
import { Input } from "@/registry/default/ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "@/registry/default/ui/textarea";
import { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
import { Label } from "@/registry/default/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";

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
  workspace: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const addBotPage = () => {
  const [info, setInfo] = useState({ 
    name: "", 
    descriptions: "", 
    img: "https://us.123rf.com/450wm/hugok1000/hugok10001905/hugok1000190500198/123291745-ilustraci%C3%B3n-de-avatar-de-perfil-predeterminado-en-azul-y-blanco-sin-persona.jpg",
    workspace:"" });

  function onSubmit(values: z.infer<typeof formSchema>) :void{
    console.log(values);
  }
  function onChange(values: z.infer<typeof formSchema>) :void{
    setInfo(values);
    console.log(info);
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
          name="workspace"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teams</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a workspace" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Not Workspace">Not Team</SelectItem>
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
