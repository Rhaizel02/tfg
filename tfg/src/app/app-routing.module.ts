import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ContactoComponent } from './contacto/contacto.component';
import { HechizosComponent } from './wiki/spells/hechizos/hechizos.component';
import { MonstruosComponent } from './wiki/monsters/monstruos/monstruos.component';

const routes: Routes = [
  {path:'home', component: InicioComponent},
  {path:'contact', component: ContactoComponent},
  {path:'spells', component: HechizosComponent},
  {path:'monsters', component: MonstruosComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
