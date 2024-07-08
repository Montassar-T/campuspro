import add from "../assets/icons/add-circle.svg";
import trash from "../assets/icons/trash.svg";
import edit from "../assets/icons/edit.svg";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Popup } from "./Popup";

const Table = ({ data, deleteItem, setData }) => {
  const [filter, setFilter] = useState("");
  const [addItem, setAdd] = useState(false);

  const toastOne = () => {
    toast("Here is your toast.");
  };

  const handleDelete = async (id) => {
    toastOne();
    try {
      await deleteItem({ id });
      setData((prev) => {
        return prev.filter((item) => item._id != id);
      });
      console.log("item deleted successfully");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };
  const headers = Object.keys(data[0] || []).filter((attr) => attr != "_id");

  const filteredData = data.filter((item) => {
    const keys = headers;

    return keys.some((key) => {
      return item[key].toLowerCase().includes(filter.toLowerCase());
    });
  });

  const handleAdd = () => {
    setAdd((prev) => !prev);
  };
  return (
    <div className="wrapper mt-8">
      <div className="flex justify-between content-center mb-2">
        <div className="filter rounded-lg bg-slate-100 p-2 ps-4  ">
          <input
            type="text"
            className="filter-input w-full bg-transparent  h-full border-none outline-none  "
            onChange={handleFilter}
            placeholder="Search ..."
          />
        </div>
        <div
          className="button bg-green-600 p-2 gap-2 rounded-xl flex content-center text-white cursor-pointer"
          onClick={handleAdd}
        >
          <span>Add</span>
          <img src={add} alt="" />
        </div>
      </div>
      <table className="table-auto   w-full ">
        <thead className="bg-zinc-900   text-white">
          <tr className="rounded">
            {headers.map((header) => {
              return (
                <th key={header}>
                  {(header.charAt(0).toUpperCase() + header.slice(1)).replace(
                    /([a-z])([A-Z])/g,
                    "$1 $2"
                  )}
                </th>
              );
            })}

            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <tr key={item._id}>
                {headers.map((header) => {
                  return <td>{item[header]}</td>;
                })}
                <td className="flex gap-2 buttons">
                  <img src={edit} alt="" />
                  <img
                    onClick={() => handleDelete(item._id)}
                    src={trash}
                    alt=""
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No items found</td>
            </tr>
          )}
        </tbody>
      </table>

    { addItem && <Popup handleAdd={handleAdd}/>}
    </div>
  );
};

export default Table;
