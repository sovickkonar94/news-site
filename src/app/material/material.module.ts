import { NgModule } from '@angular/core';
import { MatButtonModule  } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';

const materialComponents = [
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatToolbarModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatDatepickerModule,
  MatCheckboxModule
]

@NgModule({
  imports:  [materialComponents],
  exports : [materialComponents]

})
export class MaterialModule { }
