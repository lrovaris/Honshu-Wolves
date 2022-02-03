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

let limit = 2222






let background = []
let Armour = []
let Eyes = []
let Mouth = []
let Type = []
let Head = []
let Bandana = []
let Green_Mytic_Cap = []
let BunnyHat =   []

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

       fs.writeFile('_metadata.json', metadataArray, (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });
    } else {
      await generateSprites()
    }
}



async function afterReadDireactories()  {

    background = await readdir("./Background/Common")

    Armour =  await readdir("./Armour/Common")

    Eyes =  await readdir("./Eyes/Common")

    Mouth = await readdir("./Mouth/Common")

    Type =  await readdir("./Type/Common")

    Head = await readdir("./Head/Common")

    Bandana = await readdir("./Eyes/Bandana/")

    Green_Mytic_Cap = await readdir("./Eyes/green mytic cap/")

    BunnyHat = await readdir("./Eyes/Bunny Hat/")


    backgroundName = background[getRandomInt(0,background.length)]

    ArmourName = Armour[getRandomInt(0,Armour.length)]

    TypeName = Type[getRandomInt(0,Type.length)]

    HeadName = Head[getRandomInt(0,Head.length)]

    MouthName = Mouth[getRandomInt(0,Mouth.length)]

    EyesName = Eyes[getRandomInt(0,Eyes.length)]

    MouthName = Mouth[getRandomInt(0,Mouth.length)]

    let metadata = {}

    if(HeadName.includes('Bandana')) {
        EyesName = Bandana[getRandomInt(0, Bandana.length)]

    }
    else if (HeadName.includes('Vintage'))
    {
        EyesName = 'Angry Eyebrows'

    }
    else if(HeadName.includes('Green Mytic Cap') || HeadName.includes('Aviator Hat'))
    {
        EyesName = Green_Mytic_Cap[getRandomInt(0,Green_Mytic_Cap.length)]
    }
    else if (HeadName.includes('Bunny Hat'))
    {
        EyesName = BunnyHat[getRandomInt(0,BunnyHat.length)]
    }
    else if (HeadName.includes('Chinese Mask') ||
        HeadName.includes('Medieval Helmet') ||
        HeadName.includes('Beast Mask') ||
        HeadName.includes('Dragon Mask') ||
        HeadName.includes('Medieval Half Mask') ||
        HeadName.includes('Dino Mask') ||
        HeadName.includes('Top Hat'))
    {
        EyesName = 'Classic Eyes'
        if (
            HeadName.includes('Beast Mask') ||
            HeadName.includes('Dragon Mask') ||
            HeadName.includes('Medieval Half Mask') ||
            HeadName.includes('Dino Mask')
        ) {
            MouthName = 'None'
        }
    }


    while (!assetLimitControl.shouldSpawn(TypeName, 'Type')) {
        Type = Type.filter(item => item !== TypeName)
        TypeName = Type[getRandomInt(0,Type.length)]
    }
    while (!assetLimitControl.shouldSpawn(ArmourName, 'Armour')) {
        Armour = Armour.filter(item => item !== ArmourName)
        ArmourName = Armour[getRandomInt(0,Armour.length)]
    }
    while (!assetLimitControl.shouldSpawn(backgroundName, 'Background')) {
        background = background.filter(item => item !== backgroundName)
        backgroundName = background[getRandomInt(0,background.length)]
    }
    let NamesArray = [
        backgroundName, ArmourName, EyesName, MouthName, TypeName, HeadName
    ]


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

        if (!assetLimitControl.shouldSpawn(HeadName, 'Head')) {
            Head = Head.filter(item => item !== HeadName)
            console.log(1)
            return;
        }
        if (!assetLimitControl.shouldSpawn(TypeName, 'Type')) {
            Type = Type.filter(item => item !== TypeName)
            console.log(2)
            return;
        }
        if (!assetLimitControl.shouldSpawn(ArmourName, 'Armour')) {
            Armour = Armour.filter(item => item !== ArmourName)
            console.log(3)
            return;
        }
        if (!assetLimitControl.shouldSpawn(backgroundName, 'Background')) {

            background = background.filter(item => item !== backgroundName)
            console.log(4)
            return;
        }
        if (!assetLimitControl.shouldSpawn(EyesName, 'Eyes')) {

            Eyes = Eyes.filter(item => item !== EyesName)
            console.log(5)
            return;
        }
        if (!assetLimitControl.shouldSpawn(MouthName, 'Mouth')) {
            Mouth = Mouth.filter(item => item !== MouthName)
            console.log(6)
            return;
        }


        metadata["name"] = `${index}`
        metadataArray.push(metadata);
        metaHashArray.push(metaHash)
        metadata = {}

        assetLimitControl.setSpawn(NamesArray)

        fs.mkdir(`./export/${index}`, () => {})


       // console.log(background, Armour, Eyes, Mouth, Type, Head)


       for (let i = 1; i < 9; i++) {
            images(`./Background/Common/${backgroundName}/${i}.png`)
                .draw(images(`./Type/Common/${TypeName}/${i}.png`), 0, 0)
                .draw(images(`./Armour/Common/${ArmourName}/${i}.png`), 0, 0)
                .draw(images(`./Eyes/Common/${EyesName}/${i}.png`), 0, 0)
                .draw(images(`./Head/Common/${HeadName}/${i}.png`), 0, 0)
                .draw(images(`./Mouth/Common/${MouthName}/${i}.png`), 0, 0)
                .save(`./export/${index}/${i}.png`, {
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


