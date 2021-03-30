import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './site-home/site-home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SkillListComponent } from './skill-list/skill-list.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'skills', component: SkillListComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
