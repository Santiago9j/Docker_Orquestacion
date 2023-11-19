import React from 'react'

import { useState, useEffect, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; 
import axios from 'axios'
import { nanoid } from 'nanoid'



const Usuario = () => {
    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [textoBoton, setTextoBoton] = useState("Agregar un usuario")
    const [colorBoton, setColorBoton] = useState("green");
    const [totUsuarios, setTotUsuarios] = useState([]);
    const [ejecutarConsulta, setEjecutarConsulta] = useState(false);

    useEffect( () =>{
        const obtenerUsuarios = async () => {
            const options = {method: 'GET', url: 'http://localhost:3006/listado'};
            await axios.request(options).then(function (response) {
                setTotUsuarios(response.data);
            }).catch(function (error) {
                setTotUsuarios([]);
            });
            
        }
        if (ejecutarConsulta){
            obtenerUsuarios();
            setEjecutarConsulta(false);
        }
    }, [ejecutarConsulta])

    useEffect(() =>{
        if (mostrarTabla){
            setEjecutarConsulta(true);
        }
    }, [mostrarTabla]);

    useEffect(
        () =>{
        if (mostrarTabla){
            setTextoBoton("Agregar un usuario");
            setColorBoton("green")
        } else{
            setTextoBoton("Ver los usuarios");
            setColorBoton("blue");
        }
        }
        ,[mostrarTabla]);


    return (
        <div>
        <h1 className='titulo'>Página para la administración de usuarios</h1>
        <br />
        <center>
        <input type="submit" className='btn' value={textoBoton} style={{backgroundColor:`${colorBoton}`, color:"white"}} onClick={ () =>{
            setMostrarTabla(!mostrarTabla)}
        } />

        <br /><br />
        {
            mostrarTabla ? (<TablaUsuarios listaUsuarios={totUsuarios} setEjecutarConsulta={setEjecutarConsulta} />) : (<FormularioUsuario funcionCambiarPagina = {setMostrarTabla}  listaUsuarios={totUsuarios} funcAgregar={setTotUsuarios}/>)
        }
        <ToastContainer   />
        </center>
        </div>
    )
}

const TablaUsuarios = ({listaUsuarios, setEjecutarConsulta}) => {
    return (
        <div className="card border-primary mb-3">
        <div className="card-header">Usuarios</div>
        <div className="card-body text-primary">
        <h5 className="card-title">Listado de usuarios</h5>
        <table className="table table-bordered table-striped">
            <thead>
            <tr>
                <th>nombre</th>
                <th>apellidos</th>
                <th>edad</th>
                <th>identificacion</th>
                <th>nacionalidad</th>
                <th>email</th>
                <th>
                ACCIONES
                </th>
            </tr>
            </thead>
            <tbody>
                {listaUsuarios.map((usuario)=>{
                    return(
                        <FilaUsuario key={nanoid()} usuario={usuario} setEjecutarConsulta={setEjecutarConsulta} />
                    );
                })}
            </tbody>
        </table>
    
        </div>
    </div>

    );
}

const FilaUsuario = ({usuario, setEjecutarConsulta}) =>{
    const [edit, setEdit] = useState(false);
  
    const [infoUsuario, setInfoUsuario] = useState({
        nombre: usuario.nombre,
        apellidos: usuario.apellidos,
        edad: usuario.edad,
        identificacion: usuario.identificacion,
        nacionalidad: usuario.nacionalidad,
        email: usuario.email
    })

    const actualizarUsuario =  async() =>{
        console.log(infoUsuario)
        console.log(usuario._id)
      const options = {
        method: 'PUT',
        url: `http://localhost:3006/actualizar/${usuario._id}`,
        headers: {'Content-Type': 'application/json'},
        data: {...infoUsuario}
      };
  
      await axios.request(options).then(function (response) {
        toast.success("Se edito con exito.")
        setEjecutarConsulta(true);
      }).catch(function (error) {
        toast.error("No se puedo editar.")
        setEjecutarConsulta(true);
      });
      setEdit(false);
      
    }
    const eliminarUsuario = async() =>{
      const options = {
        method: 'DELETE',
        url: `http://localhost:3006/eliminar/${usuario._id}`,
        headers: {'Content-Type': 'application/json'}
      };
      await axios.request(options).then(function (response) {
        toast.success("Se elimino con exito.")
        setEjecutarConsulta(true);
      }).catch(function (error) {
        toast.error("no se puedo eliminar");
        setEjecutarConsulta(true);
      });
    }
  
    return (
      <tr>
        {
          edit ? <>
                    <td><input type='text' name='nombre' value={infoUsuario.nombre} 
                        onChange = {(e) => {setInfoUsuario({...infoUsuario, nombre: e.target.value})}}
                        
                        /></td>
                    <td><input type='text' name='apellidos' value={infoUsuario.apellidos} 
                        onChange = {(e) => {setInfoUsuario({...infoUsuario, apellidos: e.target.value})}}
                        
                        /></td>
                    <td><input type='text' name='edad' value={infoUsuario.edad} 
                        onChange = {(e) => {setInfoUsuario({...infoUsuario, edad: e.target.value})}}
                        
                        /></td>
                    <td><input type='text' name='identificacion' value={infoUsuario.identificacion} 
                        onChange = {(e) => {setInfoUsuario({...infoUsuario, identificacion: e.target.value})}}
                        
                        /></td>
                    <td><input type='text' name='nacionalidad' value={infoUsuario.nacionalidad} 
                        onChange = {(e) => {setInfoUsuario({...infoUsuario, nacionalidad: e.target.value})}}
                        
                        /></td>
                    <td><input type='email' name='email' value={infoUsuario.email} 
                        onChange = {(e) => {setInfoUsuario({...infoUsuario, email: e.target.value})}}
                        
                        /></td>
                 </>
              :  <>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.apellidos}</td>
                    <td>{usuario.edad}</td>
                    <td>{usuario.identificacion}</td>
                    <td>{usuario.nacionalidad}</td>
                    <td>{usuario.email}</td>
                 </>
        }
        
          {
            edit ? <td>
                    <i className='fas fa-check' onClick={actualizarUsuario}/>
                    <i className="fas fa-window-close" onClick={() =>setEdit(!edit)} />
                  </td>
                : 
                  
                    <td>
                      <i className='fas fa-pencil-alt'  onClick={() =>setEdit(!edit)} />
                      <i className='fas fa-trash' onClick={eliminarUsuario} />
                    </td>
                  
          }
          
        
      </tr>
    )
  }
  
