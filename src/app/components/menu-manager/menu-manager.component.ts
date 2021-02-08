import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'menu-manager',
  templateUrl: './menu-manager.component.html',
  styleUrls: ['./menu-manager.component.scss'],
})
export class MenuManagerComponent implements OnInit {

  constructor(
    private menuController: MenuController
  ) { }

  ngOnInit() {}

  async toggleMenu() {
    const isOpen = await this.menuController.isOpen()
    if (isOpen) {
      this.menuController.close()
    } else {
      this.menuController.open()
    }
  }

}
