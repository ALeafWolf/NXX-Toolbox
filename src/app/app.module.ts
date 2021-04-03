import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CardSelectionComponent } from './card-selection/card-selection.component';
import { CardValueSettingComponent } from './card-value-setting/card-value-setting.component';
import { SiteNavBarComponent } from './site-nav-bar/site-nav-bar.component';
import { SiteFooterComponent } from './site-footer/site-footer.component';
import { HomeComponent } from './site-home/site-home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SkillListComponent } from './skill-list/skill-list.component';
import { CardValueComponent } from './card-value/card-value.component';

@NgModule({
  declarations: [
    AppComponent,
    CardSelectionComponent,
    CardValueSettingComponent,
    SiteNavBarComponent,
    SiteFooterComponent,
    HomeComponent,
    PageNotFoundComponent,
    SkillListComponent,
    CardValueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
