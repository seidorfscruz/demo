"use client";

import {
  ChangeEvent,
  DetailedHTMLProps,
  FormEvent,
  FormHTMLAttributes,
  useEffect,
  useState,
} from "react";
import supabase from "../../apis/supabase";
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
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
// import authBasic from '../../middlewares/auth'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/registry/default/ui/popover";
import defaultimg from "../../constant/defaultimg";
import { Separator } from "@/registry/default/ui/separator";
import Image from "next/image";
import NoImage from '@/assets/img/no-image.jpg'
import Login from '../login/index'
import { User, useUser } from "@supabase/auth-helpers-react";


const CreateNewChatbot = () => {
  const user = useUser()
  const form = useForm();
  const router = useRouter();
  const [teamSelected, setTeamSelected] = useState<string>("");
  const [teams, setTeams] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null | string>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null); // Nuevo estado para la URL de vista previa
  const isLoading = form.formState.isSubmitting;
  const [data, setData] = useState<string | User | undefined | null>('')
  useEffect(() => {
    if (user) {
      loadData()
    }
    
  }, [user])
  
  
  async function loadData() {
    setData(user?.id)
    console.log(data)
    }
  const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const chatbotObject = form.getValues();
    if (
      !selectedFile ||
      !chatbotObject.name ||
      !chatbotObject.description ||
      !teamSelected
    ) {
      Swal.fire("Warning", "Please complete all the required fields", "warning");
      return;
    }


    const newChatbotObject = {
      idTenant: user?.user_metadata.id_tenantint,
      name: chatbotObject.name,
      description: chatbotObject.description,
      createdUser: data,
      updatedUser: "UserUpdate",
      imageUrl: selectedFile === "default" ? previewURL : 1,
      team: teamSelected,
    };

    const x = await supabase.from("aibot").insert([newChatbotObject]).select();

    if (x.error) {
      Swal.fire("Oops...", "Chatbot can't be created", "warning");
      return;
    }

    if (x.data && chatbotObject.imageUrl !== "default") {
      const x1 = await supabase.storage
        .from("Images")
        .upload(
          `imagesChatBots/${x.data[0].idTenant}/${x.data[0].idBot}/${x.data[0].imageUrl}`,
          selectedFile
        );
      if (x1.error) {
        Swal.fire("Warning", "Chatbot created with errors, could not upload image", "warning");
        return;
      }
      if (x1.data) {
        Swal.fire("Success", "Chatbot successfully created", "success");
        router.push("/chatbots");
        return;
      }
    }

    Swal.fire("Success", "Chatbot successfully created", "success");
    router.push("/chatbots");
    return;
  };

  // const handleChangeFormValues = (event: ChangeEvent<HTMLFormElement>) => {
  //   const formValues = form.getValues();
  // };

  async function fetchData() {
    const x = await supabase.from("teams").select().eq('idTenant', user?.user_metadata.id_tenantint)
    if (x.error) {
      console.log(x.error);
    } else {
      setTeams(x.data);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file)); // Crear la URL de vista previa
    } else {
      setSelectedFile(null);
      setPreviewURL(null);
    }
  };

  const handleFileChangeDefault = (url: string) => {
    setPreviewURL(url);
    const fileInput = document.querySelector<HTMLInputElement>("#docfile");
    setSelectedFile("default");

    if (fileInput) {
      const newFileName = "default.png"; // Reemplaza con el nombre deseado
      const files = fileInput.files;

      if (files && files.length > 0) {
        const file = files[0];

        // Crear un nuevo objeto File con el nuevo nombre
        const newFile = new File([file], newFileName, { type: file.type });

        // Reemplazar el archivo original en el input con el nuevo archivo
        const fileList = new DataTransfer();
        fileList.items.add(newFile);
        fileInput.files = fileList.files;
      } else {
        console.log("No se ha seleccionado ningún archivo.");
      }
    } else {
      console.log("No se encontró el input de tipo file.");
    }
  };
  if (!user)
  return (
<Login></Login>
  )

  return (
    <Layout title="Documents page">
      <div className="flex justify-center space-y-4 p-8 pt-6">
        <h2 className="text-3xl font-bold tracking-tight">Create a new chatbot</h2>
      </div>

      <div className="h-full p-4 space-y-2 max-w-5xl mx-auto">

        <div className="space-y-2 w-full col-span-2 pb-10">
          <div>
            <h3 className="text-lg font-semibold">General Information</h3>
            <p className="text-sm text-muted-foreground">General information about your Chatbot</p>
          </div>
          <Separator className="bg-primary/10" />
        </div>

        <div className="flex justify-center">
          <Avatar className="w-40 h-40 p-1 border-4 border-dashed rounded-lg border-primary/10 hover:opacity-75 transition">
            <Image src={previewURL ? previewURL : NoImage } alt='' width={200} height={200} style={{ borderRadius: '8px' }} />
          </Avatar>
        </div>

        <Form {...form}>
          <form onSubmit={handleSubmitForm} className="space-y-10 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={ isLoading }
                        placeholder="Give your chatbot a name"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is how your Chatbot will be named
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div>
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your chatbot image</FormLabel>
                      <FormControl>
                        <Input
                          id={"docfile"}
                          type="file"
                          onChange={handleFileChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <p className="text-sm text-center text-muted-foreground py-2">OR</p>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full">
                      Select an avatar
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverClose>
                      <div className="flex flex-wrap">
                        {defaultimg?.map((img) => (
                          <div key={img.value} className="w-1/4 p-2">
                            <Avatar
                              onClick={() => handleFileChangeDefault(img.value)}
                            >
                              <AvatarImage src={img.value} />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                          </div>
                        ))}
                      </div>
                    </PopoverClose>
                  </PopoverContent>
                </Popover>
                
                <FormDescription className="mt-2">
                  This will be your Chatbot image
                </FormDescription>
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem  className="col-span-2 md:col-span-1">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Give it a short description" rows={7} {...field} />
                    </FormControl>
                    <FormDescription>
                      This will be a little description about your Chatbot
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="team"
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormLabel>Team</FormLabel>
                    <Select disabled={ isLoading } onValueChange={(value) => setTeamSelected(value)}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a team" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          teams?.map((team) => {
                            return (
                              <SelectItem key={team.id} value={team.id}>
                                {team.name}
                              </SelectItem>
                            )
                          })
                        }
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      This will be the team assigned to your Chatbot
                    </FormDescription>
                    <FormMessage />
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
                Create your Chatbot
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default CreateNewChatbot;
