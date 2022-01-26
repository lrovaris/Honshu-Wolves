import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-faq-box',
  templateUrl: './faq-box.component.html',
  styleUrls: ['./faq-box.component.css']
})
export class FaqBoxComponent implements OnInit {

  @Input() title: string = 'Title';
  @Input() text: string = 'very long text to see if the text inside this box fits the respective text in the text box of the faq box, i think the text as it its is good enough to end';
  @Input() id: number = 0

  constructor() { }

  ngOnInit(): void {
  }

}
