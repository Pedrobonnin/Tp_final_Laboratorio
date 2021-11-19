import React from "react";
import AplicacionCrudTableRow from "./AplicacionCrudTableRow";

const AplicacionCrudTable = ({data, setDataToEdit, deleteData}) => {
    return(
        <div>
            <br/><h2>Lista de Datos</h2><br/>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Localidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((el) => (
                        <AplicacionCrudTableRow key={el.id} el={el} setDataToEdit={setDataToEdit} deleteData={deleteData} />
                    ))
                ) : (
                    <tr>
                        <td>Sin datos</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};
export default AplicacionCrudTable;