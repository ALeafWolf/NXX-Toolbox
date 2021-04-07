import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './site-home/site-home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CardCalculatorComponent } from './card-calculator/card-calculator.component';
import { SkillListComponent } from './skill-list/skill-list.component';
import { CardSelectionComponent } from './card-selection/card-selection.component';
import { CardValueComponent } from './card-value/card-value.component';
import { CardValueSettingComponent } from './card-value-setting/card-value-setting.component';
import { OtherComponent } from './other/other.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'card-calculator', component: CardCalculatorComponent},
  {path: 'skills', component: SkillListComponent},
  {path: 'card-selection', component: CardSelectionComponent},
  {
    path: 'card-value/:charname/:id', 
    component: CardValueComponent
  },
  {
    path: 'card-value-setting/:charname/:id', 
    component: CardValueSettingComponent
  },
  {path: 'other', component: OtherComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
