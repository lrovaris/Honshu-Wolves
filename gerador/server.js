const express = require('express');
const body_parser = require('body-parser');
const fs = require('fs');
const path = require('path');
const https = require('https');
const mergeImages = require('merge-images');
const images = require("images");
const { promisify } = require('util')
const hash  = require('object-hash')
let assetLimitControl = require('./assetLimitControl')

const readdir = promisify(require('fs').readdir)

const app = express();

//Middleware

function getRandomIndexByProbability(probabilities) {
    let r = Math.random(),
        index = probabilities.length - 1;

    probabilities.some(function (probability, i) {
        if (r < probability) {
            index = i;
            return true;
        }
        r -= probability;
    });
    return index;
}

let probabilities = [1]
let Folders = ["Common"]

let metaHash = ''
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
let bunny_hat = []

let backgroundName = ""
let ArmourName = ""
let EyesName = ""
let MouthName = ""
let TypeName = ""
let HeadName = ""

let backgroundRarity = ""
let ArmourRarity = ""
let EyesRarity = ""
let MouthRarity = ""
let TypeRarity = ""
let HeadRarity = ""


async function readDirectories(callback) {

    background = []
    Armour = []
    Eyes = []
    Mouth = []
    Type = []
    Head = []
    Bandana = []

    background = await readdir("./Background/"+'Common')

    Armour =  await readdir("./Armour/"+'Common')

    Eyes =  await readdir("./Eyes/"+'Common')

    Mouth = await readdir("./Mouth/"+'Common')

    Type =  await readdir("./Type/"+'Common')

    Head = await readdir("./Head/"+'Common')

    Bandana = await readdir("./Eyes/bandana/")

    Green_Mytic_Cap = await readdir("./Eyes/green_mytic_cap/")

    bunny_hat = await readdir("./Eyes/bunny_hat/")

    callback();

}

 readDirectories( async()  =>  {
  await  generateSprites()
}).then( () => {
     console.log('ue')
 })



async  function generateSprites() {

   await afterReadDireactories()

    if (index > limit ){
        metadataArray = JSON.stringify(metadataArray,null,2)

        fs.writeFile('_metadata.json', metadataArray, (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });
    } else {
        generateSprites()
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
                value: TypeName.substring(0, (TypeName.length - 4))
            },
            {
                trait_type: "Armour",
                value: ArmourName.substring(0, (ArmourName.length - 4))
            },
            {
                trait_type: "Background",
                value: backgroundName.substring(0, (backgroundName.length - 4))
            },
            {
                trait_type: "Mouth",
                value: MouthName.substring(0, (MouthName.length - 4))
            },
            {
                trait_type: "Head",
                value: HeadName.substring(0, (HeadName.length - 4))
            },
            {
                trait_type: "Eyes",
                value: EyesName.substring(0, (EyesName.length - 4))
            },
        ]
    }

    metaHash = hash(metadata)

    const x = metadataArray.find(_metadata => _metadata === metaHash)


    if(!x) {

        metadata["name"] = `${index}`
        metadataArray.push(metaHash);
        metadata = {}
        if (!assetLimitControl.shouldSpawn(HeadName, 'head')) {
            Head = Head.filter(item => item !== HeadName)
            return
        }
        if (!assetLimitControl.shouldSpawn(TypeName, 'type')) {
            Type = Type.filter(item => item !== TypeName)
            return
        }
        if (!assetLimitControl.shouldSpawn(ArmourName, 'armour')) {
            Armour = Armour.filter(item => item !== ArmourName)
            return
        }
        if (!assetLimitControl.shouldSpawn(backgroundName, 'background')) {
            background = background.filter(item => item !== backgroundName)
            return
        }
        if (!assetLimitControl.shouldSpawn(EyesName, 'eyes')) {
            Eyes = Eyes.filter(item => item !== EyesName)
            return
        }
        if (!assetLimitControl.shouldSpawn(MouthName, 'mouth')) {
            Mouth = Mouth.filter(item => item !== MouthName)
            return
        }
        let NamesArray = [
            /*background, armour, eyes, mouth, type, head*/
            backgroundName, ArmourName, EyesName, MouthName, TypeName, HeadName
        ]
        assetLimitControl.setSpawn(NamesArray)

        fs.mkdir(`./export/${index}`, () => {})

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
        }

        index += 1
        return;
    }


}





function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (
        max - min)) + min;
}


