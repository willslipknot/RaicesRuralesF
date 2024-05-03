import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../assets/css/Actividades.css';
import NavBar from '../components/Home/NavBar.jsx';
import { useActs } from '../context/actContext';
import ActCard from '../components/UserLog/ActCard'

const opciones = [
    { label: 'Estadia', value: 'cdca80ef-6f8d-478b-94f1-80e1e67da46d' },
    { label: 'Alimentacion', value: '35a0e8e0-728c-4712-81fd-1df805a0e294' },
    { label: 'Actividad', value: '859a6b07-ecd9-4c13-bc1c-6894d8fb0520' },
];

const colores = ['#FFC0CB', '#DDA0DD', '#7B68EE', '#7FFFD4', '#90EE90'];

function Actividades() {
    const { register, handleSubmit, reset, watch  } = useForm();
    const { createActs, getActs, acts } = useActs();
    const [tip, setTip] = useState('');
    const [file, setFile] = useState(null);
    const [nombreArchivo, setNombreArchivo] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleTipoChange = (e) => {
        setTip(e.target.value);
    };

    const handleImagenChange = (e) => {
        setFile(e.target.files[0])
    }

    const onSubmit = handleSubmit((data) => {
        if (!file) {
            alert('Debes subir un archivo')
            return
        }

        const formData = new FormData();
        formData.append('nombre', data.nombre);
        formData.append('coordenadasX', data.coordenadasX);
        formData.append('coordenadasY', data.coordenadasY);
        formData.append('hora_inicio', data.hora_inicio);
        formData.append('hora_fin', data.hora_fin);
        formData.append('descripcion', data.descripcion);
        formData.append('tipo', data.tipo);
        formData.append('imagen', file);

        console.log("Datos del formulario:", data);
        
        createActs(formData);

        setMensaje('Actividad creada exitosamente');
        reset();
        window.location.reload();


        setTimeout(() => {
            setMensaje('');
        }, 3000);

        window.location.reload();
    });

    const handleLimpiarClick = () => {
        reset();
        setMensaje('');

    };

    useEffect(() => {
        getActs()
    }, [])

    return (
        <div className="actividad-container">
            <NavBar />
            <div className="actividad-buttons">
                <button onClick={handleOpenModal}>Crear Actividad</button>
            </div>
            <div className="actividad-content">
            <div className='cards'>{
                acts.map((act, index) => (
                    <ActCard key={act.id} act={act} color={colores[index % colores.length]} />
                ))}
                </div>
                {modalOpen && (
                    <div className="modal" onClick={handleCloseModal}>
                        <div className="actividad-form" onClick={(e) => e.stopPropagation()}>
                            <form onSubmit={onSubmit} className='actividad' >

                                <div className="form-group">
                                    <label htmlFor="nombre">Nombre</label>
                                    <input type="text" className='formulario' {...register("nombre", { required: true })} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="direccion">Coordenada X</label>
                                    <input type="text" className='formulario' {...register("coordenadasX", { required: true })} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="direccion">Coordenada Y</label>
                                    <input type="text" className='formulario' {...register("coordenadasY", { required: true })} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="direccion">Hora Inicio</label>
                                    <input type="time" className='formulario' {...register("hora_inicio", { required: true })} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="direccion">Hora Final</label>
                                    <input type="time" className='formulario' {...register("hora_fin", { required: true })} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="descripcion">Descripcion</label>
                                    <textarea className="area" rows="3" {...register("descripcion", { required: true })} ></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="tipo">Tipo</label>&nbsp;&nbsp;
                                    <select {...register('tipo', { required: true })} onChange={handleTipoChange} type="text" className='formulario-tipo' >
                                        <option value="">Selecciona un tipo</option>
                                        {opciones.map((opcion) => (
                                            <option key={opcion.value} value={opcion.value}>
                                                {opcion.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group-image">
                                    <input id='inputFile' type="file" onChange={handleImagenChange} className='formulario1' />
                                    <input type="text" value={nombreArchivo} hidden className='formulario' {...register("imagen")} />
                                </div>

                                <div className="form-group">
                                    <button type='submit'>Crear</button>
                                    <button type='button' onClick={handleLimpiarClick}>Limpiar</button>
                                </div>

                                {mensaje && <div className="mensaje">{mensaje}</div>}
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Actividades;
