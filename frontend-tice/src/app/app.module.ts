import { BrowserModule } from '@angular/platform-browser';

// Modulos
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { DialogsModule } from './dialogs/dialogs.module';

import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ComponentsModule } from './components/components.module';
//import { DialogVehicleComponent } from './dialogs/dialog-vehicle/dialog-vehicle.component';


@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
    //DialogVehicleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    DialogsModule,
    ComponentsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
