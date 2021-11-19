import React from "react";

const AplicacionCrudTableRow = ({el, setDataToEdit,deleteData})=>{
    let {nombre,apellido,localidad,id} = el;
        return(
            <tr>
                <td>{nombre}</td>
                <td>{apellido}</td>
                <td>{localidad}</td>
                <td>
                    {/* acciones */}
                    <button class="edit" onClick={()=>setDataToEdit(el)}>Editar</button>
                    <button class="eliminar"onClick={()=>deleteData(id)}>Eliminar</button>
                </td>

            </tr>   
    );
};
export default AplicacionCrudTableRow;