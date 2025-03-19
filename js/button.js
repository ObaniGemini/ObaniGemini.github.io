class Button {
	constructor( text = "", bg_color = new Color(), text_color = new Color(), href = "" ) {
		this.button = document.createElement( "a" )
		this.button.className = "mainButton"

		this.backgroundColor = bg_color
		this.textColor = text_color

		this.button.textContent = text
		this.button.href = "#"
		this.button.style.backgroundColor = this.backgroundColor.rgba()
		this.button.style.color = this.textColor.rgba()


		this.button.onclick = () => {
			console.log("Button '" + text + "' pressed")
			window.open(href)
		}

		this.button.onmouseover = () => this.setHover(true)
		this.button.onmouseout = () => this.setHover(false)

		document.body.appendChild(this.button)

		this.button.onmouseout()
	}

	setHover(b) {
		this.hovered = b

		if(this.height) {
			this.resize(this.height)
		}
	}

	setAlpha( v = 1.0 ) {
		this.backgroundColor.a = v
		this.button.style.backgroundColor = this.backgroundColor.rgba()
	}

	resize( height = 0.0 ) {
		this.height = height

		let factor = this.hovered ? 0.45 : 0.5
		this.button.style.height = height.toString() + 'px'
		this.button.style.fontSize = (height * factor * (72.0 / 96.0)).toString() + 'px'
	}
}