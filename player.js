class Player {
    constructor(ctx, url, keys, framesCounter){
        this._ctx = ctx
        this._image = new Image
        this._image.src = url
        this._height = 150
        this._width = 70
        this._posX = window.innerWidth/2
        this._posY = window.innerHeight - this._height - 20
        this._keys = keys
        this._velX = 30
        this._bullet = undefined
        this._bullets = []
        this._image.frames = 6           //Indicamos el numero de frames que tiene la imagen
        this._image.framesIndex = 0
        this._framesCounter = framesCounter
        this._lives = 3
        this._distanceScore = 1
        this.setListeners()
        this._color = "red"
    }

    draw() {
        this._ctx.drawImage(this._image,
            this._image.framesIndex * Math.floor(this._image.width/this._image.frames),
            0, 
            Math.floor(this._image.width/this._image.frames),
            this._image.height,
            this._posX, this._posY, 
            this._width,this._height)
        if(this._bullets[0] != undefined) {
            this._bullets[0].draw() 
        }
        this._ctx.fillStyle = this._color
        this._ctx.fillText("Lives player" + this._distanceScore +":  " +this._lives, 250*this._distanceScore, 50)
    }
    

    goRight() {
        if (this._posX + this._width < window.innerWidth) {
        this._posX += this._velX
        this._image.framesIndex++
        if(this._image.framesIndex>1) {
            this._image.framesIndex = 0
              }  
        }
    }

    goLeft() {
        if (this._posX > 0){
        this._posX -= this._velX
        this._image.framesIndex++
        if(this._image.framesIndex>3) {
            this._image.framesIndex = 2
              }  
        }  
    }

    setListeners() {
        document.addEventListener("keydown",
        (e) => {
            if (e.keyCode === this._keys.RIGHT) {
               // this._image.framesIndex = 0
                this.goRight()
            }
            if (e.keyCode === this._keys.LEFT) {
                //this._image.framesIndex = 3
                this.goLeft()
            }
            if (e.keyCode === this._keys.SHOOT) {
                this._bullet = new Bullet(this._ctx, this._posX, this._width)
                if(this._bullets.length == 0)
                {this._bullets.push(this._bullet)}
            }
        })
        // document.onkeydown = 
        document.onkeyup = (e) => {
            if (e.keyCode === this._keys.RIGHT) {
                this._image.framesIndex = 5 //esto lo tengo que modificar cuando tenga la imagen bien
            }
            if (e.keyCode === this._keys.LEFT) {
                this._image.framesIndex = 5
            }
        }

    }

}
