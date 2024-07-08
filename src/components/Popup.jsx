import React from 'react'
import close from "../assets/icons/add.svg";
import { useForm } from 'react-hook-form';

export const Popup = ({handleAdd}) => {

    const {register, handleSubmit, formState: {errors}} = useForm();


    const onSubmit = async (data)=>{
        const {lastName, firstName, cin, fonction} = data;


    }

  return (
   
        <div className="popup  absolute inset-0 conte flex items-center justify-center">
          <div className="bg bg-black min-h-full min-w-full absolute opacity-50"></div>
          <div className="form-conatiner  p-4   relative bg-slate-300 max-h-fit max-w-fit ">
            <div
              className="close w-full flex justify-end cursor-pointer  "
              onClick={handleAdd}
            >
              <img src={close} className="" alt="" />
            </div>
            <form className=" flex flex-col p-8 "  onSubmit={handleSubmit(onSubmit)}>
              <div className="input-container flex flex-col">
                <label htmlFor="">First Name</label>
                <input
                
                  className="p-1.5 rounded-sm"
                  type="text"
                  placeholder="john"
                  {...register("firstName")}
                />
              </div>
              <div className="input-container flex flex-col">
                <label htmlFor="">Last Name</label>
                <input
                  className="p-1.5 rounded-sm"
                  type="text"
                  placeholder="Smith"
                  {...register("lastName")}

                />
              </div>
              <div className="input-container flex flex-col">
                <label htmlFor="">Cin</label>
                <input
                  className="p-1.5 rounded-sm"
                  type="text"
                  placeholder="12345678"
                  {...register("cin")}

                />
              </div>
              <div className="input-container flex flex-col">
                <label htmlFor="">Fonction</label>
                <input
                  className="p-1.5 rounded-sm"
                  type="text"
                  placeholder="Professor"
                  {...register("fonction")}
                  
                />
              </div>
              <input type="submit" value="submit" />
            </form>
          </div>
        </div>
      )


  
}
