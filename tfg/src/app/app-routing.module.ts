import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ContactoComponent } from './contacto/contacto.component';
import { SpellsComponent } from './wiki/spells/view_spells/spells.component';
import { MonstersComponent } from './wiki/monsters/view_monsters/monsters.component';
import { RacesComponent } from './wiki/races/races/races.component';
import { RaceComponent } from './wiki/races/race/race/race.component';
import { DicesComponent } from './tools/dices/dices/dices.component';
const routes: Routes = [
  {path:'home', component: InicioComponent},
  {path:'contact', component: ContactoComponent},
  {path:'spells', component: SpellsComponent},
  {path:'monsters', component: MonstersComponent},
  {path:'races', component: RacesComponent},
  {path:'races/:raceSlug', component: RaceComponent},
  {path:'dices', component: DicesComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
