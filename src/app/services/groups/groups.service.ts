import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Character, CharacterService, Group } from '../character/character.service';

export type Message = {
  owningUser: string,
  owningCharacter: Character,
  message: string,
  when: Date,
  messageType: 'SERVER' | 'ADMIN' | 'NORMAL'
}

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  private readonly staticGroupKeys = {
    hufflepuff: 'hufflepuff'
  }

  private currentGroup: Group

  private messageArrivedListener: {
    [key: string]: Function
  } = {}

  private currentSubscription: () => void

  constructor(private db: AngularFirestore, private characterService: CharacterService) { }

  private async decideCurrentGroup(character: Character) {
    if (character.group) {
      return character.group
    }

    const group = await this.getGroup(character.house.name.toLowerCase())
    group.id = character.house.name.toLowerCase()
    return group
  }

  async getGroup(groupId: string): Promise<Group> {
    const doc = await this.db.collection('groups').doc(groupId).get().toPromise()
    return doc.data() as Group
  }

  async addMessageArrivedListener(key: string, listener: Function) {
    this.messageArrivedListener[key] = listener
  }

  async joinGroup(userId: string, characterId: string, group?: Group) {
    try {
      const character = await this.characterService.getCharacter(userId, characterId)

      let currentGroup = character.group
      if (!currentGroup) {
        currentGroup = await this.decideCurrentGroup(character)
      }

      if (!group) {
        await this.characterService.updateCurrentGroup(userId, characterId, currentGroup)
        this.addInternalListener(currentGroup.id)
        return true
      }

      await this.characterService.updateCurrentGroup(userId, characterId, group)
      this.addInternalListener(group.id)
      return true
    } catch (e) {
      return false
    }
  }

  async getLatestMessagesFromGroup(groupId: string, messagesAmount: number) {
    const returnValue: Message[] = []
    const messages = await this
      .db.collection('groups')
      .doc(groupId)
      .collection('messages')
      .ref
      .orderBy('when', 'desc')
      .limit(messagesAmount)
      .get()
    
    messages.forEach(message => {
      returnValue.push(message.data() as Message)
    })

    return returnValue.reverse()
  }

  private addInternalListener(groupId: string) {
    if (this.currentSubscription) {
      this.currentSubscription()
    }
    this.currentSubscription = this
      .db.collection('groups')
      .doc(groupId)
      .collection('messages')
      .ref
      .orderBy('when', 'desc')
      .limit(1)
      .onSnapshot(snapshot => {
        for (let key in this.messageArrivedListener) {
          const listener = this.messageArrivedListener[key]
          snapshot.docs.forEach(doc => {
            listener(doc.data())
          })
        }
      })
  }

  async getCurrentGroup(userId: string, characterId: string) {
    if (this.currentGroup) {
      return this.currentGroup
    }

    const character = await this.characterService.getCharacter(userId, characterId)
    return character.group
  }

  async sendMessageToGroup(userId: string, owningCharacter: Character, groupId: string, message: string) {
    await this.db.collection('groups').doc(groupId).collection('messages').add({
      owningUser: userId,
      owningCharacter,
      message,
      when: new Date(),
      messageType: 'NORMAL'
    })
  }
}
