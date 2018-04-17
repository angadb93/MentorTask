import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule,MatSnackBarModule, MatCheckboxModule, MatToolbarModule,MatInputModule,MatFormFieldModule,MatTabsModule,MatTableModule,
  MatIconModule,MatGridListModule,MatCardModule,MatSortModule, MatPaginatorModule,MatSelectModule, MatMenuModule,MatChipsModule,MatRadioModule,MatDatepickerModule} from '@angular/material';
  import {RouterModule, Route} from '@angular/router';
  import { HttpClientModule } from '@angular/common/http';
  import {FormsModule, ReactiveFormsModule} from '@angular/forms';
  import {DataService} from './data.service'
  import {MatDialogModule} from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ContactComponent } from './contact/contact.component';
import { UserlistComponent } from './userlist/userlist.component';
import { OpendialogComponent } from './opendialog/opendialog.component';
import { EditComponent } from './edit/edit.component';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { AboutComponent } from './about/about.component';
import { DeleteComponent } from './delete/delete.component';
// import {MatSortModule} from '@angular/material/sort';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    ContactComponent,
    UserlistComponent,
    OpendialogComponent,
    EditComponent,
    AddDialogComponent,
    AboutComponent,
    DeleteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
     ReactiveFormsModule,MatSortModule,MatDialogModule,
    HttpClientModule,
    MatSelectModule,
    HttpClientModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatCardModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatInputModule,
    MatGridListModule,
    MatFormFieldModule,
    MatTabsModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatMenuModule,
    MatChipsModule,
    
    MatRadioModule,
    MatDatepickerModule,
    RouterModule.forRoot([
      { path: "", redirectTo:"home", pathMatch:"full"},
      { path: "registration/login", redirectTo:"login", pathMatch:"full"},
      { path: 'home', component: HomeComponent },
      {path:'login', component:LoginComponent },
      {path:'registration', component:RegistrationComponent},
      {path:'contact', component:ContactComponent},
      {path:'userlist', component:UserlistComponent},
      {path:'about', component:AboutComponent},
    ])
  ],

  entryComponents:[OpendialogComponent, EditComponent, AddDialogComponent, DeleteComponent],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
