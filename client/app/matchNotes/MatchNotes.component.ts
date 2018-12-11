import { Component, OnInit, Input, OnChanges,  SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastComponent } from '../shared/toast/toast.component';
import { MatchNote } from '../shared/models/matchNote.model';
import { MatchNoteSection } from '../shared/models/match-note-section.model';

import { User } from '../shared/models/user.model';
import { MatchNoteService } from '../services/matchNote.service';
import { Match } from '../shared/models/match.model';
import * as _ from 'underscore';
import { CharacterService } from '../services/character.service';
import { Character } from '../shared/models/character.model';
import { AuthService } from '../services/auth.service';

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
		private auth: AuthService,
	) { }

	ngOnChanges(match:  SimpleChanges) {
		//this log prevents a ts lint error. not sure wut do yet.
		// can check object 'match' for change before and after tho!
		console.log(" on changes match", match);
		this.setFormDefaults();

		this.getMatchNotes();
		this.getMatchNoteSections();
		this.getCharacters();
	}

	ngOnInit() {
		this.getMatchNotes();
		this.setFormDefaults();
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

	getMatchNotes() {
		this.isMatchNotesLoading = true;
		this.matchNoteService.getMatchNotes(this.match).subscribe(
			res => {
				console.log("res why twice tho?", res);
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
		this.isMatchNotesLoading = true;
		this.matchNoteService.addMatchNote(this.addMatchNoteForm.value).subscribe(
			res => {
				this.getMatchNotes();
				this.addMatchNoteForm.reset();
				this.setFormDefaults();
				this.toast.setMessage('item added successfully.', 'success');
			},
			error => {
				this.isMatchNotesLoading = true;
				console.log(error)
			}
		);
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





	// ui functions

		setFormDefaults() {
			this.addMatchNoteForm = this.formBuilder.group({
				body: this.body,
				matchId: this.match._id,
				section: this.section,
			});
		}

		displayCharacterName(characterId: string) {
			//TODO this should be a filter,  OR PIPE i believe.
			let matchingCharacterToId = _.find(this.characters, function(character){ return character._id === characterId });
			if (matchingCharacterToId) {
				return matchingCharacterToId.name;
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


	// sections
	getMatchNoteSections() {
		this.matchNoteService.getMatchNoteSections(this.match).subscribe(
			res => {
				// work must continue here
				console.log("resxxx", res);
				// this.isMatchNotesLoading = false;
				// this.matchNotes = res
			},
			error => {
				this.isMatchNotesLoading = false;
				console.log(error);
			}
		);
	}


	addMatchNoteSection(match:Match) {
		console.log("match", match);
			let localMatchNoteSection = new MatchNoteSection();



			localMatchNoteSection = {
				title: "Default Local Tier List",
				type: "match",
				userId: this.auth.currentUser._id,
				subtext: "Default subtext",
				sortOrder: 0,
				matchId: match._id,
			}

			this.matchNoteService.addMatchNoteSection(localMatchNoteSection).subscribe(
				res => {
					console.log("res from add match note section", res);
					// this.getTierListSectionsByTierId(this.tierList);
				},
				error => {
					console.log(error);
				}
			);
		}















}
