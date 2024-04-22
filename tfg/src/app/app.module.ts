import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './menu/menu.component';
import { SpellsComponent } from './wiki/spells/view_spells/spells.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule} from '@angular/material/paginator';
import { DialogHechizoComponent } from './wiki/spells/dialog-hechizo/dialog-hechizo.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule} from '@angular/material/tooltip';
import { PieComponent } from './pie/pie.component';
import { MatTreeModule} from '@angular/material/tree';
import { MonstersComponent } from './wiki/monsters/view_monsters/monsters.component';
import { RacesComponent } from './wiki/races/view_races/races.component';
import { DialogmonsterComponent } from './wiki/monsters/dialog_monster/dialogmonster/dialogmonster.component';
import { MatCardModule} from '@angular/material/card';
import { MatGridListModule} from '@angular/material/grid-list';
import { RaceComponent } from './wiki/races/race/race/race.component';
import { MatListModule} from '@angular/material/list';
import { DicesComponent } from './tools/dices/dices/dices.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RulesComponent } from './wiki/rules/view_rules/rules/rules.component';
import { RuleComponent } from './wiki/rules/rule/rule/rule.component';
import { BackgroundsComponent } from './wiki/character/backgrounds/view_backgrounds/backgrounds.component';
import { FeatsComponent } from './wiki/character/feats/view_feats/feats.component';
import { BackgroundComponent } from './wiki/character/backgrounds/background/background.component';
import { ClassesComponent } from './wiki/character/classes/view_classes/classes/classes.component';
import { ClassComponent } from './wiki/character/classes/class/class.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { TrackerComponent } from './tools/tracker/tracker.component';
import { InicioComponent } from './inicio/inicio.component';
import { EncounterCalculatorComponent } from './tools/encounter-calculator/encounter-calculator.component';
import { ContactoComponent } from './contacto/contacto.component';
import { SubclassComponent } from './wiki/character/classes/subclass/subclass.component';
import { AddFriendModalComponent } from './user_components/modal/add-friend-modal/add-friend-modal.component';

// FIREBASE IMPORTATIONS
import { initializeApp, provideFirebaseApp, getApp} from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { enviroment } from 'src/enviroments/enviroment';

// AUTH SERVICE
import { AuthService } from './services/firebase_auth/auth.service';
import { LoginComponent } from './user_components/login/login.component';
import { RegisterComponent } from './user_components/register/register.component';
import { ForgotPassComponent } from './user_components/forgot-pass/forgot-pass.component';
import { UserProfileComponent } from './user_components/user-profile/user-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ContactoComponent,
    SpellsComponent,
    CabeceraComponent,
    DialogHechizoComponent,
    PieComponent,
    MonstersComponent,
    RacesComponent,
    DialogmonsterComponent,
    RaceComponent,
    DicesComponent,
    RulesComponent,
    RuleComponent,
    BackgroundsComponent,
    FeatsComponent,
    BackgroundComponent,
    ClassesComponent,
    ClassComponent,
    TrackerComponent,
    InicioComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPassComponent,
    UserProfileComponent,
    EncounterCalculatorComponent,
    SubclassComponent,
    AddFriendModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    MatProgressBarModule,
    MatDividerModule,
    MatIconModule,
    MatToolbarModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTooltipModule,
    MatTreeModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(enviroment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideAnalytics(() => getAnalytics()),
  ],
  providers: [
    ScreenTrackingService,
    UserTrackingService,
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
