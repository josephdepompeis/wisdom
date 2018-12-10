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
				// console.log("list of tier list sections", res);
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
				this.draggedCharacter = null;
				this.tierList = tierList;
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
			},
			error => {
				console.log(error);
			}
		);
	}

	addCharacterToRemovedList = (tierList:TierList, draggedCharacter: Character) => {
		let localTierList = _.clone(tierList);
		localTierList.removedCharacters.push(draggedCharacter);
		this.editTierList(localTierList);
	}


	// addCharacterToTierListSection = (tierListSection:TierListSection, draggedCharacter: Character) => {
	// 	let localTierListSection = _.clone(tierListSection);
	// 	localTierListSection.characters.push(draggedCharacter);
	// 	this.editTierListSection(localTierListSection);
	//
	// }


	findCharacterTierListSection = (draggedCharacter:Character):TierListSection => {
		let draggedCharacterTierListSection;

		let isDraggedCharacterInATierListSection =  _.some(this.tierListSections, (localTierListSection) => {
				let doesThisLocalTierListSectionContainDraggedCharacter =  _.contains(localTierListSection.characters, draggedCharacter);
				// console.log("doesThisContainDraggedCharacter", doesThisContainDraggedCharacter);
				if (doesThisLocalTierListSectionContainDraggedCharacter) {
					draggedCharacterTierListSection = localTierListSection;
					return true;
				}
				else {
					return false;
				}
				// draggedCharacterTierListSection = localTierListSection;
				// return _.contains(localTierListSection.characters, draggedCharacter)
		});

		console.log("isDraggedCharacterInATierListSection", isDraggedCharacterInATierListSection);
		if (isDraggedCharacterInATierListSection) {
			return draggedCharacterTierListSection;
		}
		else {
			return null;
		}
	}

	moveCharacterToCharacterSlot = (tierListSectionOfCharacterSlot: TierListSection, draggedCharacter: Character, indexOfCharacterSlot:number, forcePosition?: string) => {
		let characterInSlot = tierListSectionOfCharacterSlot.characters[indexOfCharacterSlot];
		let draggedCharacterTierListSection = this.findCharacterTierListSection(draggedCharacter);
		let localTierListSectionOfCharacterSlot = _.clone(tierListSectionOfCharacterSlot);
		let localTierListSectionOfDraggedCharacter = _.clone(draggedCharacterTierListSection);
		console.log("characterInSlot", characterInSlot);

		//assumes if character is not removed yet, it must be moving from here first.
		if (!this.isCharacterRemoved(draggedCharacter)) {

			if (forcePosition && forcePosition === 'FRONT') {
				localTierListSectionOfCharacterSlot.characters.splice(0, 0, draggedCharacter);
					this.addCharacterToRemovedList(this.tierList, this.draggedCharacter);
			}
			else if (forcePosition && forcePosition === 'BACK') {
				localTierListSectionOfCharacterSlot.characters.push(draggedCharacter);
			}
			else {
				//does no removing of characters from sections, just puts draggedCharacter in place
				localTierListSectionOfCharacterSlot.characters.splice(indexOfCharacterSlot, 0, draggedCharacter);
			}
			//this checks if character last dragged character needs to be removed from list.
			//probably not a good place for this.
				this.addCharacterToRemovedList(this.tierList, this.draggedCharacter);
		}

		// if draggedCharacter is in same section as chracterSlot
		else if ( _.contains(tierListSectionOfCharacterSlot.characters, draggedCharacter) ) {
			let indexOfDraggedCharacter =  _.indexOf(tierListSectionOfCharacterSlot.characters, draggedCharacter);
			if (forcePosition && forcePosition === 'FRONT') {
				//removes dragged character from spot
				localTierListSectionOfCharacterSlot.characters.splice(indexOfDraggedCharacter, 1);
				//moves dragged character to the front
				tierListSectionOfCharacterSlot.characters.splice(0, 0, draggedCharacter);
			}
			else if (forcePosition && forcePosition === 'BACK') {
				//removes dragged character from spot
				localTierListSectionOfCharacterSlot.characters.splice(indexOfDraggedCharacter, 1);
				//pushes dragged character to the back
				tierListSectionOfCharacterSlot.characters.push(draggedCharacter);
			}
			else {
				// removes character from passed in index position, replaces with dragged character
				localTierListSectionOfCharacterSlot.characters.splice(indexOfCharacterSlot, 1, draggedCharacter);
				// removes draggedCharacter from  indexOfDraggedCharacter position, replaces with characterInSlot
				localTierListSectionOfCharacterSlot.characters.splice(indexOfDraggedCharacter, 1, characterInSlot);
				// this.editTierListSection(localTierListSection);
			}
		}

		// if draggedCharacter is in a section group, but not the same as chracterSlot
		else if (draggedCharacterTierListSection) {
			let indexOfDraggedCharacter =  _.indexOf(draggedCharacterTierListSection.characters, draggedCharacter);
			if (forcePosition && forcePosition === 'FRONT') {
				//add dragged character to the front.
				tierListSectionOfCharacterSlot.characters.splice(0, 0, draggedCharacter);
				// removes draggedCharacter from  indexOfDraggedCharacter position
				localTierListSectionOfDraggedCharacter.characters.splice(indexOfDraggedCharacter, 1);
			}
			else if (forcePosition && forcePosition === 'BACK') {
				//add dragged character to the back.
				tierListSectionOfCharacterSlot.characters.push(draggedCharacter);
				// removes draggedCharacter from  indexOfDraggedCharacter position
				localTierListSectionOfDraggedCharacter.characters.splice(indexOfDraggedCharacter, 1);
			}
			else {
				// removes character from passed in index position, replaces with dragged character
				localTierListSectionOfCharacterSlot.characters.splice(indexOfCharacterSlot, 1, draggedCharacter);
				// removes draggedCharacter from  indexOfDraggedCharacter position, replaces with characterInSlot
				localTierListSectionOfDraggedCharacter.characters.splice(indexOfDraggedCharacter, 1, characterInSlot);
			}
			this.editTierListSection(localTierListSectionOfDraggedCharacter);
		}
		this.editTierListSection(localTierListSectionOfCharacterSlot);
	}

	dragStart = (event, character: Character) => {
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

	dropInFirstPositionTierListSection = (event, tierListSection: TierListSection) => {




		if (this.draggedCharacter) {

			//0 below not used.
			this.moveCharacterToCharacterSlot(tierListSection, this.draggedCharacter, 0, 'FRONT' );
		}
	}



	dropInLastPositionTierListSection = (event, tierListSection: TierListSection) => {
		if (this.draggedCharacter) {
			//0 below not used.
			this.moveCharacterToCharacterSlot(tierListSection, this.draggedCharacter, 0, 'BACK' );
		}
	}


	dropInCharacterSlot = (event, tierListSection:TierListSection, index :number) => {
		console.log("index", index);
		console.log("this.draggedCharacter", this.draggedCharacter);
		if (this.draggedCharacter) {
			this.moveCharacterToCharacterSlot(tierListSection, this.draggedCharacter, index);
		}
	}

	isCharacterRemoved(character:Character) {
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
