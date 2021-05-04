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

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: {
      title: '主页',
      description: '',
      ogTitle: '',
      twitterTitle: ''
    }
  },
  {
    path: 'card-calculator',
    component: CardCalculatorComponent,
    data: {
      title: '战力计算器',
      description: '',
      ogTitle: '',
      twitterTitle: ''
    }
  },
  {
    path: 'cards',
    component: CardListComponent,
    data: {
      title: '思绪索引',
      description: '',
      ogTitle: '',
      twitterTitle: ''
    }
  },
  {
    path: 'skills',
    component: SkillListComponent,
    data: {
      title: '技能索引',
      description: '',
      ogTitle: '',
      twitterTitle: ''
    }
  },
  {
    path: 'skill/:name',
    component: SkillDetailComponent,
    data: {
      title: '主页',
      description: '',
      ogTitle: '',
      twitterTitle: ''
    }
  },
  {
    path: 'card-selection',
    component: CardSelectionComponent,
    data: {
      title: '主页',
      description: '',
      ogTitle: '',
      twitterTitle: ''
    }
  },
  {
    path: 'card-value/:charname/:id',
    component: CardValueComponent,
    data: {
      title: '主页',
      description: '',
      ogTitle: '',
      twitterTitle: ''
    }
  },
  {
    path: 'card-value-setting/:charname/:id',
    component: CardValueSettingComponent,
    data: {
      title: '主页',
      description: '',
      ogTitle: '',
      twitterTitle: ''
    }
  },
  {
    path: 'other',
    component: OtherComponent,
    data: {
      title: '主页',
      description: '',
      ogTitle: '',
      twitterTitle: ''
    }
  },
  {
    path: 'card-pool-history',
    component: CardPoolHistoryComponent,
    data: {
      title: '主页',
      description: '',
      ogTitle: '',
      twitterTitle: ''
    }
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
