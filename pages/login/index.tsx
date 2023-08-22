"use client";
import { useState } from "react";
import supabase from "../../apis/supabase";
import react from "react";
import { Button } from "@/registry/default/ui/button";
import { Label } from "@/registry/default/ui/label";
import { Input } from "@/registry/default/ui/input";

const loginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [info, setInfo] = useState({
    name: "",
    description: "",
    autor: "",
  });

  const post = async () => {
    console.log("asd123 ejecutando ");
    try {
      const x1 = await supabase
        .from("aibot")
        .insert([
            {
                idTenant: 1,
                name: "Nombre del bot",
                description: "Descripción del bot",
                createdUser: "Usuario de creación",
                updatedUser: "Usuario de actualización",
                imageUrl:"www.google.com/images"
            },
        ])
        .select();

      console.log(x1);
    } catch (err) {
      console.log(err);
    }
  };

  const put = async () => {
    console.log("put ejecutando ");
    try {
      const x1 = await supabase
        .from("bot")
        .update([
          { autor: "agustuki", description: "test1231", name: "agustin" },
        ])
        .eq('id', '0ed18a67-b823-4a43-83a3-aeae784f32e7')
        .select();

      console.log(x1);
    } catch (err) {
      console.log(err);
    }
  };

 

  const handleSumbit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const result = supabase.auth.signInWithOtp({
        email,
      });
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  // async function handleSumbit(event: { preventDefault: () => void }) {

  //     event.preventDefault()
  //     console.log(event)
  //     const { data, error } = await supabase.auth.signInWithOtp({
  //       email,
  //       options: {
  //         emailRedirectTo: 'http://localhost:3000',
  //       },
  //     })
  //   }

const login = async ()=>{

    try{
    const log = await supabase.auth.signUp(
        {
          email: 'agustin-nibanez@hotmail.com',
          password: 'agustinboca12',
          options: {
            data: {
              first_name: 'agustiki',
              age: 27,
            }
          }
        }
      )

console.log(log)
}catch(err){
    console.log(err)
  }
}
  return (
    <div>
      <h1>Hello world</h1>
      <form onSubmit={handleSumbit} action="">
        <input
          type="email"
          name="email"
          placeholder="Type your email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <Button type="submit">link magic</Button>
      </form>

      <form>
        <Label>Nombre</Label>
        <Input></Input>
        <Label>descriptions</Label>
        <Input></Input>
        <Label>img</Label>
        <Input></Input>
        <Button type="button" onClick={post}>
          post
        </Button>
      </form>
      <form>
       
        <Button type="button" onClick={put}>
          put
        </Button>
        <Button type="button" onClick={login}>
          login
        </Button>
      </form>
  
    </div>
  );
};

export default loginPage;
