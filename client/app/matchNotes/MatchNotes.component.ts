import { Component, OnInit, Input, OnChanges,  SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastComponent } from '../shared/toast/toast.component';
import { MatchNote } from '../shared/models/matchNote.model';
import { User } from '../shared/models/user.model';
import { MatchNoteService } from '../services/matchNote.service';
import { Match } from '../shared/models/match.model';
import * as _ from 'underscore';
import { CharacterService } from '../services/character.service';
import { Character } from '../shared/models/character.model';

@Component({
	selector: 'app-match-notes',
	templateUrl: './matchNotes.component.html',
	styleUrls: ['./matchNotes.component.css']
})
export class MatchNotesComponent implements OnInit, OnChanges {
	@Input() match: Match;
	matchNote = new MatchNote();
	matchNoteBeingEdited: MatchNote;
	matchNotes: MatchNote[] = [];
	isMatchNotesLoading = true;
	user: User;
	addMatchNoteForm: FormGroup;
	characters: Character[];
	sectionList = [
		{'title': "playingAs",
			'value': "playingAs"},
		{'title': "playingAgainst",
			'value': "playingAgainst"}
	];

	body = new FormControl('', Validators.required);
	section = new FormControl('', Validators.required);


	constructor(
		private matchNoteService: MatchNoteService,
		private formBuilder: FormBuilder,
		public toast: ToastComponent,
		private characterService: CharacterService,

	) { }

	ngOnChanges(match:  SimpleChanges) {
		//this log prevents a ts lint error. not sure wut do yet.
		// can check object 'match' for change before and after tho!
		console.log(" on changes match", match);
		this.setFormDefualts();
		this.getMatchNotes();
		this.getCharacters();
	}


	getCharacters() {
		this.characterService.getCharacters().subscribe(
			data =>{
				this.characters = data
				console.log(this.characters);
			},
			error => console.log(error),
			// () => this.isLoading = false
		);
	}


	displayCharacterName(characterId: string) {
		//TODO this should be a filter,  OR PIPE i believe.
		let matchingCharacterToId = _.find(this.characters, function(character){ return character._id === characterId });
		if (matchingCharacterToId) {
			return matchingCharacterToId.name;
		}
	}

	ngOnInit() {
		this.getMatchNotes();
		this.setFormDefualts();
	}

	setFormDefualts() {
		this.addMatchNoteForm = this.formBuilder.group({
			body: this.body,
			matchId: this.match._id,
			section: this.section,
		});
	}

	getMatchNotes() {
		this.isMatchNotesLoading = true;
		this.matchNoteService.getMatchNotes(this.match).subscribe(
			res => {
				console.log("res", res);
				this.isMatchNotesLoading = false;
				this.matchNotes = res
			},
			error => {
				this.isMatchNotesLoading = false;
				console.log(error);
			}
		);
	}

	addMatchNote() {
		console.log("idk");
		this.isMatchNotesLoading = true;
		this.matchNoteService.addMatchNote(this.addMatchNoteForm.value).subscribe(
			res => {
				this.getMatchNotes();
				this.addMatchNoteForm.reset();
				this.setFormDefualts();
				this.toast.setMessage('item added successfully.', 'success');
			},
			error => {
				this.isMatchNotesLoading = true;
				console.log(error)
			}
		);
	}

	deleteMatchNote(matchNote: MatchNote) {
		if (window.confirm('Are you sure you want to permanently delete this item?')) {
			this.isMatchNotesLoading = true;
			this.matchNoteService.deleteMatchNote(matchNote).subscribe(
				res => {
					this.getMatchNotes();
					this.toast.setMessage('item deleted successfully.', 'success');
				},
				error => {
					this.isMatchNotesLoading = true;
					console.log(error)
				}
			);
		}
	}

	enableEditing(matchNote: MatchNote) {
		this.matchNoteBeingEdited = _.clone(matchNote);
	}

	isMatchNoteBeingEdited(matchNote: MatchNote) {
		if (this.matchNoteBeingEdited) {
			if (this.matchNoteBeingEdited._id === matchNote._id) {
				return true;
			}
		} else {
			return false;
		}
	}

	cancelEditing() {
		this.matchNoteBeingEdited = null;
		this.toast.setMessage('item editing cancelled.', 'warning');
	}

	editMatchNote(matchNote: MatchNote) {
		this.matchNoteService.editMatchNote(matchNote).subscribe(
			() => {
				this.matchNoteBeingEdited = null;
				this.toast.setMessage('item edited successfully.', 'success');
				this.getMatchNotes();
			},
			error => console.log(error)
		);
	}

}
