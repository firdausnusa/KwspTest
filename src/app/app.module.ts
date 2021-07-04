import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContentComponent } from './components/content/content.component';
import { MatTableModule } from '@angular/material/table';
import { LocationTableComponent } from './components/location-table/location-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { FilterModalComponent } from './components/filter-modal/filter-modal.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { LocationModalComponent } from './components/location-modal/location-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    ContentComponent,
    LocationTableComponent,
    FilterModalComponent,
    LocationModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatCheckboxModule,
    MatDividerModule,
    FormsModule,
    MatButtonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC2uT4gup0rmQYdKNu6VpOAnx9tLZKJH4k',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
