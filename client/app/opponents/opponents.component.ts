import { Component, OnInit, Angular } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastComponent } from '../shared/toast/toast.component';
import { Opponent } from '../shared/models/opponent.model';
import { OpponentService } from '../services/opponent.service';
import { AuthService } from '../services/auth.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-opponents',
  templateUrl: './opponents.component.html',
  styleUrls: ['./opponents.component.css']
})
export class OpponentsComponent implements OnInit {

    opponent = new Opponent();
    opponents: Opponent[] = [];
    isLoading: boolean = true;
    opponentBeingEdited: Opponent;
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
    this.setFormDefualts();
  }


  setFormDefualts() {
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
        this.setFormDefualts();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  isOpponentBeingEdited(opponent: Opponent):boolean {
    if (this.opponentBeingEdited) {
      if (this.opponentBeingEdited._id === opponent._id) {
        return true;
      }
    } else {
      return false;
    }
  }

  isOpponentSelected(opponent: Opponent):boolean {
    if (this.selectedOpponent) {
      if (this.selectedOpponent._id === opponent._id) {
        return true;
      }
    } else {
      return false;
    }
  }



  enableEditing(opponent: Opponent) {
    this.opponentBeingEdited = _.clone(opponent);
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
    this.setFormDefualts();

  }

  cancelEditing() {
    this.opponentBeingEdited = null;
    this.toast.setMessage('item editing cancelled.', 'warning');
    this.getOpponents();
  }

  editOpponent(opponent: Opponent) {
    this.opponentService.editOpponent(opponent).subscribe(
      () => {
        this.opponentBeingEdited = null;
        if (this.isOpponentSelected(opponent)) {
          this.selectedOpponent = opponent;
        }
        this.toast.setMessage('item eddddited successfully.', 'success');
        this.getOpponents();
      },
      error => console.log(error)
    );
  }

  deleteOpponent(opponent: Opponent) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.opponentService.deleteOpponent(opponent).subscribe(
        () => {
          this.getOpponents();
          // const pos = this.opponents.map(elem => elem._id).indexOf(opponent._id);
          // this.opponents.splice(pos, 1);

          if (this.selectedOpponent === opponent) {
            this.selectedOpponent = null;
          }



          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
