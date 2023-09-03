import { Layout } from "@/components/layouts";
import styles from "./styles.module.css"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/default/ui/table";
import { Button } from "@/registry/default/ui/button";
import { Input } from "@/registry/default/ui/input";
import { Label } from "@/registry/default/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/default/ui/sheet";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/registry/default/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/default/ui/alert-dialog";
import { useEffect, useState } from "react";
import { supabase } from "@/apis";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/registry/default/ui/dialog";
import Swal from "sweetalert2";
import { Textarea } from "@/registry/default/ui/textarea";
import imgDefaultTeams from "../../constant/defaultimgteams";
import { set } from "date-fns";

export default function TeamsPage() {
  const [infoCreate, setinfoCreate] = useState({
    id: "",
    name: "",
    imageUrl: "",
    description: "",
  });
  const [infoDb, setDb] = useState([
    {
      id: "",
      name: "",
      imageUrl: "",
      description: "",
    },
  ]);
  const [infoEdit, setinfoEdit] = useState({
    id: "",
    name: "",
    imageUrl: "",
    description: "",
  });
  const [cont,setCont] = useState<string>('')
  const [selectedFile, setSelectedFile] = useState<File | null | string>(null);
  const [previewURL, setPreviewURL] = useState<string | undefined>('null'); // Nuevo estado para la URL de vista previa
  const [selectedFileEdit, setSelectedFileEdit] = useState<File  | string>('');
  const [previewURLEdit, setPreviewURLEdit] = useState<string | undefined>(''); // Nuevo estado para la URL de vista previa
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setinfoCreate((prevDocument) => ({
      ...prevDocument,
      [name]: value,
    }));
  };

  const handleSumbit = async (e: React.MouseEvent<HTMLButtonElement>) => {

    if (
      !selectedFile ||
      !infoCreate.name ||
      !infoCreate.description 
    ) {
      Swal.fire("Hello, User", "please complete all fields", "warning");
      return;
    }
    const x = await supabase
      .from("teams")
      .insert([
        {
          name: infoCreate.name,
          description: infoCreate.description,
          imageUrl: selectedFile === "default"? previewURL:1,
        },
      ])
      .select();
      if(x.data && selectedFile !== "default"){
      const x1 = await supabase.storage
      .from("Images")
      .upload(
        `imagesChatBots/${x.data[0].id}/1`,
        selectedFile
      );

    if (x.error) {
      Swal.fire(
        "¡Hello, user!",
        "The team could not be deleted correctly, please try again",
        "warning"
      );
   
    } }
      setinfoCreate({
        id: "",
        name: "",
        imageUrl: "",
        description: "",
      });
      fetchData();
      setPreviewURL('')
      Swal.fire("¡Hello, user!", "Team created successfully ", "success");
    
  };

  async function fetchData() {
    const x = await supabase.from("teams").select();
    if (x.error) {
      console.log(x.error);
    } else {
      setDb(x.data);
    }
  }
  

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;

    const xGet = await supabase.from("teams").select("*").eq("id", value);
    if(xGet.error) return console.log(xGet.error)


    const x = await supabase.from("teams").delete().eq("id", value);
    if (x.error) {
      Swal.fire(
        "¡Hello, user!",
        "The team could not be deleted correctly, please try again",
        "warning"
      );
      console.log(x.error);
    } else {
    if(typeof infoEdit.imageUrl === "number" ||!isNaN(Number(infoEdit.imageUrl))){
        const xDelete = await supabase.storage
        .from("Images")
        .remove([`imagesChatBots/${xGet.data[0].id}/${xGet.data[0].imageUrl}`]);

        if(xDelete.data) console.log(xDelete.data)
        if(xDelete.error) console.log(xDelete.error)
      Swal.fire("¡Hello, user!", "Team deleted successfully ", "success");
      fetchData();
    }
    Swal.fire("¡Hello, user!", "Team deleted successfully ", "success");
      fetchData();
    }
  };



  const handleEdit = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setinfoEdit((prevDocument) => ({
      ...prevDocument,
      [name]: value,
    }));
  

  
  };

  const handleBaseId = async (event: React.MouseEvent<HTMLButtonElement>) => {
      const id = event.currentTarget.value;
      

    const x = await supabase.from("teams").select("*").eq("id", id);
    if (x.error) {
    console.log(x.error)
    } else {
      setinfoEdit({
        name: x.data[0].name,
        imageUrl: x.data[0].imageUrl,
        description: x.data[0].description,
        id: x.data[0].id,
      });
      setPreviewURLEdit(x.data[0].imageUrl)
      setCont(x.data[0].imageUrl)
    }
  };

  const handleUpdate = async() => {

    const x = await supabase
    .from('teams')
    .update({ name: infoEdit.name, description: infoEdit.description,imageUrl: infoEdit.imageUrl })
    .eq('id', infoEdit.id)
    .select()

  if (x.error)  return Swal.fire("¡Hola, usuario!", "the changes have not been made successfully", "error");

  if(typeof infoEdit.imageUrl === "number" ||!isNaN(Number(infoEdit.imageUrl))){
    const xDelete = await supabase.storage
    .from("Images")
    .remove([`imagesChatBots/${infoEdit.id}/${cont}`]);

    if(xDelete.data) console.log(xDelete.data)
    if(xDelete.error) console.log(xDelete.error)

    const x1 = await supabase.storage
    .from("Images")
    .upload(
      `imagesChatBots/${infoEdit.id}/${infoEdit.imageUrl}`,
      selectedFileEdit
    );
  }
 
  setinfoEdit({
        id: "",
        name: "",
        imageUrl: "",
        description: "",
      })
    fetchData()
    return Swal.fire("¡Hello, user!", "the changes have been made successfully", "success");
  
}

