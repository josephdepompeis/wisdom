import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastComponent } from '../shared/toast/toast.component';
import { Opponent } from '../shared/models/opponent.model';
import { OpponentService } from '../services/opponent.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-opponents',
  templateUrl: './opponents.component.html',
  styleUrls: ['./opponents.component.css']
})
export class OpponentsComponent implements OnInit {

    opponent = new Opponent();
    opponents: Opponent[] = [];
    isLoading: boolean = true;
    isEditing: boolean = false;
    isSelected: boolean = false;
    selectedOpponent: Opponent;
    opponentNoteFlag: boolean;
    addOpponentForm: FormGroup;
    displayOpponentForm:boolean;

    name = new FormControl('', Validators.required);
    age = new FormControl('', Validators.required);
    weight = new FormControl('', Validators.required);

    constructor(
      private opponentService: OpponentService,
      private formBuilder: FormBuilder,
      public toast: ToastComponent,
      private auth: AuthService,
  ) { }
  
  ngOnInit() {
    this.getOpponents();
    this.addOpponentForm = this.formBuilder.group({
      name: this.name,
      age: this.age,
      weight: this.weight,
      userId: this.auth.currentUser._id,
    });
  }

  getOpponents() {
    this.opponentService.getOpponents(this.auth.currentUser).subscribe(
      data => this.opponents = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addOpponent() {
    this.opponentService.addOpponent(this.addOpponentForm.value).subscribe(
      res => {
        this.opponents.push(res);
        this.addOpponentForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(opponent: Opponent) {
    this.isEditing = true;
    this.opponent = opponent;
  }

  newOpponentNote(opponent: Opponent) {
    this.selectOpponent(opponent);
    //this is redundent and probably will be re-thought.
  }

  selectOpponent(opponent: Opponent) {
    this.selectedOpponent = opponent;
  }

  deselectOpponent(opponent: Opponent) {
    this.selectedOpponent = null;
    console.log("this.selectedOpponent", this.selectedOpponent);
  }

  displayAddNewOpponentForm() {
    this.displayOpponentForm = true;
  }

  hideAddNewOpponentForm() {
    this.displayOpponentForm = false;
    this.addOpponentForm.reset();
  }

  cancelEditing() {
    this.isEditing = false;
    this.opponent = new Opponent();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the opponents to reset the editing
    this.getOpponents();
  }

  editOpponent(opponent: Opponent) {
    this.opponentService.editOpponent(opponent).subscribe(
      () => {
        this.isEditing = false;
        this.opponent = opponent;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteOpponent(opponent: Opponent) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.opponentService.deleteOpponent(opponent).subscribe(
        () => {
          const pos = this.opponents.map(elem => elem._id).indexOf(opponent._id);
          this.opponents.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
