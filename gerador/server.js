const express = require('express');
const body_parser = require('body-parser');
const fs = require('fs');
const path = require('path');
const https = require('https');
const mergeImages = require('merge-images');
const images = require("images");
const { promisify } = require('util')
const hash  = require('object-hash')

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

let probabilities = [0.45, 0.35, 0.12, 0.08]
let Folders = ["Common", "Uncommon", "Rare", "Legendary"]

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


async function readDirectories(backgroundRarity,ArmourRarity,EyesRarity,MouthRarity,TypeRarity,HeadRarity, callback) {

    background = []
    Armour = []
    Eyes = []
    Mouth = []
    Type = []
    Head = []
    Bandana = []

    background = await readdir("./Background/"+backgroundRarity)

    Armour =  await readdir("./Armour/"+ArmourRarity)

    Eyes =  await readdir("./Eyes/"+EyesRarity)

    Mouth = await readdir("./Mouth/"+MouthRarity)

    Type =  await readdir("./Type/"+TypeRarity)

    Head = await readdir("./Head/"+HeadRarity)

    Bandana = await readdir("./Eyes/bandana/")

    Green_Mytic_Cap = await readdir("./Eyes/green_mytic_cap/")

    bunny_hat = await readdir("./Eyes/bunny_hat/")

    callback();

}





