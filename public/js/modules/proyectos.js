import Swal from "sweetalert2";
import axios from "axios";

const btnEliminar = document.querySelector('#eliminar-proyecto');

if(btnEliminar) {
    btnEliminar.addEventListener('click', e => {
      const urlProyecto = e.target.dataset.proyectoUrl;
      //console.log(urlProyecto);

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
            // Enviar peticion a axios
            const url = `${location.origin}/proyectos/${urlProyecto}`;

            axios.delete(url, { params: {urlProyecto} })
                .then(function(res){
                    console.log(res);

                        Swal.fire(
                          'Eliminado!',
                          res.data,
                          'success'
                        );
            
                        // redireccionar al inicio
                        setTimeout(() => {
                            window.location.href = '/'
                        }, 3000);
                })
                .catch(() => {
                  Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error',
                    text: 'No se pudo eliminar el proyecto'
                  });
                });
            }
        });
    });
}

export default btnEliminar;