const FormularioUsuario = ({funcionCambiarPagina, listaUsuarios, funcAgregar}) => {
  

    const formul = useRef(null);
  
    const pruebaSubmit = async(e)=>{
      e.preventDefault();
      const presul = new FormData(formul.current);
      const nuevoUsuario = {};
      presul.forEach((value, key) => {
        nuevoUsuario[key] = value
      });
  
      const options = {
        method: 'POST',
        url: 'http://localhost:3006/enviar-datos',
        headers: {'Content-Type': 'application/json'},
        data: {nombre: nuevoUsuario.nombre, apellidos: nuevoUsuario.apellidos, edad: nuevoUsuario.edad, identificacion: nuevoUsuario.identificacion, nacionalidad:nuevoUsuario.nacionalidad, email:nuevoUsuario.email}
      };
  
      await axios.request(options).then(function (response) {
        toast.success("Se agrego con exito.")
      }).catch(function (error) {
        toast.error("No se agrego con exito.")
      });
      funcionCambiarPagina(true)
  
    }
    
    return (
      <center>
        <div className="card bg-dark text-white">
        <div className="card-header">Crear un Usuario</div>
        <div className="card-body ">
    
        <form ref={formul} onSubmit={pruebaSubmit} >

            <div className="form-group row">
            <label htmlFor="nombre" className="col-form-label col-sm-2">Nombre</label>
            <div className="col-sm-6">
                <input type="text" className="form-control"  name="nombre" required />
            </div>
            </div>
    
            <div className="form-group row">
            <label htmlFor="apellidos" className="col-form-label col-sm-2">Apellidos</label>
            <div className="col-sm-6">
                <input type="text" className="form-control"  name="apellidos" required />
            </div>
            </div>

            <div className="form-group row">
            <label htmlFor="edad" className="col-form-label col-sm-2">Edad</label>
            <div className="col-sm-6">
                <input type="number" className="form-control"  name="edad" required />
            </div>
            </div>
    
            <div className="form-group row">
            <label htmlFor="identificacion" className="col-form-label col-sm-2">Identificacion</label>
            <div className="col-sm-6">
                <input type="number" className="form-control"  name="identificacion" required />
            </div>
            </div>

            <div className="form-group row">
            <label htmlFor="nacionalidad" className="col-form-label col-sm-2">Nacionalidad</label>
            <div className="col-sm-6">
                <input type="text" className="form-control"  name="nacionalidad" required />
            </div>
            </div>

            <div className="form-group row">
            <label htmlFor="email" className="col-form-label col-sm-2">Email</label>
            <div className="col-sm-6">
                <input type="email" className="form-control"  name="email" required />
            </div>
            </div>

    
            <div className="form-group row">
            <div className="col-sm-6">
                <input  type="submit" className="btn btn-primary mt-4"  value="Crear Usuario" />
            </div>
            </div>
        </form>
    
        </div>
        </div>
      </center>
    );
  
}


export default Usuario
