import axios from "axios";
import Swal from "sweetalert2";

import {actualizarAvance} from '../funciones/avance';

const tareas = document.querySelector('.listado-pendientes')

if(tareas) {
    tareas.addEventListener('click', e => {
        if(e.target.classList.contains('fa-check-circle')) {
            const icono = e.target;
            const idTarea = icono.parentElement.parentElement.dataset.tarea;

            // req hacia /tarea/:id
            const url = `${location.origin}/tareas/${idTarea}`;

            axios.patch(url, { idTarea })
                .then(function(res) {
                    if(res.status === 200) {
                        icono.classList.toggle('completo')

                        actualizarAvance();
                    }
                });
        }

        if(e.target.classList.contains('fa-trash')) {
    
            const tareaHTMl = e.target.parentElement.parentElement, 
                  idTarea = tareaHTMl.dataset.tarea;
                  Swal.fire({
                    title: '¿Estás seguro?',
                    text: "No serás capaz de revetir este proceso",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, eliminar!',
                    cancelButtonText: 'No, cancelar '
                  }).then((result) => {
                    if (result.value) {
                        const url = `${location.origin}/tareas/${idTarea}`;
                        // enviar el delete por medio de axios

                        axios.delete(url, {params: { idTarea }})
                            .then(function(res) {
                                if(res.status === 200) {
                                    //console.log(res);
                                    // Eliminar el nodo 
                                    tareaHTMl.parentElement.removeChild(tareaHTMl);

                                    // Opcional alerta
                                    Swal.fire(
                                        'Tarea eliminada',
                                        res.data,
                                        'success'
                                    );

                                    actualizarAvance();
                                }
                            });
                    }
                });
        }
    });
}


export default tareas;