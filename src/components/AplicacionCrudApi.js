import React, { useEffect, useState } from "react";
import { helphttp } from "../Helpers/helphttp";
import AplicacionCrudForm from "./AplicacionCrudForm";
import AplicacionCrudTable from "./AplicacionCrudTable";
import MessageApi from "./MessageApi";

const AplicacionCrudApi  = () => {
    const [db,setDb] = useState([]);

    const [dataToEdit,setDataToEdit] = useState(null);
    const [error,setError] = useState(null);//hace una insercion SI es NULL, edita si NO
    const [loading, setLoading] = useState(false);

    let api=helphttp();
    let url= "http://localhost:5000/personas";//conecta api

    //mostamos la respuesta
    useEffect(()=>{
            setLoading(true); //actualiza la variable setLoading 
            helphttp().get(url).then((res)=>{//importa GET del Helper

                if(!res.err){//recibe la llamada error
                    setDb(res)// 
                    setError(null); //si no hubo un error del get del helper, se actualiza a null
                }else{ //pero si hubo un error
                    setDb(null);
                    setError(res)// se actualiza con el error
                }
        
            setLoading(false);//GET vuelve a falso
            });
            },[url]);



  const createData = (data) => { //devuelve una promesa
    data.id = Date.now(); //para creear un id en el nuevo campo

    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.post(url, options).then((res) => {
      if (!res.err) {
        setDb([...db, res]);
      } else {
        setError(res);
      }
    });
  };

  const updateData = (data) => {
    let endpoint = `${url}/${data.id}`;


    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.put(endpoint, options).then((res) => {
      if (!res.err) {
        let newData = db.map((el) => (el.id === data.id ? data : el));
        setDb(newData);
      } else {
        setError(res);
      }
    });
  };

  const deleteData = (id) => {
    let isDelete = window.confirm(
      `¿Estás seguro de eliminar el registro con el id '${id}'?`
    );

    if (isDelete) {
      let endpoint = `${url}/${id}`;
      let options = {
        headers: { "content-type": "application/json" },
      };

      api.del(endpoint, options).then((res) => {
        if (!res.err) {
          let newData = db.filter((el) => el.id !== id);
          setDb(newData);
        } else {
          setError(res);
        }
      });
    } else {
      return;
    }
  };

  return (
    <div>
      <h2>CRUD API</h2>
        <AplicacionCrudForm
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
        {loading}
        {error && (
          <MessageApi
            msg={`Error ${error.status}: ${error.statusText}`}
            bgColor="#011c19"
          />
        )}
        {db && (
          <AplicacionCrudTable
            data={db}
            setDataToEdit={setDataToEdit}
            deleteData={deleteData}
          />
        )}
    </div>
  );
};

export default AplicacionCrudApi;