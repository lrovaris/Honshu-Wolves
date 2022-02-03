import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  Faqs = [
    {
      title: '- What is the meaning of Honshū Wolves NFTs?\n',
      text: '"Honshū Wolves NFTs" is a collection of Wolves, inspired by the real Honshū Wolves that were extinct in 1905 in Japan, built on the Solana Network.',
      id: 1
    },
    {
      title: '- What is the supply?',
      text: 'The total supply will be 2,222 unique Honshū Wolves.',
      id: 2
    },
    {
      title: '- When is the launch date?',
      text: 'Public release will be confirmed soon. To be updated on developments and progress, please join our Discord and Twitter for updates!',
      id: 3
    },
    {
      title: '- What is the name of your token and how can I get it?',
      text: 'HOWL is the utility token of the Honshūverse that will be used for the launch of Gen 2. You can get it by holding your Honshū NFTs in your wallet.',
      id: 4
    },
    {
      title: '- Do you have plans to create a DAO vault?',
      text: 'Yes, 50% of our royalties will be used for giveaways, promotions and future plans for Honshū Wolves decided by our DAO.\n',
      id: 5
    },
  ]

  RoadMap = [
    {
      title: 'Phase 1: Launch of the Genesis collection.',
      text: '2.222 Honshū Wolves are released in the metaverse waiting to be chosen by their new keepers. A fixed number of the extinct Gods will rise, piece by piece completing the full collection to be held in your wallet.',
      image: 'https://cdn.discordapp.com/attachments/596748701905715201/935934204515074078/unknown.png'
    },
    {
      title: 'Phase 2: Distribution of tokens for breeding.\n',
      text: 'In order to summon and master the next generation of Honshū Wolves, it will be imperative that you already be the keeper of 2 of them and a certain fixed number of tokens.',
      image: 'https://cdn.discordapp.com/attachments/596748701905715201/935934203202252800/unknown.png'
    },
    {
      title: 'Phase 3: Legendary Honshū Wolves Auction.\n',
      text: 'These legendary specimens were born with special characteristics. They are different from the normal ones, therefore, they have been separated from the original collection and will wait for their new owners in auctions to take place on a day and time to be confirmed. Owning a Legendary Honshū Wolf will give the keeper the possibility to vote on upcoming phases and plans.\n',
      image: 'https://cdn.discordapp.com/attachments/596748701905715201/935934204217262152/unknown.png'
    },
    {
      title: 'Phase 4: Launch of the Second Generation.',
      text: 'Years passed in the Honshūverse and the adult wolves began the procreation phase. 1,111 Honshū babies will be summoned, being the army destined to proclaim revenge against humans.',
      image: 'https://cdn.discordapp.com/attachments/596748701905715201/935934203877552218/unknown.png'
    },
    {
      title: 'Phase 5: The moment of truth.',
      text: 'The Honshū babies have grown up and are eager to show off their powers, the moment has come for them to claim revenge upon the people that slaughtered the ancestral Gods. What will happen to the Honshūverse? Be part of the universe and shape the metaverse!',
      image: 'https://cdn.discordapp.com/attachments/596748701905715201/935934203554578442/unknown.png'
    },
  ]


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
