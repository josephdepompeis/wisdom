import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastComponent } from '../shared/toast/toast.component';
import { OpponentNote } from '../shared/models/opponentNote.model';
// import { OpponentService } from '../services/opponent.service';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-opponent-notes',
  templateUrl: './opponentNotes.component.html',
  styleUrls: ['./opponentNotes.component.css']
})
export class OpponentNotesComponent implements OnInit {

    opponentNote = new OpponentNote();
    opponentNotes: OpponentNote[] = [];
    isLoading = true;
    isEditing = false;
    user: User;

    addOpponentNoteForm: FormGroup;
    body = new FormControl('', Validators.required);
    // age = new FormControl('', Validators.required);
    // weight = new FormControl('', Validators.required);

    constructor(
                // private opponentService: OpponentService,
                private formBuilder: FormBuilder,
                public toast: ToastComponent,
                private auth: AuthService,

                ) { }

  ngOnInit() {
      // console.log("this.auth.currentUser", this.auth.currentUser);

    this.getOpponentNotes();
    this.addOpponentNoteForm = this.formBuilder.group({
      name: this.body,
      // age: this.age,
      // weight: this.weight,


      // opponentId: th,
    });
  }

  getOpponentNotes() {
    // this.opponentService.getOpponents(this.auth.currentUser).subscribe(
    //   data => this.opponents = data,
    //   error => console.log(error),
    //   () => this.isLoading = false
    // );
  }

  // addOpponent() {
  //   this.opponentService.addOpponent(this.addOpponentForm.value).subscribe(
  //     res => {
  //       this.opponents.push(res);
  //       this.addOpponentForm.reset();
  //       this.toast.setMessage('item added successfully.', 'success');
  //     },
  //     error => console.log(error)
  //   );
  // }
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
