import { Component, OnInit, Input, OnChanges,  SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastComponent } from '../shared/toast/toast.component';
import { OpponentNote } from '../shared/models/opponentNote.model';
import { User } from '../shared/models/user.model';
import { OpponentNoteService } from '../services/opponentNote.service';
import { Opponent } from '../shared/models/opponent.model';
import * as _ from 'underscore';

@Component({
	selector: 'app-opponent-notes',
	templateUrl: './opponentNotes.component.html',
	styleUrls: ['./opponentNotes.component.css']
})
export class OpponentNotesComponent implements OnInit, OnChanges {
	@Input() opponent: Opponent;
	opponentNote = new OpponentNote();
	opponentNoteBeingEdited: OpponentNote;
	opponentNotes: OpponentNote[] = [];
	isOpponentNotesLoading = true;
	user: User;
	addOpponentNoteForm: FormGroup;

	body = new FormControl('', Validators.required);

	constructor(
		private opponentNoteService: OpponentNoteService,
		private formBuilder: FormBuilder,
		public toast: ToastComponent,
	) { }

	ngOnChanges(opponent:  SimpleChanges) {
		//this log prevents a ts lint error. not sure wut do yet.
		// can check object 'opponent' for change before and after tho!
		console.log(" on changes opponent", opponent);
		this.setFormDefaults();
		this.getOpponentNotes();
	}

	ngOnInit() {
		this.getOpponentNotes();
		this.setFormDefaults();
	}

	setFormDefaults() {
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
				this.addOpponentNoteForm.reset();
				this.setFormDefaults();
				this.toast.setMessage('item added successfully.', 'success');
			},
			error => {
				this.isOpponentNotesLoading = true;
				console.log(error)
			}
		);
	}

	deleteOpponentNote(opponentNote: OpponentNote) {
		if (window.confirm('Are you sure you want to permanently delete this item?')) {
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
	}

	enableEditing(opponentNote: OpponentNote) {
		this.opponentNoteBeingEdited = _.clone(opponentNote);
	}

	isOpponentNoteBeingEdited(opponentNote: OpponentNote) {
		if (this.opponentNoteBeingEdited) {
			if (this.opponentNoteBeingEdited._id === opponentNote._id) {
				return true;
			}
		} else {
			return false;
		}
	}

	cancelEditing() {
	this.opponentNoteBeingEdited = null;
	this.toast.setMessage('item editing cancelled.', 'warning');
	}

	editOpponentNote(opponentNote: OpponentNote) {
		this.opponentNoteService.editOpponentNote(opponentNote).subscribe(
			() => {
				this.opponentNoteBeingEdited = null;
				this.toast.setMessage('item edited successfully.', 'success');
				this.getOpponentNotes();
			},
			error => console.log(error)
		);
	}

}
