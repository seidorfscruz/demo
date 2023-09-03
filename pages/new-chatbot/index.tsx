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
import styles from "./style.module.css";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/registry/default/ui/popover";
import defaultimg from "../../constant/defaultimg";

const AddBotPage = () => {
  const form = useForm();
  const router = useRouter();
  const [teamSelected, setTeamSelected] = useState<string>("");
  const [teams, setTeams] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null | string>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null); // Nuevo estado para la URL de vista previa
  // useEffect(()=>{
  //   if(!authBasic()) router.push('/login')
  // },[])

  const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const chatbotObject = form.getValues();
    if (
      !selectedFile ||
      !chatbotObject.name ||
      !chatbotObject.description ||
      !teamSelected
    ) {
      Swal.fire("Hello, User", "please complete all fields", "warning");
      return;
    }

      const newChatbotObject = {
        idTenant: 1,
        name: chatbotObject.name,
        description: chatbotObject.description,
        createdUser: "FSantacruz",
        updatedUser: "UserUpdate",
        imageUrl:selectedFile === "default"? previewURL:1,
        team: teamSelected,
      }

    const x = await supabase
    .from("aibot")
    .insert([newChatbotObject])
    .select();

    if(x.error){
      Swal.fire("Hello, User", "Chatbot can't be created", "error");
      return;
    }

    if(x.data && chatbotObject.imageUrl !== "default"){
      const x1 = await supabase.storage
      .from("Images")
      .upload(
        `imagesChatBots/${x.data[0].idTenant}/${x.data[0].idBot}/${x.data[0].imageUrl}`,
        selectedFile
      );
      if(x1.error){
        Swal.fire("Warning", "Bot created with errors, could not upload image", "warning");
        return;

      }
      if(x1.data){
        Swal.fire("Hello, User", "Chatbot successfully createde", "success");
        router.push("/chatbots");
        return
      }
 }
    Swal.fire("Hello, User", "Chatbot successfully createde", "success");
    router.push("/chatbots");
    return


  };

  const handleChangeFormValues = (event: ChangeEvent<HTMLFormElement>) => {
    const formValues = form.getValues();
  };

  async function fetchData() {
    const x = await supabase.from("teams").select();
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

        // Comprueba el nuevo nombre del archivo en el input
        console.log(
          "Nuevo nombre del archivo en el input:",
          fileInput.files[0].name
        );
      } else {
        console.log("No se ha seleccionado ningún archivo.");
      }
    } else {
      console.log("No se encontró el input de tipo file.");
    }
  };

  return (
    <Layout title="Documents page">


      <div className={styles.main}>
        <Avatar className="w-20 h-20">
          {previewURL ? ( // Mostrar la vista previa si está disponible
            <AvatarImage src={previewURL} />
          ) : (
            <AvatarFallback>CN</AvatarFallback>
          )}
        </Avatar>

        <div className={styles.form}>
          <Form {...form}>
            <form
              onSubmit={handleSubmitForm}
              onChange={handleChangeFormValues}
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
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avatar image</FormLabel>
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
              <p>Or </p>
              <Popover>
  <PopoverTrigger asChild>
    <Button className={styles.PopoverContent} variant="outline">
      SELECTED IMAGE DEFAULT
    </Button>
  </PopoverTrigger>
  <PopoverContent className={styles.PopoverContent}>
    <PopoverClose>
      <div className="flex flex-wrap">
        {defaultimg?.map((img) => (
          <div key={img.value} className="w-1/4 p-2">
            <Avatar
              onClick={() => handleFileChangeDefault(img.value)}
              className={styles.avatar}
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

              <FormField
                control={form.control}
                name="description"
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
                    <Select onValueChange={(value) => setTeamSelected(value)}>
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

export default AddBotPage;