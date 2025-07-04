class Description {
	constructor( num_buttons = 0 ) {
		this.TRANS_TIME = 30

		this.index = 0
		this.numButtons = num_buttons

		this.r = new IFloat(Trans.SQUARE)
		this.g = new IFloat(Trans.SQUARE)
		this.b = new IFloat(Trans.SQUARE)

		this.height = 0.0
		this.position = new IFloat(Trans.SINE)

		this.text = document.createElement( "p" )
		this.text.className = "description"

		document.body.appendChild(this.text)
	}

	animate() {
		this.text.style.top = this.position.step().toString() + 'px'
		this.text.style.color = (new Color(this.r.step(), this.g.step(), this.b.step(), 0.8)).rgba()

		if (!this.position.finished) {
			window.requestAnimationFrame(this.animate.bind(this))
		}
	}

	setPosition() {
		this.position.set(this.height * 0.32 + this.height * this.index, this.TRANS_TIME)
		window.requestAnimationFrame(this.animate.bind(this))
/*		console.log("height: " + this.height.toString() + "    fontSize: " + this.text.style.fontSize)
		console.log("index: " + this.index.toString() + "    color: " + this.text.style.color)
		console.log("position: " + this.text.style.top)*/
	}

	setButton( button ) {
		this.r.set(button.textColor.r, this.TRANS_TIME)
		this.g.set(button.textColor.r, this.TRANS_TIME)
		this.b.set(button.textColor.r, this.TRANS_TIME)

		this.index = button.index
		this.text.innerText = button.desciptionText

		this.setPosition()
	}

	resize() {
		this.height = window.innerHeight/this.numButtons

		this.text.style.height = Math.round(this.height).toString() + 'px'
		this.text.style.fontSize = Math.round(this.height * (20.0 / 96.0)).toString() + 'px'

		this.setPosition()
	}
}