import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/services/groups/groups.service';
import * as moment from 'moment'
import { firestoreDateToJS } from 'src/utils/hp-utils';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {

  @Input()
  loggedUserId: string

  @Input()
  message: Message

  private formattedTimeAgoText: string

  constructor() { 
    moment.locale('pt-BR')
  }

  ngOnInit() {
    const jsDate = firestoreDateToJS(this.message.when as any)
    const formattedMoment = moment(jsDate).fromNow()
    this.formattedTimeAgoText = formattedMoment
  }

}
