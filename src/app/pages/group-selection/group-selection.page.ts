import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Character, Group } from 'src/app/services/character/character.service';
import { GroupsService } from 'src/app/services/groups/groups.service';

@Component({
  selector: 'app-group-selection',
  templateUrl: './group-selection.page.html',
  styleUrls: ['./group-selection.page.scss'],
})
export class GroupSelectionPage implements OnInit {

  private groups: Group[] = []

  constructor(
    private modalController: ModalController,
    private groupService: GroupsService,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    this.groupService.getAllGroups().then((groups) => {
      this.filterGroups(groups)
    })
  }

  filterGroups(groups: Group[]) {
    const character = this.navParams.get('character') as Character
    const house = character.house.name.toLocaleLowerCase()
    const houseGroups = [
      'hufflepuff',
      'ravenclaw',
      'gryffindor',
      'slytherin'
    ]
    const filtered = groups.filter((group) => {
      if (houseGroups.includes(group.id)) {
        return group.id === house
      }

      return true
    })

    this.groups = filtered.sort()
  }

  selectGroup(group: Group) {
    this.modalController.dismiss(group)
  }

  dismissModal() {
    this.modalController.dismiss()
  }

}