async  function generateSprites() {

    backgroundRarity = Folders[getRandomIndexByProbability(probabilities)]
    ArmourRarity = Folders[getRandomIndexByProbability(probabilities)]
    EyesRarity = Folders[getRandomIndexByProbability(probabilities)]
    MouthRarity = Folders[getRandomIndexByProbability(probabilities)]
    TypeRarity = Folders[getRandomIndexByProbability(probabilities)]
    HeadRarity = Folders[getRandomIndexByProbability(probabilities)]


    await readDirectories(
        backgroundRarity,
        ArmourRarity,
        EyesRarity,
        MouthRarity,
        TypeRarity,
        HeadRarity, ()  =>  {
            afterReadDireactories()
        })


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
    EyesName = Eyes[getRandomInt(0,Eyes.length)]
    MouthName = Mouth[getRandomInt(0,Mouth.length)]
    TypeName = Type[getRandomInt(0,Type.length)]
    HeadName = Head[getRandomInt(0,Head.length)]

    let metadata = {}

    if(HeadName.includes('bandana')) {

        EyesName = Bandana[getRandomInt(0,Bandana.length)]

        if(EyesName === 'none') {
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
                    }
                ]

            }

            metaHash = hash(metadata)

            const x = metadataArray.find(_metadata => _metadata === metaHash)


            if(!x) {
                metadata["name"] = `${index}`
                metadataArray.push(metaHash);
                metadata = {}


                fs.mkdir(`./export/${index}`, () => {})

                for (let i = 1; i < 9; i++) {
                    images(`./Background/${backgroundRarity}/${backgroundName}/${i}.png`)
                        .draw(images(`./Type/${TypeRarity}/${TypeName}/${i}.png`), 0, 0)
                        .draw(images(`./Armour/${ArmourRarity}/${ArmourName}/${i}.png`), 0, 0)
                        .draw(images(`./Head/${HeadRarity}/${HeadName}/${i}.png`), 0, 0)
                        .draw(images(`./Mouth/${MouthRarity}/${MouthName}/${i}.png`), 0, 0)
                        .save(`./export/${index}/${i}.png`, {
                            quality: 1
                        });
                }



                index += 1
            }

        } else {
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

                fs.mkdir(`./export/${index}`, () => {})

                for (let i = 1; i < 9; i++) {
                    images(`./Background/${backgroundRarity}/${backgroundName}/${i}.png`)
                        .draw(images(`./Type/${TypeRarity}/${TypeName}/${i}.png`), 0, 0)
                        .draw(images(`./Armour/${ArmourRarity}/${ArmourName}/${i}.png`), 0, 0)
                        .draw(images(`./Eyes/bandana/${EyesName}/${i}.png`), 0, 0)
                        .draw(images(`./Head/${HeadRarity}/${HeadName}/${i}.png`), 0, 0)
                        .draw(images(`./Mouth/${MouthRarity}/${MouthName}/${i}.png`), 0, 0)
                        .save(`./export/${index}/${i}.png`, {
                            quality: 1
                        });
                }
                index += 1
            }

        }
    } else if (HeadName.includes('vintage')) {
        EyesName = 'angry_eyebrows'

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


            fs.mkdir(`./export/${index}`, () => {})

            for (let i = 1; i < 9; i++) {
                images(`./Background/${backgroundRarity}/${backgroundName}/${i}.png`)
                    .draw(images(`./Type/${TypeRarity}/${TypeName}/${i}.png`), 0, 0)
                    .draw(images(`./Armour/${ArmourRarity}/${ArmourName}/${i}.png`), 0, 0)
                    .draw(images(`./Eyes/bandana/${EyesName}/${i}.png`), 0, 0)
                    .draw(images(`./Head/${HeadRarity}/${HeadName}/${i}.png`), 0, 0)
                    .draw(images(`./Mouth/${MouthRarity}/${MouthName}/${i}.png`), 0, 0)
                    .save(`./export/${index}/${i}.png`, {
                        quality: 1
                    });
            }



            index += 1
        }

    } else if(HeadName.includes('green_mytic_cap') || HeadName.includes('aviator_hat')) {
        EyesName = Green_Mytic_Cap[getRandomInt(0,Green_Mytic_Cap.length)]

        if (EyesName === 'none') {
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
                ]
            }

            metaHash = hash(metadata)

            const x = metadataArray.find(_metadata => _metadata === metaHash)


            if(!x) {
                metadata["name"] = `${index}`
                metadataArray.push(metaHash);
                metadata = {}


                fs.mkdir(`./export/${index}`, () => {})

                for (let i = 1; i < 9; i++) {
                    images(`./Background/${backgroundRarity}/${backgroundName}/${i}.png`)
                        .draw(images(`./Type/${TypeRarity}/${TypeName}/${i}.png`), 0, 0)
                        .draw(images(`./Armour/${ArmourRarity}/${ArmourName}/${i}.png`), 0, 0)
                        .draw(images(`./Head/${HeadRarity}/${HeadName}/${i}.png`), 0, 0)
                        .draw(images(`./Mouth/${MouthRarity}/${MouthName}/${i}.png`), 0, 0)
                        .save(`./export/${index}/${i}.png`, {
                            quality: 1
                        });
                }
                index += 1
            }
        } else {
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


                fs.mkdir(`./export/${index}`, () => {})

                for (let i = 1; i < 9; i++) {
                    images(`./Background/${backgroundRarity}/${backgroundName}/${i}.png`)
                        .draw(images(`./Type/${TypeRarity}/${TypeName}/${i}.png`), 0, 0)
                        .draw(images(`./Armour/${ArmourRarity}/${ArmourName}/${i}.png`), 0, 0)
                        .draw(images(`./Eyes/green_mytic_cap/${EyesName}/${i}.png`), 0, 0)
                        .draw(images(`./Head/${HeadRarity}/${HeadName}/${i}.png`), 0, 0)
                        .draw(images(`./Mouth/${MouthRarity}/${MouthName}/${i}.png`), 0, 0)
                        .save(`./export/${index}/${i}.png`, {
                            quality: 1
                        });
                }


                index += 1
            }
        }


    } else if (HeadName.includes('bunny_hat')) {
        EyesName = bunny_hat[getRandomInt(0,bunny_hat.length)]

        if (EyesName === 'none') {
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
                ]
            }

            metaHash = hash(metadata)

            const x = metadataArray.find(_metadata => _metadata === metaHash)


            if(!x) {
                metadata["name"] = `${index}`
                metadataArray.push(metaHash);
                metadata = {}


                fs.mkdir(`./export/${index}`, () => {})

                for (let i = 1; i < 9; i++) {
                    images(`./Background/${backgroundRarity}/${backgroundName}/${i}.png`)
                        .draw(images(`./Type/${TypeRarity}/${TypeName}/${i}.png`), 0, 0)
                        .draw(images(`./Armour/${ArmourRarity}/${ArmourName}/${i}.png`), 0, 0)
                        .draw(images(`./Head/${HeadRarity}/${HeadName}/${i}.png`), 0, 0)
                        .draw(images(`./Mouth/${MouthRarity}/${MouthName}/${i}.png`), 0, 0)
                        .save(`./export/${index}/${i}.png`, {
                            quality: 1
                        });
                }
                index += 1
            }
        } else {
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


                fs.mkdir(`./export/${index}`, () => {})

                for (let i = 1; i < 9; i++) {
                    images(`./Background/${backgroundRarity}/${backgroundName}/${i}.png`)
                        .draw(images(`./Type/${TypeRarity}/${TypeName}/${i}.png`), 0, 0)
                        .draw(images(`./Armour/${ArmourRarity}/${ArmourName}/${i}.png`), 0, 0)
                        .draw(images(`./Eyes/bunny_hat/${EyesName}/${i}.png`), 0, 0)
                        .draw(images(`./Head/${HeadRarity}/${HeadName}/${i}.png`), 0, 0)
                        .draw(images(`./Mouth/${MouthRarity}/${MouthName}/${i}.png`), 0, 0)
                        .save(`./export/${index}/${i}.png`, {
                            quality: 1
                        });
                }


                index += 1
            }
        }


    } else if (HeadName.includes('chinese_mask') ||
        HeadName.includes('medieval_helmet') ||
        HeadName.includes('beast_mask') ||
        HeadName.includes('dragon_mask') ||
        HeadName.includes('medieval_half_mask') ||
        HeadName.includes('dino_mask') ||
        HeadName.includes('top_hat'))
    {
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
            ]
        }

        metaHash = hash(metadata)

        const x = metadataArray.find(_metadata => _metadata === metaHash)


        if(!x) {
            metadata["name"] = `${index}`
            metadataArray.push(metaHash);
            metadata = {}


            fs.mkdir(`./export/${index}`, () => {})

            for (let i = 1; i < 9; i++) {
                images(`./Background/${backgroundRarity}/${backgroundName}/${i}.png`)
                    .draw(images(`./Type/${TypeRarity}/${TypeName}/${i}.png`), 0, 0)
                    .draw(images(`./Armour/${ArmourRarity}/${ArmourName}/${i}.png`), 0, 0)
                    .draw(images(`./Head/${HeadRarity}/${HeadName}/${i}.png`), 0, 0)
                    .draw(images(`./Mouth/${MouthRarity}/${MouthName}/${i}.png`), 0, 0)
                    .save(`./export/${index}/${i}.png`, {
                        quality: 1
                    });
            }
            index += 1
        }
    } else {
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


            fs.mkdir(`./export/${index}`, () => {})

            for (let i = 1; i < 9; i++) {
                images(`./Background/${backgroundRarity}/${backgroundName}/${i}.png`)
                    .draw(images(`./Type/${TypeRarity}/${TypeName}/${i}.png`), 0, 0)
                    .draw(images(`./Armour/${ArmourRarity}/${ArmourName}/${i}.png`), 0, 0)
                    .draw(images(`./Eyes/${EyesRarity}/${EyesName}/${i}.png`), 0, 0)
                    .draw(images(`./Head/${HeadRarity}/${HeadName}/${i}.png`), 0, 0)
                    .draw(images(`./Mouth/${MouthRarity}/${MouthName}/${i}.png`), 0, 0)
                    .save(`./export/${index}/${i}.png`, {
                        quality: 1
                    });
            }


            index += 1
        }
    }




    /*
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


        fs.mkdir(`./export/${index}`, () => {})

        for (let i = 1; i < 9; i++) {
            images(`./Background/${backgroundRarity}/${backgroundName}/${i}.png`)
                .draw(images(`./Type/${TypeRarity}/${TypeName}/${i}.png`), 0, 0)
                .draw(images(`./Armour/${ArmourRarity}/${ArmourName}/${i}.png`), 0, 0)
                .draw(images(`./Eyes/${EyesRarity}/${EyesName}/${i}.png`), 0, 0)
                .draw(images(`./Head/${HeadRarity}/${HeadName}/${i}.png`), 0, 0)
                .draw(images(`./Mouth/${MouthRarity}/${MouthName}/${i}.png`), 0, 0)
                .save(`./export/${index}/${i}.png`, {
                    quality: 1
                });
        }



        index += 1
    }
     */

}


generateSprites()


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (
        max - min)) + min;
}


