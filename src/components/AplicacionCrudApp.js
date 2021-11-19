import React,{useState} from "react";
import AplicacionCrudForm from "./AplicacionCrudForm";
import AplicacionCrudTable from "./AplicacionCrudTable";



const inicialDb = [
    {
        "nombre": "Pedro",
        "apellido": "Bonnin",
        "localidad": "Villa elisa",
        "id": 1
      },
      {
        "nombre": "Quentin ",
        "apellido": " Tarantino",
        "localidad": "Knoxville",
        "id": 2
      },
      {
        "nombre": "Woody ",
        "apellido": "Allen",
        "localidad": " Brooklyn",
        "id": 3
      }
];

const AplicacionCrudApp = () => {
    const [db,setDb] = useState(inicialDb);
    
    const [dataToEdit, setDataToEdit] = useState(null);
    //si es null, inserta, sino edita
    
    const createData = (data) => {
        data.id = Date.now();
        setDb([...db, data]);
      };

    const updateData =(data)=>{
        let newData= db.map(el=>el.id ===data.id? data:el);
        setDb(newData);
    };

    const deleteData =(id) => {
        let isDelete = window.confirm(`"Esta seguro que quiere eliminar el ${id}`);

        if (isDelete){
            let newData = db.filter((el)=>el.id!==id);
            setDb(newData);
        }else{
            return;
        }
    };


   
  return (
    <div>
      <h2>CRUD App</h2>
        <AplicacionCrudForm
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
        <AplicacionCrudTable
          data={db}
          setDataToEdit={setDataToEdit}
          deleteData={deleteData}
        />
    </div>
  );
};
export default AplicacionCrudApp;