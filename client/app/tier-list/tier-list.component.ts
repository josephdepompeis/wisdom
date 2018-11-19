import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Character } from '../shared/models/character.model';

@Component({
  selector: 'app-tier-list',
  templateUrl: './tier-list.component.html',
  styleUrls: ['./tier-list.component.css']
})
export class TierListComponent implements OnInit {
  @Input() characters: Character[];

  availableCharacters: Character[];
  selectedCharacters: Character[] = [];
  draggedCharacter: Character;

  constructor() { }

  //most of this code taken from https://www.primefaces.org/primeng/#/dragdrop

  ngOnInit() {
    console.log(this.characters);
    // this.availableCharacters = this.characters;
  }
  ngOnChanges(characters:  SimpleChanges) {
    this.availableCharacters = this.characters;
	}

  dragStart(event, character : Character) {
      this.draggedCharacter = character;
  }

  drop(event) {
      if(this.draggedCharacter) {
          let draggedCharacterndex = this.findIndex(this.draggedCharacter);
          this.selectedCharacters = [...this.selectedCharacters, this.draggedCharacter];
          this.availableCharacters = this.availableCharacters.filter((val,i) => i!=draggedCharacterndex);
          this.draggedCharacter = null;
      }
  }

  dragEnd(event) {
      this.draggedCharacter = null;
  }

  findIndex(character: Character) {
      let index = -1;
      //TODO REPLACE WITH
      for(let i = 0; i < this.availableCharacters.length; i++) {
          if(character._id === this.availableCharacters[i]._id) {
              index = i;
              break;
          }
      }
      return index;
  }




















}
