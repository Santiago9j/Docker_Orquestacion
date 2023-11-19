import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioService } from './usuarios/usuario.service';
import { RouterModule, Routes} from '@angular/router';
import { FormComponent } from './usuarios/form.component';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';


const routes: Routes = [
  {path: '', redirectTo: '/usuarios', pathMatch: 'full'},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'usuarios/form', component: FormComponent},
  {path: 'usuarios/form/:id', component: FormComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
