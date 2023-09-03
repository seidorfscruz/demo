import { supabase } from "@/apis";
import { Layout } from "@/components/layouts";
import { Button } from "@/registry/default/ui/button";
import { Input } from "@/registry/default/ui/input";
import { ReactHTMLElement, useState } from "react";
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
  } from "@/registry/default/ui/popover"
import styles from "./styles.module.css"
const TestUploadPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null| string>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null); // Nuevo estado para la URL de vista previa
    
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

  const handleFileChangeDefault = (url:string) => {
    setPreviewURL(url)
    const fileInput = document.querySelector<HTMLInputElement>("#docfile");
    setSelectedFile('default')

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
        console.log("Nuevo nombre del archivo en el input:", fileInput.files[0].name);
      } else {
        console.log("No se ha seleccionado ningún archivo.");
      }
    } else {
      console.log("No se encontró el input de tipo file.");
    }
  }

  const uploadFile = async () => {
    if (!selectedFile) {
      console.log("No file selected.");
      return;
    }

    const { data, error } = await supabase.storage
      .from('Images')
      .upload('public/prueba123', selectedFile);

    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
  };

  return (  
    <Layout>
      <Avatar className="w-20 h-20">
        {previewURL ? ( // Mostrar la vista previa si está disponible
          <AvatarImage src={previewURL} />
        ) : (
          <AvatarFallback>CN</AvatarFallback>
        )}
      </Avatar>
      <Input id="docfile"type="file" className="custom-file-input" onChange={handleFileChange} />
      <Popover >
  <PopoverTrigger>SELECT A DEFAULT AVATAR</PopoverTrigger>
  <PopoverContent>
  <PopoverClose>
  <div className="flex flex-wrap">
  <div className="w-1/2 p-2">
  
     <Avatar onClick={() => handleFileChangeDefault('https://fzjgljxomqpukuvmguay.supabase.co/storage/v1/object/public/Images/default/avatardefault1.jpeg')} className={styles.avatar}>
      <AvatarImage src={'https://fzjgljxomqpukuvmguay.supabase.co/storage/v1/object/public/Images/default/avatardefault1.jpeg'} />
      <AvatarFallback>CN</AvatarFallback>
      
    </Avatar>
  </div>
  <div className="w-1/2 p-2">
  <Avatar onClick={() => handleFileChangeDefault('https://fzjgljxomqpukuvmguay.supabase.co/storage/v1/object/public/Images/default/avatardefault2.jpeg')} className={styles.avatar}>
      <AvatarImage  src={'https://fzjgljxomqpukuvmguay.supabase.co/storage/v1/object/public/Images/default/avatardefault2.jpeg'} />
      
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  </div>
  <div className="w-1/2 p-2">
     <Avatar onClick={() => handleFileChangeDefault('https://fzjgljxomqpukuvmguay.supabase.co/storage/v1/object/public/Images/default/avatardefault3.jpeg')}className={styles.avatar}>
      <AvatarImage src={'https://fzjgljxomqpukuvmguay.supabase.co/storage/v1/object/public/Images/default/avatardefault3.jpeg'} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  </div>
  <div className="w-1/2 p-2">
     <Avatar onClick={() => handleFileChangeDefault('https://fzjgljxomqpukuvmguay.supabase.co/storage/v1/object/public/Images/default/avatardefault4.jpeg')} className={styles.avatar}>
      <AvatarImage src={'https://fzjgljxomqpukuvmguay.supabase.co/storage/v1/object/public/Images/default/avatardefault4.jpeg'} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  </div>
</div>
</PopoverClose>
    </PopoverContent>
</Popover>

      <Button onClick={uploadFile}>Submit</Button>
    </Layout>
  );
}

export default TestUploadPage;
