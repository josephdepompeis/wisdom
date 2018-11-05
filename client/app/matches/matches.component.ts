import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastComponent } from '../shared/toast/toast.component';
import { Match } from '../shared/models/match.model';
import { MatchService } from '../services/match.service';
import { AuthService } from '../services/auth.service';
import * as _ from 'underscore';

@Component({
	selector: 'app-matches',
	templateUrl: './matches.component.html',
	styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
	match = new Match();
	matches: Match[] = [];
	isLoading: boolean = true;
	matchBeingEdited: Match;
	selectedMatch: Match;
	matchNoteFlag: boolean;
	addMatchForm: FormGroup;
	displayMatchForm:boolean;

	name = new FormControl('', Validators.required);
	playingAs = new FormControl('', Validators.required);
	playingAgainst = new FormControl('', Validators.required);

	constructor(
		private matchService: MatchService,
		private formBuilder: FormBuilder,
		public toast: ToastComponent,
		private auth: AuthService,
	) { }

	ngOnInit() {
		this.getMatches();
		this.setFormDefualts();
	}

	setFormDefualts() {
		this.addMatchForm = this.formBuilder.group({
			name: this.name,
			playingAs: null,
			playingAgainst: null,
			// age: this.age,
			// weight: this.weight,
			userId: this.auth.currentUser._id,
		});
	}

	getMatches() {
		this.matchService.getMatches(this.auth.currentUser).subscribe(
			data => this.matches = data,
			error => console.log(error),
			() => this.isLoading = false
		);
	}

	addMatch() {
		console.log("this.addMatchForm.value", this.addMatchForm.value);
		this.matchService.addMatch(this.addMatchForm.value).subscribe(
			res => {

				//should update this
				this.matches.push(res);
				this.addMatchForm.reset();
				this.setFormDefualts();
				this.toast.setMessage('item added successfully.', 'success');
			},
			error => console.log(error)
		);
	}

	isMatchBeingEdited(match: Match):boolean {
		if (this.matchBeingEdited) {
			if (this.matchBeingEdited._id === match._id) {
				return true;
			}
		} else {
			return false;
		}
	}

	isMatchSelected(match: Match):boolean {
		if (this.selectedMatch) {
			if (this.selectedMatch._id === match._id) {
				return true;
			}
		} else {
			return false;
		}
	}

	enableEditing(match: Match) {
		this.matchBeingEdited = _.clone(match);
	}

	newMatchNote(match: Match) {
		this.selectMatch(match);
		//this is redundent and probably will be re-thought.
	}

	selectMatch(match: Match) {
		this.selectedMatch = match;
	}

	deselectMatch(match: Match) {
		//get rid of match here
		this.selectedMatch = null;
		console.log("this.selectedMatch", this.selectedMatch);
	}

	displayAddNewMatchForm() {
		this.displayMatchForm = true;
	}

	hideAddNewMatchForm() {
		this.displayMatchForm = false;
		this.addMatchForm.reset();
		this.setFormDefualts();

	}

	cancelEditing() {
		this.matchBeingEdited = null;
		this.toast.setMessage('item editing cancelled.', 'warning');
	}

	editMatch(match: Match) {
		this.matchService.editMatch(match).subscribe(
			() => {
				this.matchBeingEdited = null;
				if (this.isMatchSelected(match)) {
					this.selectedMatch = match;
				}
				this.toast.setMessage('item edited successfully.', 'success');
				this.getMatches();
			},
			error => console.log(error)
		);
	}

	deleteMatch(match: Match) {
		if (window.confirm('Are you sure you want to permanently delete this item?')) {
			this.matchService.deleteMatch(match).subscribe(
				() => {
					this.getMatches();
					if (this.selectedMatch === match) {
						this.selectedMatch = null;
					}
					this.toast.setMessage('item deleted successfully.', 'success');
				},
				error => console.log(error)
			);
		}
	}

}
