import add from '../assets/icons/add-circle.svg'
import trash from '../assets/icons/trash.svg';
import edit from '../assets/icons/edit.svg';
import { useState } from 'react';


const Table = ({data,deleteItem,dispatch})=> {
    const [filter , setFilter] = useState('');


      
  const handleDelete =  (id) => {
    try {
       dispatch(deleteItem(id)); 
      console.log("item deleted successfully");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleFilter = (e)=>{
    setFilter(e.target.value)
}
const headers =( Object.keys(data[0] || [])).filter(attr => attr != '_id')

const filteredData = data.filter(item =>{
    const keys = headers;
    
    return keys.some(key =>{
        return item[key].toLowerCase().includes(filter.toLowerCase())
    })
})






    return (
        <div className="wrapper mt-8">
      <div className="flex justify-between content-center mb-2">
        <div className="filter rounded-lg  p-1  ">
            <input type="text" className="filter-input w-full h-full border-none outline-none  " onChange={handleFilter} placeholder="Search ..." />

        </div>
        <div className="button bg-green-600 p-2 gap-2 rounded-xl flex content-center text-white">
          <span>Add</span>
          <img src={add} alt="" />
        </div>

      </div>
      <table className="table-auto   w-full ">
        <thead className="bg-zinc-900   text-white">
          <tr className="rounded">
            {headers.map((header) =>{

                return(
                  
                    <th>{(header.charAt(0).toUpperCase()+header.slice(1)).replace(/([a-z])([A-Z])/g, '$1 $2')}</th>
                )
            })}
          
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <tr  key={item._id}>

                {headers.map(header=>{
                    return(
                        <td>{item[header]}</td>
                    )
                })}
                <td className="flex gap-2 buttons">
                    <img src={edit} alt="" />
                    <img onClick={() => handleDelete(item._id)} src={trash} alt="" />
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
      </div>
    )



}




export default Table;