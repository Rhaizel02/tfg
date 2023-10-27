import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ContactoComponent } from './contacto/contacto.component';
import { HechizosComponent } from './hechizos/hechizos.component';
import { MonstruosComponent } from './monstruos/monstruos.component';

const routes: Routes = [
  {path:'home', component: InicioComponent},
  {path:'contact', component: ContactoComponent},
  {path:'spells', component: HechizosComponent},
  {path:'monsters', component: MonstruosComponent},
  {path: '', redirectTo: '/inicio', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
