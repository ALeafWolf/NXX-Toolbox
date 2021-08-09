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
import { CardListComponent } from './card-list/card-list.component';
import { SkillDetailComponent } from './skill-detail/skill-detail.component';
import { CardPoolHistoryComponent } from './card-pool-history/card-pool-history.component';
import { CardRssCalculatorComponent } from './card-rss-calculator/card-rss-calculator.component';
import { MerchListComponent } from './merch-list/merch-list.component';
import { MerchDetailComponent } from './merch-detail/merch-detail.component';
import { RealmAuthGuard } from './realm-auth-guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'card-calculator',
    component: CardCalculatorComponent,
  },
  {
    path: 'cards',
    component: CardListComponent,
    canActivate: [ RealmAuthGuard ]
  },
  {
    path: 'skills',
    component: SkillListComponent,
    canActivate: [ RealmAuthGuard ]
  },
  {
    path: 'skill/:name',
    component: SkillDetailComponent,
  },
  {
    path: 'card-selection',
    component: CardSelectionComponent,
    canActivate: [ RealmAuthGuard ]
  },
  {
    path: 'card-value',
    component: CardValueComponent,
    canActivate: [ RealmAuthGuard ]
  },
  {
    path: 'card-value-setting',
    component: CardValueSettingComponent,
    canActivate: [ RealmAuthGuard ]
  },
  // {
  //   path: 'card-value/:charname/:id',
  //   component: CardValueComponent,
  // },
  // {
  //   path: 'card-value-setting/:charname/:id',
  //   component: CardValueSettingComponent,
  // },
  {
    path: 'other',
    component: OtherComponent,
  },
  {
    path: 'vision-history',
    component: CardPoolHistoryComponent,
  },
  {
    path: 'card-rss-calculator',
    component: CardRssCalculatorComponent,
  },
  {
    path: 'merch-list',
    component: MerchListComponent,
    canActivate: [ RealmAuthGuard ]
  },
  {
    path: 'merch-detail/:name',
    component: MerchDetailComponent,
    canActivate: [ RealmAuthGuard ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: {
      title: '404',
      description: '',
      ogTitle: '',
      twitterTitle: ''
    }
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
