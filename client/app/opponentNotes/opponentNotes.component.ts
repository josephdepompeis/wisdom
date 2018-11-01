import { Component, OnInit, Input, OnChanges,  SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastComponent } from '../shared/toast/toast.component';
import { OpponentNote } from '../shared/models/opponentNote.model';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/models/user.model';
import { OpponentNoteService } from '../services/opponentNote.service';
import { Opponent } from '../shared/models/opponent.model';

@Component({
  selector: 'app-opponent-notes',
  templateUrl: './opponentNotes.component.html',
  styleUrls: ['./opponentNotes.component.css']
})
export class OpponentNotesComponent implements OnInit, OnChanges {
    @Input() opponent: Opponent;
    opponentNote = new OpponentNote();
    opponentNotes: OpponentNote[] = [];
    isOpponentNotesLoading = true;
    isEditing = false;
    user: User;

    addOpponentNoteForm: FormGroup;
    body = new FormControl('', Validators.required);

    constructor(
                private opponentNoteService: OpponentNoteService,
                private formBuilder: FormBuilder,
                public toast: ToastComponent,
                // private auth: AuthService,
                ) { }

  ngOnChanges(opponent:  SimpleChanges) {
    this.setFormDefualts();
    this.getOpponentNotes();
  }

  ngOnInit() {
    console.log("opponent", this.opponent);
    console.log("opponent", this.body);
    this.getOpponentNotes();
    this.setFormDefualts();
  }

  setFormDefualts() {
    this.addOpponentNoteForm = this.formBuilder.group({
      body: this.body,
      opponentId: this.opponent._id,
    });
  }

  getOpponentNotes() {
    this.isOpponentNotesLoading = true;
    this.opponentNoteService.getOpponentNotes(this.opponent).subscribe(
      res => {
        console.log("res", res);
        this.isOpponentNotesLoading = false;
        this.opponentNotes = res
      },
      error => {
        this.isOpponentNotesLoading = false;
        console.log(error);
      }
    );
  }

  addOpponentNote() {
    this.isOpponentNotesLoading = true;
    this.opponentNoteService.addOpponentNote(this.addOpponentNoteForm.value).subscribe(
      res => {

        this.getOpponentNotes();

        // // this is shortcut, we could call the get notes list again. not sure which is better atm.
        // this.opponentNotes.push(res);

        this.addOpponentNoteForm.reset();
        this.setFormDefualts();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => {
        this.isOpponentNotesLoading = true;
        console.log(error)
      }
    );
  }

  deleteOpponentNote(opponentNote: OpponentNote) {
    this.isOpponentNotesLoading = true;
    this.opponentNoteService.deleteOpponentNote(opponentNote).subscribe(
      res => {
        this.getOpponentNotes();
        this.toast.setMessage('item deleted successfully.', 'success');
      },
      error => {
        this.isOpponentNotesLoading = true;
        console.log(error)
      }
    );
  }


  //
  // enableEditing(opponent: Opponent) {
  //   this.isEditing = true;
  //   this.opponent = opponent;
  // }
  //
  // cancelEditing() {
  //   this.isEditing = false;
  //   this.opponent = new Opponent();
  //   this.toast.setMessage('item editing cancelled.', 'warning');
  //   // reload the opponents to reset the editing
  //   this.getOpponents();
  // }
  //
  // editOpponent(opponent: Opponent) {
  //   this.opponentService.editOpponent(opponent).subscribe(
  //     () => {
  //       this.isEditing = false;
  //       this.opponent = opponent;
  //       this.toast.setMessage('item edited successfully.', 'success');
  //     },
  //     error => console.log(error)
  //   );
  // }
  //
  // deleteOpponent(opponent: Opponent) {
  //   if (window.confirm('Are you sure you want to permanently delete this item?')) {
  //     this.opponentService.deleteOpponent(opponent).subscribe(
  //       () => {
  //         const pos = this.opponents.map(elem => elem._id).indexOf(opponent._id);
  //         this.opponents.splice(pos, 1);
  //         this.toast.setMessage('item deleted successfully.', 'success');
  //       },
  //       error => console.log(error)
  //     );
  //   }
  // }

}
