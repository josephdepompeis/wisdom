import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Character } from '../shared/models/character.model';
import * as _ from 'underscore';
import { TierListService } from '../services/tier-list.service';
import { TierList } from '../shared/models/tier-list.model';
import { TierListSection } from '../shared/models/tier-list-section.model';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-tier-list',
	templateUrl: './tier-list.component.html',
	styleUrls: ['./tier-list.component.css']
})
export class TierListComponent implements OnInit {
	@Input() characters: Character[];
	@Input() selectedCharacter: Character;

	availableCharacters: Character[];

	selectedCharacters: Character[] = [];
	draggedCharacter: Character;

	allCharacters: Character[] = [];

	tierList: TierList;
	tierListSections: TierListSection[] = [];

	tierSections: {}[] = [
		{
			title: "title1",
			subtext: "subtext",
			characters: [],
			sortOrder: 1,
		},
		{
			title: "title2",
			subtext: "subtext",
			characters: [],
			sortOrder: 2,

		}, {
			title: "title3",
			subtext: "subtext",
			characters: [],
			sortOrder: 3,

		}, {
			title: "title4",
			subtext: "subtext",
			characters: [],
			sortOrder: 4,
		}

	]
	constructor(
		private tierListService: TierListService,
		private auth: AuthService,
	) { }

	//most of this code taken from https://www.primefaces.org/primeng/#/dragdrop
	addSection(){
		this.tierSections.push(
			{
				title: "titlex",
				characters: [{name:'charlie'} , {name:'charlie'}, {name:'charlie'}, {name:'charlie'}],
				subtext:"whatever",
			}
		);
	}

	ngOnInit() {
		console.log("TierListService", TierListService);
		console.log(this.characters);
		// this.availableCharacters = this.characters;
	}

	ngOnChanges(characters: SimpleChanges) {
		this.availableCharacters = this.characters;
		this.allCharacters = this.characters;
		// this.selectedCharacter = selectedCharacter;
		if (this.selectedCharacter) {
			this.getCharacterTierList(this.selectedCharacter);
		}

		// console.log(this.selectedCharacter);
	}

	saveTierListSection(){
		// this.tierListService.addTierList(character).subscribe(
		// 	res => {
		// 		console.log("res", res);
		// 		// this.isMatchNotesLoading = false;
		// 		// this.matchNotes = res
		// 	},
		// 	error => {
		// 		// this.isMatchNotesLoading = false;
		// 		console.log(error);
		// 	}
		// );
	}

	addTierList() {
		let localTierList = {
			title: "tier list",
			subtext: "tier list subtext",
			type: "character",
			typeId: this.selectedCharacter._id,
			userId: this.auth.currentUser._id,
		}
		this.tierListService.addTierList(localTierList).subscribe(
			res => {
				console.log("res", res);
				this.tierList = res;
				this.addTierListSection();
			},
			error => {
				console.log(error);
			}
		);
	}

	addTierListSection() {
		let localTierSection = {
			title: "Default Local Tier List",
			subtext: "Defualt subtext",
			sortOrder: 0,
			tierListId: this.tierList._id,
			characters: [],
		}

		this.tierListService.addTierListSection(localTierSection).subscribe(
			res => {
				console.log("res ccc", res);
				this.tierListSections.push(res);
			},
			error => {
				console.log(error);
			}
		);
	}







	getCharacterTierList(character:Character) {
		this.tierListService.getCharacterTierList(character).subscribe(
			res => {
				console.log("res from get fff", res);
				if (!res._id) {
					this.addTierList();
				}
				else {
					this.getTierListSectionsByTierId(res);
				}
			},

			error => {
				// this.isMatchNotesLoading = false;
				console.log(error);
			}
		);
	}

	getTierListSectionsByTierId(tierList:TierList) {
		this.tierListService.getTierListSectionsByTierId(tierList).subscribe(
			res => {
				console.log("res list", res);

				// this.isMatchNotesLoading = false;
				// this.matchNotes = res
			},
			error => {
				// this.isMatchNotesLoading = false;
				console.log(error);
			}
		);
	}












	dragStart(event, character: Character) {
		this.draggedCharacter = character;
	}

	drop(event) {
		console.log("help");
		if (this.draggedCharacter) {
			let draggedCharacterIndex = this.findIndex(this.draggedCharacter);
			this.selectedCharacters = [...this.selectedCharacters, this.draggedCharacter];
			this.availableCharacters = this.availableCharacters.filter((val, i) => i != draggedCharacterIndex);
			this.draggedCharacter = null;
		}
	}

	dropInSection(event, section) {
		console.log("help",event);
		console.log("section", section);
		if (this.draggedCharacter) {
			section.characters.push(this.draggedCharacter);
			this.allCharacters = _.without(this.allCharacters, this.draggedCharacter);
			this.draggedCharacter = null;
		}
	}

	dragEnd(event) {
		this.draggedCharacter = null;
	}

	findIndex(character: Character) {
		let index = -1;
		//TODO REPLACE WITH underscore
		for (let i = 0; i < this.allCharacters.length; i++) {
			if (character._id === this.allCharacters[i]._id) {
				index = i;
				break;
			}
		}
		return index;
	}




}
