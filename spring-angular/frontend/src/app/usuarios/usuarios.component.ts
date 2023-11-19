import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.usuarioService.getUsuarios().subscribe(
      usuarios => this.usuarios = usuarios
    );
  }

  delete(usuario: Usuario): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que desea eliminar al usuario ${usuario.nombre} ${usuario.apellidos}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.delete(usuario.id).subscribe(
          () => {
            this.usuarios = this.usuarios.filter(cli => cli !== usuario);
            Swal.fire(
              'Usuario Eliminado',
              `Usuario ${usuario.nombre} eliminado con éxito`,
              'success'
            );
          },
          (error) => {
            Swal.fire(
              'Error',
              'Ocurrió un error al eliminar el usuario',
              'error'
            );
          }
        );
      }
    });
  }

}
