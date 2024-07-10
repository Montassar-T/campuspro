import add from "../assets/icons/add-circle.svg";
import trash from "../assets/icons/trash.svg";
import edit from "../assets/icons/edit.svg";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Popup } from "./Popup";
import { format } from "date-fns";
import { useFetchWorkersQuery } from "../features/workers";

const Table = ({
  data,
  deleteItem,
  setData,
  addItem,
  zodObject,
  editItem,
  formConfig,
}) => {
  const [filter, setFilter] = useState("");
  const [dispalayPopup, setDisplayPopup] = useState(false);

  const [editingItem, setEditingItem] = useState(null);

  const { data: listOfWorkers } = useFetchWorkersQuery();

  const [listW, setListW] = useState([]);

  useEffect(() => {
    if (listOfWorkers) {
      
      setListW(listOfWorkers.data);
      console.log("listw",listW);
    }
  });

  const handleEdit = (item) => {
    setEditingItem(item);
    setDisplayPopup(true);
  };

  const handleDelete = async (id) => {
    console.log(id)
    
    try {
      const dee =await deleteItem({ id });
      console.log(dee)
      setData((prev) => {
        return prev.filter((item) => item._id != id);
      });

      toast.success("item deleted successfully", {
        position: "top-right",
        className: "toast",
      });
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };
  const headers = Object.keys(data[0] || []).filter(
    (attr) => !["_id", "createdAt", "updatedAt"].includes(attr)
  );

  const filteredData = data.filter((item) => {
    const keys = headers;

    return keys.some((key) => {
      return item[key].toLowerCase().includes(filter.toLowerCase());
    });
  });
  const handlePopup = () => {
    setEditingItem(null)
    setDisplayPopup((prev) => !prev);

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
          onClick={handlePopup}
        >
          <span>Add</span>
          <img src={add} alt="" />
        </div>
      </div>
      <table className="table-auto   w-full ">
        <thead className="bg-zinc-900   text-white">
          <tr>
            {headers.map((header) => {
              return (
                <th key={header}>
                  {header === "workerId"
                    ? "Worker"
                    : (
                        header.charAt(0).toUpperCase() + header.slice(1)
                      ).replace(/([a-z])([A-Z])/g, "$1 $2")}
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
                  if (header != "workerId") {
                    return (
                      <td>
                        {header == "date"
                          ? format(new Date(item[header]), "dd-MM-yyyy")
                          : item[header]}
                      </td>
                    );
                  } else {
                    return (
                      <td>
                        {listW.map((worker) => {
                          if (worker._id == item[header]) {
                            return worker.firstName+' '+ worker.lastName
                          }
                        })}
                      </td>
                    );
                  }
                })}
                <td className="flex gap-2 buttons">
                  <img src={edit} alt="edit" onClick={() => handleEdit(item)} />
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

      {dispalayPopup && (
        <Popup
          handlePopup={handlePopup}
          addItem={addItem}
          zodObject={zodObject}
          editingItem={editingItem}
          setEditingItem={setEditingItem}
          editItem={editItem}
          setDisplayPopup={setDisplayPopup}
          setData={setData}
          formConfig={formConfig}
          listW={listW}
        />
      )}
    </div>
  );
};

export default Table;
