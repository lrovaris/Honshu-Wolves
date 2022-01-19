import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  navigateTo(target:string) {
    const _target = window.document.getElementById(target)!
    _target.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }

}
