import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { houseCodeToName } from 'src/utils/hp-utils';

export type Group = {
  id: string,
  displayName: string,
  photoUrl: string
}

export type House = {
  name: string,
  displayName?: string
}

export type Pet = {
  name: string,
  type: 'FROG' | 'CAT' | 'OWL' | 'RAT' | 'FERRET'
}

export type Character = {
  id?: string,
  name: string,
  birthDate: string,
  schoolYear: number,
  bloodType: 'PURE' | 'MIXED' | 'MUGGLE',
  pet: Pet,
  house: House,
  gender: 'MALE' | 'FEMALE',
  history?: string,
  photo?: string,
  group?: Group
}

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  async getAll(userId: string): Promise<Character[]> {
    const characters = []
    const docRef = await this.db.collection('users').doc(userId).collection('characters').get().toPromise()
    docRef.docs.forEach(doc => {
      const data = doc.data()
      data.house.displayName = houseCodeToName(data.house.name)
      data.id = doc.id;
      characters.push(data)
    })
    return characters
  }

  async getCharacter(userId: string, characterId: string): Promise<Character> {
    const doc = await this.db.collection('users').doc(userId).collection('characters').doc(characterId).get().toPromise()
    const character = doc.data() as Character
    return character
  }

  async updateCurrentGroup(userId: string, characterId: string, group: Group) {
    await this.db.collection('users').doc(userId).collection('characters').doc(characterId).update({
      group
    })
  }

  async createCharacter(userId: string, characterData: Character): Promise<boolean> {
    try {
      const photo = characterData.photo;
      delete characterData.photo;
      const resultDoc = await this.db.collection('users').doc(userId).collection('characters').add(characterData);
      const uploadSnapshot = this.storage.ref(`${userId}/characters/${resultDoc.id}`).putString(photo, 'data_url')

      return new Promise((resolve) => {
        uploadSnapshot.snapshotChanges().subscribe((task) => {
          if (task.state === "success") {
            task.ref.getDownloadURL().then(url => {
              resultDoc.update({
                photo: url
              }).then(() => resolve(true))
            })
          } else if (task.state === "error") {
            resolve(false)
          }
        })
      })
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
