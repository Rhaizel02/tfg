import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http'
import { MenuComponent } from './menu/menu.component';
import { HechizosComponent } from './hechizos/hechizos.component';
import { MatMenuModule } from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { FormsModule } from '@angular/forms'; 
import {MatTableModule} from '@angular/material/table';
import {MatSortModule, Sort} from '@angular/material/sort';




@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HechizosComponent,
    CabeceraComponent,

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

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
