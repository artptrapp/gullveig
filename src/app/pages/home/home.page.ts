import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController, IonSlides, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { Character, CharacterService } from 'src/app/services/character/character.service';
import { GroupsService } from 'src/app/services/groups/groups.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private userId: string
  private characters: Character[]
  private isLoading = false;
  @ViewChild(IonSlides) slides: IonSlides

  private selectedCharacterName = "este personagem"

  constructor(
    private menuController: MenuController,
    private characterService: CharacterService,
    private afAuth: AngularFireAuth,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController,
    private groupService: GroupsService,
    private toastController: ToastController
  ) { }

  ngOnInit(): void {
  }

  ionViewWillEnter() {
    this.menuController.enable(true)
  }

  ionViewDidEnter() {
    this.afAuth.onAuthStateChanged(user => {
      if (!user) {
        return
      }
      this.userId = user.uid;
      this.checkForCharacters()
    })
  }

  sliderChanges() {
    this.slides.getActiveIndex().then((index) => {
      this.selectedCharacterName = this.characters[index].name
    })
  }

  async checkForCharacters() {
    this.isLoading = true;
    const loader = await this.loadingController.create({
      animated: true,
      message: 'Aguarde...'
    })
    loader.present()
    this.characterService.getAll(this.userId).then(async (characters) => {
      if (!characters.length) {
        const alert = await this.alertController.create({
          animated: true,
          backdropDismiss: false,
          header: 'Atenção',
          message: 'Você ainda não tem nenhum personagem. Clique OK para ser redirecionado para a tela de criação de personagem.',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.router.navigateByUrl('/character-creation')
              }
            }
          ]
        })
        alert.present()
      }

      this.characters = characters;
    }).finally(() => {
      loader.dismiss()
      this.isLoading = false
    })
  }

  addCharacter() {
    this.router.navigateByUrl('/character-creation')
  }

  async start() {
    const currentIndex = await this.slides.getActiveIndex()
    const selectedCharacter = this.characters[currentIndex]
    try {
      const loading = await this.loadingController.create({
        message: "Aguarde..."
      })
      loading.present()
      await this.groupService.joinGroup(this.userId, selectedCharacter.id, null)
      loading.dismiss()
      this.router.navigate(['groups'], {
        queryParams: {
          characterId: selectedCharacter.id
        }
      })
    } catch (e) {
      const errorToast = await this.toastController.create({
        message: 'Ocorreu um erro ao entrar no grupo'
      })
      errorToast.present()
    }
  }

}
