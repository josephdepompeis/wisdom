import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CharacterService } from '../services/character.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Character } from '../shared/models/character.model';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {

  character = new Character();
  characters: Character[] = [];
  isLoading = true;
  isEditing = false;

  addCharacterForm: FormGroup;

  name = new FormControl('', Validators.required);
  age = new FormControl('', Validators.required);
  weight = new FormControl('', Validators.required);

  constructor(private characterService: CharacterService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getCharacters();
    this.addCharacterForm = this.formBuilder.group({
      name: this.name,
      age: this.age,
      weight: this.weight
    });
  }

  getCharacters() {
    this.characterService.getCharacters().subscribe(
      data => this.characters = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addCharacter() {
    this.characterService.addCharacter(this.addCharacterForm.value).subscribe(
      res => {
        this.characters.push(res);
        this.addCharacterForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(character: Character) {
    this.isEditing = true;
    this.character = character;
  }

  cancelEditing() {
    this.isEditing = false;
    this.character = new Character();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the characters to reset the editing
    this.getCharacters();
  }

  editCharacter(character: Character) {
    this.characterService.editCharacter(character).subscribe(
      () => {
        this.isEditing = false;
        this.character = character;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteCharacter(character: Character) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.characterService.deleteCharacter(character).subscribe(
        () => {
          const pos = this.characters.map(elem => elem._id).indexOf(character._id);
          this.characters.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
