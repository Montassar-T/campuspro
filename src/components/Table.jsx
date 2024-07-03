import add from '../assets/icons/add-circle.svg'
import trash from '../assets/icons/trash.svg';
import edit from '../assets/icons/edit.svg';


const Table = ({data,deleteItem,dispatch})=> {


      
  const handleDelete =  (id) => {
    try {
       dispatch(deleteItem(id)); 
      console.log("Worker deleted successfully");
    } catch (error) {
      console.error("Error deleting worker:", error);
    }
  };

  const headers = Object.keys(data[0] || [])
    return (
        <div className="wrapper mt-8">
      <div className="flex justify-end mb-2">
        <div className="button bg-green-600 p-2 gap-2 rounded-xl flex content-center text-white">
          <span>Add</span>
          <img src={add} alt="" />
        </div>

      </div>
      <table className="table-auto   w-full ">
        <thead className="bg-zinc-900   text-white">
          <tr className="rounded">
            {headers.map((header) =>{
                if(header!='_id')
               { return(
                  
                    <th>{header.charAt(0).toUpperCase()+header.slice(1)}</th>
                )}
            })}
          
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((worker) => (
              <tr  key={worker._id}>
                <td>{worker.firstName}</td>
                <td>{worker.lastName}</td>
                <td>{worker.cin}</td>
                <td>{worker.fonction}</td>
                <td className="flex gap-2 buttons">
                    <img src={edit} alt="" />
                    <img onClick={() => handleDelete(worker._id)} src={trash} alt="" />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No workers found</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    )



}




export default Table;