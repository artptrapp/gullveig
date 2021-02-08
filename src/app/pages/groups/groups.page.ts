import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { Character, CharacterService, Group } from 'src/app/services/character/character.service';
import { GroupsService, Message } from 'src/app/services/groups/groups.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
})
export class GroupsPage implements OnInit {

  private userId: string = ""
  private selectedCharacterId: string = ""
  private backgroundStyle: any;

  private isLoading = true
  private textMessage: string = "";

  private currentGroup: Group
  private currentCharacter: Character
  private isSendingMessage: boolean = false;

  private messages: Message[] = []

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private groupsService: GroupsService,
    private charactersService: CharacterService
  ) { }

  ngOnInit() {
    this.auth.onAuthStateChanged((user) => {
      if (!user) {
        return
      }

      this.userId = user.uid

      this.activatedRoute.queryParams.subscribe((params) => {
        if (params && params.characterId) {
          this.selectedCharacterId = params.characterId
          this.loadGroup()
        }
      })
    })
  }

  async loadGroup() {
    const group = await this.groupsService.getCurrentGroup(this.userId, this.selectedCharacterId)
    this.currentGroup = group

    this.messages = await this.groupsService.getLatestMessagesFromGroup(group.id, 5);

    const character = await this.charactersService.getCharacter(this.userId, this.selectedCharacterId)
    this.currentCharacter = character;

    this.backgroundStyle = {'background-image':`url(${this.currentGroup.photoUrl})`}

    this.isLoading = false;

    this.groupsService.addMessageArrivedListener('groups-page', (message) => {
      this.messages.push(message)
    })
  }

  async sendMessage() {
    this.isSendingMessage = true;

    await this.groupsService.sendMessageToGroup(
      this.userId,
      this.currentCharacter,
      this.currentGroup.id, 
      this.textMessage
    )

    this.isSendingMessage = false;
    this.textMessage = ""
  }

}
