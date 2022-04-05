import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ClipboardModule } from 'ngx-clipboard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { SkillsComponent } from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DonateComponent } from './donate/donate.component';
import { BackgroundComponent } from './background/background.component';
import { MenuComponentComponent } from './menu-component/menu-component.component';
import { ListReflectorComponent } from './list-reflector/list-reflector.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { SkillsItemComponent } from './skills-item/skills-item.component';
import { ProjectItemInListComponent } from './project-item-in-list/project-item-in-list.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutMeComponent,
    SkillsComponent,
    ProjectsComponent,
    ContactsComponent,
    DonateComponent,
    BackgroundComponent,
    MenuComponentComponent,
    ListReflectorComponent,
    MainMenuComponent,
    SkillsItemComponent,
    ProjectItemInListComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClipboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
