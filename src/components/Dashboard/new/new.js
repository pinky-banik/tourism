import axios from 'axios';
import React from 'react';
import { useForm } from "react-hook-form";
import "./new.css";



const New = () => {
    const { register, handleSubmit, reset} = useForm();
    const onSubmit = data => {
        console.log(data)
        axios.post("http://localhost:5000/services",data)
        .then(res=>{
            // console.log(res)
            if(res.data.insertId){
                alert("added succesfully")
                reset();    
            }
        })
    
    
    
    };
    return (
        <div className="add-services">
            <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("Name")} placeholder="Tour Ariya" />
      <textarea {...register("description")} placeholder="Description" />
      <input type="number" {...register("price")} placeholder="Packege Price" />
      <input {...register("img")} placeholder="Add Image" />
      <input type="submit" />
    </form>
        </div>
    );
};

export default New;