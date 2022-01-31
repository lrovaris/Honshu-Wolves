const fs = require('fs');
const images = require("images");
const { promisify } = require('util')
const hash  = require('object-hash')
let assetLimitControl = require('./assetLimitControl')

const readdir = promisify(require('fs').readdir)


//Middleware

let metaHash = ''
let metaHashArray = []
let metadataArray = []

let index = 1;

let limit = 1

let background = [
     'cloudy',
]
let Armour =  [
    'cyborg_armor',
]
let Eyes =  [
    'classic_eyes',
]
let Mouth = ['none' ]
let Type =  [
    'slate_grey'
]
let Head = [
    'medieval_half_mask'
]


/*

let background = []
let Armour = []
let Eyes = []
let Mouth = []
let Type = []
let Head = []
let Bandana = []
let Green_Mytic_Cap = []
let bunny_hat =   []*/

let backgroundName = ""
let ArmourName = ""
let EyesName = ""
let MouthName = ""
let TypeName = ""
let HeadName = ""

let this_ = true


async  function generateSprites() {

   await afterReadDireactories()

    if (index > limit ){
        metadataArray = JSON.stringify(metadataArray,null,2)

   /*     fs.writeFile('_metadata.json', metadataArray, (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });*/ //TODO
    } else {
      await generateSprites()
    }
}



async function afterReadDireactories()  {


    backgroundName = background[getRandomInt(0,background.length)]

    ArmourName = Armour[getRandomInt(0,Armour.length)]

    TypeName = Type[getRandomInt(0,Type.length)]

    HeadName = Head[getRandomInt(0,Head.length)]

    MouthName = Mouth[getRandomInt(0,Mouth.length)]

    EyesName = Eyes[getRandomInt(0,Eyes.length)]

    MouthName = Mouth[getRandomInt(0,Mouth.length)]

    let metadata = {}

    if(HeadName.includes('bandana')) {
        EyesName = Bandana[getRandomInt(0, Bandana.length)]

    }
    else if (HeadName.includes('vintage'))
    {
        EyesName = 'angry_eyebrows'

    }
    else if(HeadName.includes('green_mytic_cap') || HeadName.includes('aviator_hat'))
    {
        EyesName = Green_Mytic_Cap[getRandomInt(0,Green_Mytic_Cap.length)]
    }
    else if (HeadName.includes('bunny_hat'))
    {
        EyesName = bunny_hat[getRandomInt(0,bunny_hat.length)]
    }
    else if (HeadName.includes('chinese_mask') ||
        HeadName.includes('medieval_helmet') ||
        HeadName.includes('beast_mask') ||
        HeadName.includes('dragon_mask') ||
        HeadName.includes('medieval_half_mask') ||
        HeadName.includes('dino_mask') ||
        HeadName.includes('top_hat'))
    {
        EyesName = 'classic_eyes'
        if (
            HeadName.includes('beast_mask') ||
            HeadName.includes('dragon_mask') ||
            HeadName.includes('medieval_half_mask') ||
            HeadName.includes('dino_mask')
        ) {
            MouthName = 'none'
        }
    }

    metadata = {

        description: "description_test",
        atributes: [

            {
                trait_type: "Type",
                value: TypeName
            },
            {
                trait_type: "Armour",
                value: ArmourName
            },
            {
                trait_type: "Background",
                value: backgroundName
            },
            {
                trait_type: "Mouth",
                value: MouthName
            },
            {
                trait_type: "Head",
                value: HeadName
            },
            {
                trait_type: "Eyes",
                value: EyesName
            },
        ]
    }

    metaHash = hash(metadata)

    let x = metaHashArray.find(_metadata => _metadata === metaHash)
    if(!x) {

        if (!assetLimitControl.shouldSpawn(HeadName, 'head')) {
            Head = Head.filter(item => item !== HeadName)
            console.log(1)
            return;
        }
        if (!assetLimitControl.shouldSpawn(TypeName, 'type')) {
            Type = Type.filter(item => item !== TypeName)
            console.log(2)
            return;
        }
        if (!assetLimitControl.shouldSpawn(ArmourName, 'armour')) {
            Armour = Armour.filter(item => item !== ArmourName)
            console.log(3)
            return;
        }
        if (!assetLimitControl.shouldSpawn(backgroundName, 'background')) {

            background = background.filter(item => item !== backgroundName)
            console.log(4)
            return;
        }
        if (!assetLimitControl.shouldSpawn(EyesName, 'eyes')) {

            Eyes = Eyes.filter(item => item !== EyesName)
            console.log(5)
            return;
        }
        if (!assetLimitControl.shouldSpawn(MouthName, 'mouth')) {
            Mouth = Mouth.filter(item => item !== MouthName)
            console.log(6)
            return;
        }
        let NamesArray = [
            backgroundName, ArmourName, EyesName, MouthName, TypeName, HeadName
        ]


        metadata["name"] = `${index}`
        metadataArray.push(metadata);
        metaHashArray.push(metaHash)
        metadata = {}

        assetLimitControl.setSpawn(NamesArray)

        fs.mkdir(`./export2/${index}`, () => {})


       // console.log(background, Armour, Eyes, Mouth, Type, Head)


       for (let i = 1; i < 9; i++) {
            images(`./Background/Common/${backgroundName}/${i}.png`)
                .draw(images(`./Type/Common/${TypeName}/${i}.png`), 0, 0)
                .draw(images(`./Armour/Common/${ArmourName}/${i}.png`), 0, 0)
                .draw(images(`./Eyes/Common/${EyesName}/${i}.png`), 0, 0)
                .draw(images(`./Head/Common/${HeadName}/${i}.png`), 0, 0)
                .draw(images(`./Mouth/Common/${MouthName}/${i}.png`), 0, 0)
                .save(`./export2/${index}/${i}.png`, {
                    quality: 1
                });
        }   index += 1
    }


}


generateSprites()

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (
        max - min)) + min;
}


