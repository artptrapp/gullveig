import { Component, Input, OnInit } from '@angular/core';
import { Character } from 'src/app/services/character/character.service';
import { bloodTypeToName } from 'src/utils/hp-utils';

@Component({
  selector: 'character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss'],
})
export class CharacterCardComponent implements OnInit {

  @Input()
  characterData: Character

  private decidedGroup: string

  constructor() { }

  ngOnInit() {
    this.characterData.bloodType = bloodTypeToName(this.characterData.bloodType)
    this.decideGroup()
  }

  decideGroup() {
    if (this.characterData.group) {
      this.decidedGroup = this.characterData.group.displayName
      return
    }
    this.decidedGroup = 'Comunal da ' + this.characterData.house.displayName
  }

}
