import { Component, OnInit, Input, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Character } from '../shared/models/character.model';
import * as _ from 'underscore';
import { TierListService } from '../services/tier-list.service';
import { TierList } from '../shared/models/tier-list.model';
import { TierListSection } from '../shared/models/tier-list-section.model';
import { AuthService } from '../services/auth.service';
import {trigger,state,style,transition,animate,AnimationEvent} from '@angular/animations';
// import {Component,ViewEncapsulation} from '@angular/core';

@Component({
	selector: 'app-tier-list',
	templateUrl: './tier-list.component.html',
	styleUrls: ['./tier-list.component.css'],

	//stolen from https://www.primefaces.org/primeng/#/flexgrid
	animations: [
			trigger('animation', [
					state('visible', style({
							transform: 'translateX(0)',
							opacity: 1
					})),
					transition('void => *', [
							style({transform: 'translateX(50%)', opacity: 0}),
							animate('300ms ease-out')
					]),
					transition('* => void', [
							animate(('250ms ease-in'), style({
									height: 0,
									opacity: 0,
									transform: 'translateX(50%)'
							}))
					])
			])
	],
	encapsulation: ViewEncapsulation.None
})

export class TierListComponent implements OnInit {
	@Input() characters: Character[];
	@Input() selectedCharacter: Character;

	availableCharacters: Character[];
	columns: number[];


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
		this.columns = [0, 1, 2, 3, 4, 5];

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
			removedCharacters: [],
		}
		this.tierListService.addTierList(localTierList).subscribe(
			res => {
				console.log("res from add tier list", res);
				this.tierList = res;
				this.addTierListSection(res);
			},
			error => {
				console.log(error);
			}
		);
	}

	addTierListSection(tierList:TierList) {
		let localTierSection = {
			title: "Default Local Tier List",
			type: "character",
			userId: this.auth.currentUser._id,
			subtext: "Defualt subtext",
			sortOrder: 0,
			tierListId: tierList._id,
			characters: [],
		}

		this.tierListService.addTierListSection(localTierSection).subscribe(
			res => {
				console.log("res from add tier list section", res);
				this.getTierListSectionsByTierId(this.tierList);
			},
			error => {
				console.log(error);
			}
		);
	}

	getCharacterTierList(character:Character) {
		this.tierListService.getCharacterTierList(this.auth.currentUser, character).subscribe(
			res => {
				console.log("res from get char tier lsit", res);
				if (res === null) {
					this.addTierList();
				}
				else {
					this.tierList = res;
					this.getTierListSectionsByTierId(res);
				}
			},

			error => {
				console.log(error);
			}
		);
	}

	getTierListSectionsByTierId(tierList:TierList) {
		this.tierListService.getTierListSectionsByTierId(tierList).subscribe(
			res => {
				console.log("list of tier list sections", res);
				this.tierListSections = res;
			},
			error => {
				console.log(error);
			}
		);
	}

	editTierList(tierList:TierList) {
		this.tierListService.editTierList(tierList).subscribe(
			res => {
				// this.tierList = res;
				console.log("res -- is this okay?", this.tierList);

				this.draggedCharacter = null;
				this.tierList = tierList;
				console.log("hello joe");

				//
				// if (this.draggedCharacter) {
				// 	this.addCharacterToRemovedList(this.tierList, this.draggedCharacter);
				// }
				// // this.allCharacters = _.without(this.allCharacters, this.draggedCharacter);
				// this.draggedCharacter = null;
			},
			error => {
				console.log(error);
			}
		);
	}



	editTierListSection = (tierListSection:TierListSection) => {
		this.tierListService.editTierListSection(tierListSection).subscribe(
			res => {
				tierListSection = res;



				// if (this.draggedCharacter) {
					console.log("this.tierList", this.tierList);
					this.addCharacterToRemovedList(this.tierList, this.draggedCharacter);
				// }
				// this.allCharacters = _.without(this.allCharacters, this.draggedCharacter);
				// this.draggedCharacter = null;
			},
			error => {
				console.log(error);
			}
		);
	}

	addCharacterToRemovedList = (tierList:TierList, draggedCharacter: Character) => {
		let localTierList = _.clone(tierList);
		console.log("tierList", tierList)
		localTierList.removedCharacters.push(draggedCharacter);
		this.editTierList(localTierList);
	}


	addCharacterToTierListSection = (tierListSection:TierListSection, draggedCharacter: Character) => {
		let localTierListSection = _.clone(tierListSection);
		localTierListSection.characters.push(draggedCharacter);
		this.editTierListSection(localTierListSection);
	}

	dragStart(event, character: Character) {
		this.draggedCharacter = character;
	}

	drop(event) {
		// console.log("help");
		// if (this.draggedCharacter) {
		// 	let draggedCharacterIndex = this.findIndex(this.draggedCharacter);
		// 	this.selectedCharacters = [...this.selectedCharacters, this.draggedCharacter];
		// 	this.availableCharacters = this.availableCharacters.filter((val, i) => i != draggedCharacterIndex);
		// 	this.draggedCharacter = null;
		// }
	}

	dropInTierListSection = (event, tierListSection) => {
		if (this.draggedCharacter) {
			this.addCharacterToTierListSection(tierListSection, this.draggedCharacter);
		}
	}

	isCharacterRemoved(character:Character) {
		console.log("this.tierList.removedCharacters", this.tierList.removedCharacters);
		console.log("character", character);
		console.log("_)", _.findWhere(this.tierList.removedCharacters, {_id: character._id}));

		//
		// _.findWhere(publicServicePulitzers, {newsroom: "The New York Times"});
		// => {year: 1918, newsroom: "The New York Times",
		//   reason: "For its public service in publishing in full so many official reports,
		//   documents and speeches by European statesmen relating to the progress and
		//   conduct of the war."}


		return _.findWhere(this.tierList.removedCharacters, {_id: character._id});
	}





	dragEnd(event) {
		// this.draggedCharacter = null;
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

// https://www.primefaces.org/primeng/#/flexgrid

	addColumn() {
			this.columns.push(this.columns.length);
	}

	removeColumn() {
			this.columns.splice(-1, 1);
	}

}
