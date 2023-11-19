import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import Swal from 'sweetalert2'
import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public usuario: Usuario = new Usuario()
  public titulo:string = "Crear Usuario"

  constructor(private usuarioService: UsuarioService,
  private router: Router,
  private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.cargarCliente()
    }

  cargarCliente(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.usuarioService.getUsuario(id).subscribe( (usuario) => this.usuario = usuario)
      }
    })
  }

  create(): void {
    this.usuarioService.create(this.usuario)
      .subscribe(cliente => {
        this.router.navigate(['/usuarios'])
        Swal.fire('Nuevo usuario', `Usuario ${cliente.nombre} creado con éxito!`, 'success')
      }
      );
  }

  update():void{
    this.usuarioService.update(this.usuario)
    .subscribe( cliente => {
      this.router.navigate(['/usuarios'])
      Swal.fire('Usuario Actualizado', `Usuario ${cliente.nombre} actualizado con éxito!`, 'success')
    }

    )
  }

}