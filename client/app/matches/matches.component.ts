import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastComponent } from '../shared/toast/toast.component';
import { Match } from '../shared/models/match.model';
import { MatchService } from '../services/match.service';
import { AuthService } from '../services/auth.service';
import * as _ from 'underscore';
import { CharacterService } from '../services/character.service';
import { Character } from '../shared/models/character.model';

@Component({
	selector: 'app-matches',
	templateUrl: './matches.component.html',
	styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
	match = new Match();
	matches: Match[] = [];
	characters: Character[];
	isLoading: boolean = true;
	matchBeingEdited: Match;
	selectedMatch: Match;
	matchNoteFlag: boolean;
	findMatchForm: FormGroup;
	editMatchForm: FormGroup;
	displayMatchForm:boolean;

	playingAs = new FormControl('', Validators.required);
	playingAgainst = new FormControl('', Validators.required);

	constructor(
		private matchService: MatchService,
		private formBuilder: FormBuilder,
		public toast: ToastComponent,
		private auth: AuthService,
		private characterService: CharacterService,
	) { }

	ngOnInit() {
		this.getMatches();
		this.getCharacters();
		this.setFormDefaults();
	}

	disableIfNull(){
		if (this.playingAs.status === "INVALID" || this.playingAs.status === "INVALID") {
			return true;
		}
		else {
			return false;
		}
	}

	setFormDefaults() {
		this.findMatchForm = this.formBuilder.group({
			// name: this.name,
			playingAs: null,
			playingAgainst: null,
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

	getCharacters() {
		this.characterService.getCharacters().subscribe(
			data =>{
				this.characters = data
				console.log(this.characters);
			},
			error => console.log(error),
			() => this.isLoading = false
		);
	}

	displayCharacterName(characterId: string) {
		//TODO this should be a filter,  OR PIPE i believe.
		let matchingCharacterToId = _.find(this.characters, function(character){ return character._id === characterId });
		if (matchingCharacterToId) {
			return matchingCharacterToId.name;
		}
	}

	findMatch() {
		this.matchService.findMatch(this.findMatchForm.value).subscribe(
			res => {
				if (res === null) {
					this.addMatch();
				}
				else {
					this.selectMatch(res);
					this.findMatchForm.reset();
					this.setFormDefaults();
					this.hideAddNewMatchForm();
				}
			},
			error => console.log(error)
		);
	}

		addMatch() {
			this.matchService.addMatch(this.findMatchForm.value).subscribe(
				res => {
					//should update this
					this.matches.push(res);
					this.findMatchForm.reset();
					this.setFormDefaults();
					this.selectMatch(res);
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
	}

	displayAddNewMatchForm() {
		this.displayMatchForm = true;
	}

	hideAddNewMatchForm() {
		this.displayMatchForm = false;
		this.findMatchForm.reset();
		this.setFormDefaults();

	}

	cancelEditing() {
		this.matchBeingEdited = null;
		this.toast.setMessage('item editing cancelled.', 'warning');
	}

	editMatch(match: Match) {
		console.log(match);
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

			console.log("match", match);
			this.matchService.deleteMatch(match).subscribe(
				(whatever) => {
					console.log(whatever);
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
