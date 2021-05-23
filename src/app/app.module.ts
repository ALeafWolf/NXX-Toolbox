import { NgModule } from '@angular/core';
import { BrowserModule, Meta } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { CardSelectionComponent } from './card-selection/card-selection.component';
import { CardValueSettingComponent } from './card-value-setting/card-value-setting.component';
import { SiteNavBarComponent } from './site-nav-bar/site-nav-bar.component';
import { SiteFooterComponent } from './site-footer/site-footer.component';
import { HomeComponent } from './site-home/site-home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SkillListComponent } from './skill-list/skill-list.component';
import { CardValueComponent } from './card-value/card-value.component';
import { CardCalculatorComponent } from './card-calculator/card-calculator.component';
import { OtherComponent } from './other/other.component';
import { CardListComponent } from './card-list/card-list.component';
import { SkillDetailComponent } from './skill-detail/skill-detail.component';
import { CardPoolHistoryComponent } from './card-pool-history/card-pool-history.component';
import { CardRssCalculatorComponent } from './card-rss-calculator/card-rss-calculator.component';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

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
    CardValueComponent,
    CardCalculatorComponent,
    OtherComponent,
    CardListComponent,
    SkillDetailComponent,
    CardPoolHistoryComponent,
    CardRssCalculatorComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatRadioModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule
  ],
  providers: [Meta],
  bootstrap: [AppComponent]
})
export class AppModule { }
