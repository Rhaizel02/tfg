import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ContactoComponent } from './contacto/contacto.component';
import { SpellsComponent } from './wiki/spells/view_spells/spells.component';
import { MonstersComponent } from './wiki/monsters/view_monsters/monsters.component';
import { RacesComponent } from './wiki/races/view_races/races.component';
import { RaceComponent } from './wiki/races/race/race/race.component';
import { DicesComponent } from './tools/dices/dices/dices.component';
import { RulesComponent } from './wiki/rules/view_rules/rules/rules.component';
import { RuleComponent } from './wiki/rules/rule/rule/rule.component';
import { BackgroundsComponent } from './wiki/character/backgrounds/backgrounds.component';
const routes: Routes = [
  {path:'home', component: InicioComponent},
  {path:'contact', component: ContactoComponent},
  {path:'spells', component: SpellsComponent},
  {path:'monsters', component: MonstersComponent},
  {path:'races', component: RacesComponent},
  {path:'races/:raceSlug', component: RaceComponent},
  {path:'rules', component: RulesComponent},
  {path:'rules/:ruleSlug', component: RuleComponent},
  {path:'dices', component: DicesComponent},
  {path:'backgrounds', component: BackgroundsComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
