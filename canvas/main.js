const initialize = () => {
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d');
    const img = new Image();
    const lensFlare1 = new Image();
    const lensFlare2 = new Image();
    lensFlare1.onload = () => {
        lensFlare2.onload = () => {
            img.onload = function(){
                canvas.width = img.width
                canvas.height = img.height
                ctx.drawImage(img, 0, 0)
                drawLensFlare(ctx, lensFlare1, 2659, 1366)
                drawLensFlare(ctx, lensFlare2, 2306, 1418)

                drawRainbowEyes(ctx, 2659, 1366)
                drawRainbowEyes(ctx, 2306, 1418)
                // download()
            }
        }
    }

    lensFlare1.crossOrigin = "anonymous"
    lensFlare1.src = '/assets/lens_flare1.png'
    lensFlare2.crossOrigin = "anonymous"
    lensFlare2.src = '/assets/lens_flare2.png'
    img.crossOrigin = "anonymous";
    img.src = '/assets/sank_image.jpg';
}

const drawRainbowEyes = (ctx, x, y) => {
    ctx.save()
    var length=ctx.canvas.width - x + 500;
    var startingHeight=10;
    var endingHeight= ctx.canvas.height/3
    var stops=[
        // Red
        {stop:0.00,color:'rgb(253,61,59,0.4)'},
        // Red
        {stop:0.15,color:'rgb(253,60,57)'},
        // Yellow
        {stop:0.25,color:'rgb(255,255,53, 0.8)'},
        {stop:0.35,color:'rgb(255,255,53)'},
        // White
        {stop:0.50,color:'rgb(255,255,255)'},
        // Light blue
        {stop:0.55,color:'rgb(118,255,255, 0.7)'},
        {stop:0.7,color:'rgb(118,255,255)'},
        // Purple
        {stop:0.75,color:'rgb(220,71,240)'},
        // Light Purple
        {stop:0.80,color:'rgb(249,146,255)'},
        // Purple
        {stop:0.85,color:'rgb(220,71,240,0.7)'},
        // Red
        {stop:0.9,color:'rgb(253,61,59,0.4)'},
        // {stop:1.00,color:'violet'},
    ];
    ctx.globalAlpha = 0.8
    var g=stretchedGradientRect(length,startingHeight,endingHeight,stops);
    ctx.translate(x - (startingHeight/2), y - (startingHeight/2));
    ctx.rotate(-Math.PI/10);
    ctx.drawImage(g, 0, 0)
    ctx.restore()
}

const drawLensFlare = (ctx, lensFlare, x, y) => {
    ctx.save()
    ctx.globalAlpha = 0.8
    var canvas = ctx.canvas;
    var c=document.createElement("canvas");
    var cctx=c.getContext("2d");
    c.width = canvas.width
    c.height = canvas.height
    cctx.drawImage(lensFlare, x - canvas.width/6,y - canvas.width/6, canvas.width/3, canvas.width/3)
    cctx.globalCompositeOperation = 'source-in'
    cctx.beginPath()
    cctx.rect(0,0,canvas.width,canvas.height)
    cctx.fillStyle = 'white'
    cctx.fill()
    ctx.drawImage(c, 0, 0, canvas.width, canvas.height)
    ctx.restore()
}

function stretchedGradientRect(length,startingHeight,endingHeight,stops){
    var y=startingHeight;
    var yInc=(endingHeight-startingHeight)/length;
    // create a temp canvas to hold the stretched gradient
    var c=document.createElement("canvas");
    var cctx=c.getContext("2d");

    c.width=length;
    c.height=endingHeight;
    // draw a series of vertical gradient lines with increasing height
    for(var x=0;x<length;x+=1){
        var gradient=cctx.createLinearGradient(0,0,0,y);
        for(var i=0;i<stops.length;i++){
            gradient.addColorStop(stops[i].stop,stops[i].color);
        }
        cctx.beginPath();
        cctx.moveTo(x,0);
        cctx.lineTo(x,y+2);
        cctx.strokeStyle=gradient;
        cctx.stroke();
        y+=yInc;
    }
    return(c);
}

// const download = function(){
//   var link = document.createElement('a');
//   link.download = 'filename.png';
//   link.href = document.getElementById('canvas').toDataURL('image/png')
//   link.click();
// }

initialize()