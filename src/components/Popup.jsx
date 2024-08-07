import React, { useEffect } from "react";
import close from "../assets/icons/add.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { date } from "zod";
import { format } from "date-fns";

export const Popup = ({
  handlePopup,
  addItem,
  zodObject,
  editingItem,
  editItem,
  setEditingItem,
  setDisplayPopup,
  setData,
  formConfig,
  listW
}) => {
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: {  errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(zodObject),
  });

  const onSubmit = async (data) => {
    console.log("clicked");
    try {
      if (!editingItem) {
        await addItem(data);
        reset();
        handlePopup(false);
      } else {
        data._id = editingItem._id;
        await editItem(data);
        setData((prev) =>
          prev.map((item) => (item._id === data._id ? data : item))
        );

        setEditingItem(null);
        reset();
        setDisplayPopup((prev) => !prev);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (editingItem ) {
      formConfig.map((con) => {

        if(con.type === "date") {
          console.log(format(new Date(editingItem.date) , "dd-MM-yyyy"))
          const formatedDate = format(new Date(editingItem.date) , 'yyyy-MM-dd')
          console.log(formatedDate)
          setValue('date', formatedDate)
        }else
        {const attrName = con.name;

        setValue(attrName, editingItem[attrName] || "");}
      });
    }
  }, [setValue]);

  return (
    <div className="popup  absolute inset-0 conte flex items-center justify-center">
      <div className="bg bg-black min-h-full min-w-full absolute opacity-50"></div>
      <div className="form-conatiner  p-4   relative bg-slate-200 max-h-fit max-w-fit ">
        <div
          className="close w-full flex justify-end cursor-pointer  "
          onClick={handlePopup}
        >
          <img src={close} className="" alt="" />
        </div>
        <form className="  p-8 grid  gap-2 " onSubmit={handleSubmit(onSubmit)}>
          {formConfig.map((con) => {
            let attrName = con.name;
            return (
              <div
                className={`input-container col-span-${con.colSpan} flex flex-col`}
              >
                <label htmlFor="">{con.label}</label>

                {con.type != "select" ? (
                  <input
                    className="p-1.5 rounded-sm"
                    type={con.type}
                    placeholder={con.placeholder}
                    {...register(con.name)}
                  />
                
                ) : (
                    <select 
                    className="p-1.5 rounded-sm"
                    {...register(con.name)}
                  >
                    {listW.map(worker =>{
                           
                            return  <option value={worker._id}>{worker.firstName+' '+ worker.lastName}</option>
                    
                    })}
                     </select>
                )}

{errors[con.name]?.message && (
            <p className="text-red-500">{errors[con.name].message}</p>
          )}
              </div>
            );
          })}

          {/* <div className="input-container col-span-6 flex flex-col">

            <label htmlFor="">First Name</label>
            <input
              className="p-1.5 rounded-sm"
              type="text"
              placeholder="john"
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-red-500">{errors.firstName.message}</p>
            )}
          </div>
          <div className="input-container flex flex-col col-span-6">
            <label htmlFor="">Last Name</label>
            <input
              className="p-1.5 rounded-sm"
              type="text"
              placeholder="Smith"
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-red-500">{errors.lastName.message}</p>
            )}
          </div>
          <div className="input-container col-span-12 flex flex-col">
            <label htmlFor="">Cin</label>
            <input
              className="p-1.5 rounded-sm"
              type="text"
              placeholder="12345678"
              {...register("cin")}
            />
            {errors.cin && <p className="text-red-500">{errors.cin.message}</p>}
          </div>
          <div className="input-container  col-span-12 flex flex-col">
            <label htmlFor="">Fonction</label>
            <input
              className="p-1.5 rounded-sm"
              type="text"
              placeholder="Professor"
              {...register("fonction", { required: true })}
            />
            {errors.fonction && (
              <p className="text-red-500">{errors.fonction.message}</p>
            )}
          </div> */}
          <input
            // disabled={!isValid}
            type="submit"
            value="submit"
            className="cursor-pointer disabled:bg-green-400  bg-green-600 justify-self-auto py-1.5 px-4   mt-4 rounded-sm text-white"
          />
        </form>
      </div>
    </div>
  );
};
