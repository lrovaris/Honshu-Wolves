import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'honshu-wolves';

  openLink(target:string) {
    target == 'discord' ? window.open("https://discord.gg/honshu-wolves") : window.open("https://twitter.com/HonshuWolves")
  }

}
