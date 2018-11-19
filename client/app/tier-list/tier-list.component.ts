import { Component, OnInit, Input } from '@angular/core';
import { Character } from '../shared/models/character.model';



@Component({
  selector: 'app-tier-list',
  templateUrl: './tier-list.component.html',
  styleUrls: ['./tier-list.component.css']
})
export class TierListComponent implements OnInit {
  @Input() characters: Character[];

  constructor() { }

  ngOnInit() {
    console.log(this.characters);
  }

}
