import { Layout } from '@/components/layouts'
import { Button } from '@/registry/default/ui/button';
import { Separator } from "@/registry/default/ui/separator"
import { MouseEvent, useEffect } from 'react';
import { Input } from "@/registry/default/ui/input"
import { useState } from "react";
import axios from 'axios';
import styles from './styles.module.css';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { Textarea } from "@/registry/default/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/default/ui/avatar"
import { Label } from "@/registry/default/ui/label"
import {Table,TableBody,TableCaption,TableCell,TableHead,TableHeader,TableRow,} from "@/registry/default/ui/table"
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/registry/default/ui/select"
import {HoverCard,HoverCardContent,HoverCardTrigger,} from "@/registry/default/ui/hover-card"
import { Alert, AlertDescription, AlertTitle } from "/registry/default/ui//alert"
import Swal from 'sweetalert2';
import React from 'react'
import { Card } from 'semantic-ui-react'





const DocumentsPage = () => {
    const [basededatos, setBasededatos] = useState([]);
    const [nombres, setNombres] = useState("");
    const [descriptions, setDescriptions] = useState("");
    const [type, setType] = useState("");
    const [img, setImg] = useState("https://github.com/shadcn.png");
    const objMock ={
        finance: "https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        rrhh:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA9enOPrVdOEU1MsFljdUnEoJiqG1Fg5dUZg&usqp=CAU",
        legales:"https://images.pexels.com/photos/5669619/pexels-photo-5669619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        default: "https://github.com/shadcn.png"
    }

    const currentDate = new Date();

    // Obtén el día, el mes y el año por separado
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Los meses en JavaScript son indexados desde 0, por lo que sumamos 1.
    const year = currentDate.getFullYear();
    // Formatea la fecha al formato día/mes/año
    const formattedDate = `${day}/${month}/${year}`;
  
    
    const getAllDataFromLocalStorage = () => {
        if (typeof window !== 'undefined') {
        const allData = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          const value = localStorage.getItem(key);
          allData.push({ key, value });
        }
        return allData;
    }
      };
    
      const getPublicDataFromLocalStorage = () => {
        if (typeof window !== 'undefined') {
            const array = []
      const data = getAllDataFromLocalStorage()
      
        for(let i=0; i <= data.length -1 ; i++){

           array.push(JSON.parse(data[i].value))
        }
       
 
       const info = array.filter(objeto => objeto.isData === true);
       setBasededatos(info)
    }
      }


      
     
    const onClick = (): void => {
        
        if(!descriptions || type == "default" || type == "" || !nombres){
         return   Swal.fire('¡Hola, usuario!', 'select a type or add description', 'error')
        }

   

        const data = {
            name: nombres,
            descriptions: descriptions,
            type: type,
            img: img,
            date: formattedDate,
            isData:true
          };
          
        localStorage.setItem(nombres, JSON.stringify(data));

        const files = document.querySelector<HTMLInputElement>('#docfile')?.files![0];
        const formData = new FormData();
        formData.append('files', files!);
        formData.append('chunkSize', '1000');
        formData.append('chunkOverlap', '30');
        formData.append('stripNewLines', 'true');
        formData.append('question', 'Hey, how are you?');

        setNombres(null)
        const fileInfoDiv = document.getElementById('file-info');
        // fileInfoDiv.textContent = 'No file selected';
        
        axios.post('https://flowise.seidoranalytics.com/api/v1/prediction/1060b49a-44c6-43de-98b7-fe047331ddf1', formData, { headers: { 'Content-Type': 'multipart/form-data' }})
                .then(function () { Swal.fire('¡Hola, usuario!', 'Cargado exitosamente', 'success');}, getPublicDataFromLocalStorage())
                .catch(function () { Swal.fire('¡Hola, usuario!', 'Su archivo no se ha podido cargar correctamente', 'error');})
    }

    const handleSelectChange = (event) => {
        const typeEvent = event.target.value
        setType(typeEvent);
        setImg(objMock[typeEvent])
      };
    
      const handleChangeText = (event) => {
      
        setDescriptions(event.target.value);
      };

        function handleFileChange(event) {
          const fileInput = event.target;
          const fileInfoDiv = document.getElementById('file-info');
          
          if (fileInput.files.length > 0) {
            const fileName = fileInput.files[0].name;
            setNombres(fileName)
          }
        }

        useEffect(() => {
            getPublicDataFromLocalStorage()
            console.log(basededatos)
          }, []);
          
  return (
        
    <Layout  title='Documents page'>
        <div className ={styles.body}>
        <div className ={styles.sidebar}>
        <Label htmlFor="email">
            YOUR FILES
        </Label>

{basededatos?.map((obj)=>{
    return(
    <div className ={styles.hover}>
  
  <div>
  <Avatar className="w-20 h-20">
    <AvatarImage src={obj.img} />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
  </div>    
  <div className={styles.hoverCont}>
  <h1>{obj.name}</h1>
  <h3>{obj.date}</h3> <h3>{obj.type}</h3>
  <p>{obj.descriptions}</p>
  </div>    
  
  
  </div>
    )
})

}



</div>

       
        
        <div className ={styles.content}>

                
        <div className={styles.main}>

          
<div className={styles.avatar}>
<Avatar className="w-40 h-40">
  <AvatarImage src={img} />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>

</div>
<div className={styles.select}>
<Label>Select an option</Label>
<select onChange={handleSelectChange}   id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option selected value="default">Choose a type</option>
  <option value="legales">Legales</option>
  <option value="finance">Finance</option>
  <option value="rrhh">Human resources</option>
</select>
</div>

<div className={styles.descriptions}>
<Label htmlFor="email">Your descriptions</Label>
<Textarea onChange={handleChangeText} />
</div>    

<div className={styles.descriptions}>
      <label htmlFor="docfile" className="flex flex-col items-center justify-center w-full h-25 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
      <FaCloudUploadAlt className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
           
           {nombres?`Filed Select: ${nombres}`:"Select file PDF, TXT OR JSON (MAX. 1GBx)"}</p>
 
      </label>
      {/* <div id="file-info" className="text-xs text-gray-500 dark:text-gray-400"></div> */}
      <input id="docfile" type="file" className="hidden" onChange={handleFileChange} />
      {nombres?<Button variant="outline" onClick={ onClick }>Upload</Button>:""}
</div>
  

          

        </div>
        </div>
        </div>
    </Layout>
    
  )
};

export default DocumentsPage