class Description {
	constructor( num_buttons = 0 ) {
		this.index = 0
		this.numButtons = num_buttons

		this.height = 0.0

		this.text = document.createElement( "p" )
		this.text.className = "description"

		document.body.appendChild(this.text)
	}

	setPosition() {
		this.text.style.top = Math.round(this.height * 0.32 + this.height * this.index).toString() + 'px'
/*		console.log("height: " + this.height.toString() + "    fontSize: " + this.text.style.fontSize)
		console.log("index: " + this.index.toString() + "    color: " + this.text.style.color)
		console.log("position: " + this.text.style.top)*/
	}

	setButton( button ) {
		let c = new Color(button.textColor.r, button.textColor.g, button.textColor.b, button.textColor.a * 0.75)

		this.index = button.index
		this.text.innerText = button.desciptionText
		this.text.style.color = c.rgba()

		this.setPosition()
	}

	resize() {
		this.height = window.innerHeight/this.numButtons

		this.text.style.height = Math.round(this.height).toString() + 'px'
		this.text.style.fontSize = Math.round(this.height * (20.0 / 96.0)).toString() + 'px'

		this.setPosition()
	}
}