const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files && event.target.files[0];

  if (file) {
    setSelectedFile(file);
    setPreviewURL(URL.createObjectURL(file)); // Crear la URL de vista previa
  } else {
    setSelectedFile(null);
    setPreviewURL('');
  }
};

const handleFileChangeEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files && event.target.files[0];

  if (file) {
    setSelectedFileEdit(file);
    setPreviewURLEdit(URL.createObjectURL(file)); 

    //Si setInfoedit es un numero le sumo uno, en caso contrario le asigno 1
    //Esto es para que no se repitan los nombres de las imagenes
    if(typeof infoEdit.imageUrl === "number" ||!isNaN(Number(infoEdit.imageUrl))){
      setinfoEdit(prevState => ({
        ...prevState, // Mantén las propiedades existentes
        imageUrl: (+infoEdit.imageUrl + 1).toString() // Actualiza la propiedad imageUrl
      }));

      }else{
        setinfoEdit(prevState => ({
          ...prevState, // Mantén las propiedades existentes
          imageUrl: '1'
        }));
      }
    }else {
    setSelectedFileEdit('');
    setPreviewURLEdit('');
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


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <div>
        <div className={styles.divNav}>
            <div>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Teams
      </h1>
          </div>
          <div className={styles.btnNav}>
          <Sheet>
            <SheetTrigger asChild>
              <Button >Add new team</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Create team </SheetTitle>
                <SheetDescription>
                  Create new teams. In the teams you can group bots with similar
                  themes
                </SheetDescription>
              </SheetHeader>

              <div className="grid gap-4 py-4">
              <div className={styles.avatarForm}>
                <Avatar className="w-20 h-20">
                  <AvatarImage
                    src={previewURL}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>


                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>
              </div>
              
             
                <Input
                        id={"docfile"}
                        type="file"
                        onChange={handleFileChange}
                      />
              <Popover>
  <PopoverTrigger asChild>
    <Button style={{ width: "100%"}} className={styles.PopoverContent} variant="outline">
      SELECTED IMAGE DEFAULT
    </Button>
  </PopoverTrigger>
  <PopoverContent className={styles.PopoverContent}>
    <PopoverClose>
      <div className="flex flex-wrap">
        {imgDefaultTeams?.map((img) => (
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

              <SheetFooter>
                <SheetClose asChild>
                  <Button style={{ width: "100%", marginTop: "15px" }} onClick={handleSumbit} type="submit">
                    Create team
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          </div>
        </div>


        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead style={{ width: "15%" }}  className="w-[100px]">Avatar</TableHead>
              <TableHead style={{ width: "15%" }}>Name</TableHead>
              <TableHead style={{ width: "50%" }}>Description</TableHead>
              <TableHead style={{ width: "5%" }}>Edit</TableHead>
              <TableHead style={{ width: "15%" }} >Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {infoDb.map((infoDb) => (
              <TableRow key={infoDb.id}>
                <TableCell className="font-medium">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={typeof infoDb.imageUrl === "number" ||
                            !isNaN(Number(infoDb.imageUrl))
                              ? `https://fzjgljxomqpukuvmguay.supabase.co/storage/v1/object/public/Images/imagesChatBots/${infoDb.id}/${infoDb.imageUrl}`
                              : infoDb.imageUrl} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{infoDb.name}</TableCell>
                <TableCell>{infoDb.description}</TableCell>


                <TableCell>
                    <Dialog>
                      <DialogTrigger  value={infoDb.id}
                          onClick={(event) => {
                            handleBaseId(event);
}}
                          className="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md">
                        
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#000000"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                            <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
                          </svg>
                       
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Edit teams</DialogTitle>
                          <DialogDescription>
                            Make changes to your Teams here. Click save when
                            you re done.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                        <div className={styles.avatarForm}>
                        <Avatar className="w-20 h-20">
                        <AvatarImage src={typeof previewURLEdit === "number" ||
                            !isNaN(Number(previewURLEdit))
                              ? `https://fzjgljxomqpukuvmguay.supabase.co/storage/v1/object/public/Images/imagesChatBots/${infoEdit.id}/${infoEdit.imageUrl}`
                              : previewURLEdit} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                </div>
                          <div className="grid grid-cols-4 items-center gap-4">


                            <Label htmlFor="name" className="text-right">
                              Name
                            </Label>
                            <Input
                              name="name"
                              value={infoEdit.name}
                              onChange={handleEdit}
                              className="col-span-3"
                            />
                          </div>



                          <div className="grid grid-cols-4 items-center gap-4">
           
            
                          </div>

                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                              Descriptions
                            </Label>
                            <Textarea
                              name="description"
                              value={infoEdit.description}
                              onChange={handleEdit}
                              className="col-span-3"
                            />
                          </div>

                          <Input
                        id={"docfile"}
                        type="file"
                        onChange={handleFileChangeEdit}
                      />
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button onClick={handleUpdate} type="button">
                              Save changes
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>

                <TableCell className="">
                 

                  <AlertDialog>
                    <AlertDialogTrigger
                      value={infoDb.id}
                      className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your document and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          value={infoDb.id}
                          onClick={(e) => {
                            handleDelete(e);
                          }}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
}
