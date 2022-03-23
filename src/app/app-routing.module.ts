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
import { SiteUpdateLogComponent } from './site-update-log/site-update-log.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'card-calculator',
    component: CardCalculatorComponent,
  },
  {
    path: 'cards',
    component: CardListComponent,
  },
  {
    path: 'skills',
    component: SkillListComponent,
  }, 
  {
    path: 'skill',
    component: SkillDetailComponent,
  },
  {
    path: 'card-selection',
    component: CardSelectionComponent,
  },
  {
    path: 'card-value',
    component: CardValueComponent,
  },
  {
    path: 'card-value-setting',
    component: CardValueSettingComponent,
  },
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
  },
  {
    path: 'update-log',
    component: SiteUpdateLogComponent,
  },
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
