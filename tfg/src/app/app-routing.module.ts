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
import { BackgroundsComponent } from './wiki/character/backgrounds/view_backgrounds/backgrounds.component';
import { BackgroundComponent } from './wiki/character/backgrounds/background/background.component';
import { FeatsComponent } from './wiki/character/feats/view_feats/feats.component';
import { ClassesComponent } from './wiki/character/classes/view_classes/classes/classes.component';
import { ClassComponent } from './wiki/character/classes/class/class.component';
import { SubclassComponent } from './wiki/character/classes/subclass/subclass.component';
import { TrackerComponent } from './tools/tracker/tracker.component';
import { EncounterCalculatorComponent } from './tools/encounter-calculator/encounter-calculator.component';
const routes: Routes = [
  {path:'home', component: InicioComponent},
  {path:'contact', component: ContactoComponent},
  {path:'spells', component: SpellsComponent},
  {path:'monsters', component: MonstersComponent},
  {path:'races', component: RacesComponent},
  {path:'races/:raceSlug', component: RaceComponent},
  {path:'rules', component: RulesComponent},
  {path:'rules/:ruleSlug', component: RuleComponent},
  {path:'classes', component: ClassesComponent},
  {path:'classes/:classSlug', component: ClassComponent},
  {path:'backgrounds', component: BackgroundsComponent},
  {path:'classes/:classSlug/:subclassSlug', component: SubclassComponent},
  {path:'backgrounds/:backgroundSlug', component: BackgroundComponent},
  {path:'feats', component: FeatsComponent},
  {path:'dices', component: DicesComponent},
  {path:'tracker', component: TrackerComponent},
  {path:'encounter-calculator', component: EncounterCalculatorComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
