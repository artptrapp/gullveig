
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController, IonSlides, LoadingController } from '@ionic/angular';
import { Character, CharacterService } from 'src/app/services/character/character.service';
import { fileToBase64 } from 'src/utils/file-utils';

@Component({
  selector: 'app-character-creation',
  templateUrl: './character-creation.page.html',
  styleUrls: ['./character-creation.page.scss'],
})
export class CharacterCreationPage implements OnInit {

  private selectedGender: string = "ele"

  private fileInput: HTMLElement

  @ViewChild(IonSlides) slides: IonSlides

  private userId: string

  private characterData: Character = {
    birthDate: null,
    bloodType: 'MIXED',
    house: {
      name: 'GRYFFINDOR'
    },
    name: '',
    pet: {
      name: '',
      type: 'FROG'
    },
    schoolYear: 2,
    gender: 'MALE',
    history: '',
    photo: '../../assets/image/placeholder-user.png'
  }

  constructor(
    private auth: AngularFireAuth,
    private alertController: AlertController,
    private characterService: CharacterService,
    private router: Router,
    private loadingController: LoadingController
  ) {
    this.auth.onAuthStateChanged((user) => {
      if (!user) {
        return
      }
      this.userId = user.uid
    }).then(unsubscribe => unsubscribe())
  }

  ngOnInit() {
    this.fileInput = document.getElementById("hidden-file-input")
    this.fileInput.onchange = this.handleFile.bind(this)
  }

  setGender(event) {
    const gender = event.detail.value;
    if (gender && gender === 'MALE') {
      this.selectedGender = "ele";
    } else {
      this.selectedGender = "ela";
    }
  }

  selectPetType(type) {
    this.characterData.pet.type = type;
  }

  advanceSlide() {
    this.slides.slideNext()
  }

  async openGallery() {
    console.log(this.fileInput)
    this.fileInput.click()
  }

  async handleFile(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files
    if (files.length) {
      const selectedPhoto = files.item(0)
      const base64 = await fileToBase64(selectedPhoto)
      this.characterData.photo = base64;
    }
  }

  async validateForm() {
    let message = ''
    if (!this.characterData.name) {
      message += '- Nome do personagem não pode ficar vazio<br>'
    }

    if (!this.characterData.birthDate) {
      message += '- Data de nascimento não pode ficar vazia<br>'
    }

    if (!this.characterData.house.name) {
      message += '- Comunal não pode ficar vazia<br>'
    }

    if (message) {
      const alert = await this.alertController.create({
        header: 'Erro',
        message: `Os seguintes problemas foram identificados: <br> ${message}`
      })

      alert.present()
    }

    return !message
  }

  async finish() {
    const loader = await this.loadingController.create({
      message: 'Aguarde...'
    })

    loader.present()
    const validationResult = await this.validateForm()

    if (validationResult) {
      const result = await this.characterService.createCharacter(this.userId, this.characterData)
      if (result) {
        this.router.navigateByUrl('/home')
      } else {
        const errorMessage = await this.alertController.create({
          message: 'Houve um erro ao criar o personagem'
        })
        errorMessage.present()
      }

      loader.dismiss()
    }
  }

}
