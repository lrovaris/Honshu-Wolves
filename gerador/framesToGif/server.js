const { createWriteStream } = require( 'fs' );
const path = require( 'path' );
const images = require( "images" );
const { promisify } = require( 'util' )
const hash = require( 'object-hash' )
const RandomHub = require( 'random-hub' ).RandomHub;
const hub = new RandomHub();
console.log( hub.getRandomHub() )
const { createCanvas, Image } = require( 'canvas' )
const GIFEncoder = require( "./GIFEncoder" );
const fs = require( 'fs' );



const readdir = promisify( require( 'fs' ).readdir )
let files
let dstPath
let index = 1
let limit = 2222

let readDirectories =  async function (id, callback) {
     files = await readdir("../export/"+id)

     dstPath = path.join('./gifs', `/${id}.gif`)

    callback ()
}

let afterReadDir = async function () {
    return new Promise(async resolve1 => {



        const writeStream = createWriteStream(dstPath)
        writeStream.on('close', () => {
            resolve1()
        })
        const encoder = new GIFEncoder('501', '501', 'neuquant', true, 8)
        encoder.createReadStream().pipe(writeStream)
        encoder.start()
        encoder.setDelay(100)
        encoder.setQuality(1)
        encoder.setRepeat(0)

        const canvas = createCanvas(501, 501)
        const ctx = canvas.getContext('2d')

        files.forEach((file) => {


            new Promise(resolve3 => {
                const image = new Image()
                image.onload = () => {
                    ctx.drawImage(image, 0, 0)
                    encoder.addFrame(ctx)
                    resolve3()
                }
                image.src = path.join('../export/'+index, file)
            })


        })
        encoder.finish()
        console.log(index)

    })
}


generateSprites()


async function generateSprites() {

    await readDirectories( index, () => {
        afterReadDir()
    } )

    if ( index >= limit ) {
        return
    }
    else {
        // calls itself
        index += 1
        generateSprites()
    }
}
