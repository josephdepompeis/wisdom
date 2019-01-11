import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';

import { RoutingModule } from './routing.module';
import { SharedModule } from './shared/shared.module';
import { CharacterService } from './services/character.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { AppComponent } from './app.component';
import { CharactersComponent } from './characters/characters.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OpponentsComponent } from './opponents/opponents.component';
import { OpponentService } from './services/opponent.service';
import { MatchService } from './services/match.service';
import { MatchesComponent } from './matches/matches.component';
import { OpponentNotesComponent } from './opponentNotes/opponentNotes.component';
import { OpponentNoteService } from './services/opponentNote.service';
import { MatchNotesComponent } from './matchNotes/MatchNotes.component';
import { MatchNoteService } from './services/matchNote.service';
import { TierListComponent } from './tier-list/tier-list.component';
import { TierListService } from './services/tier-list.service';




// UI componenotes
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import {DragDropModule} from 'primeng/dragdrop';
import {PanelModule} from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CardModule} from 'primeng/card';
import { MatchNoteSectionComponent } from './match-note-section/match-note-section.component';

BrowserAnimationsModule


export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    CharactersComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    AccountComponent,
    AdminComponent,
    NotFoundComponent,
    OpponentsComponent,
    OpponentNotesComponent,
    MatchesComponent,
    MatchNotesComponent,
    TierListComponent,
    MatchNoteSectionComponent,
  ],
  imports: [
    RoutingModule,
    SharedModule,

    //ui components
    TableModule,
    ButtonModule,
    DragDropModule,
    PanelModule,
    BrowserAnimationsModule,
    CardModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        // whitelistedDomains: ['localhost:3000', 'localhost:4200']
      }
    })
  ],
  providers: [
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    CharacterService,
    UserService,
    OpponentService,
    OpponentNoteService,
    MatchService,
    MatchNoteService,
    TierListService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
