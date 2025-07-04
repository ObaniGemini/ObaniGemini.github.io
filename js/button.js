class Button {
	constructor( index = 0, description = new Description(0), text = "", bg_color = new Color(), text_color = new Color(), href = "", description_text = "" ) {
		this.index = index
		this.description = description

		this.currentHeight = 0.0
		this.goalHeight = 0.0
		this.stepHeight = 0.0

		this.button = document.createElement( "a" )
		this.button.className = "mainButton"

		this.backgroundColor = bg_color
		this.textColor = text_color

		this.button.textContent = text
		this.button.href = "#"
		this.button.style.backgroundColor = this.backgroundColor.rgba()
		this.button.style.color = this.textColor.rgba()

		this.desciptionText = description_text

		this.button.onclick = () => {
			console.log("Button '" + text + "' pressed")
			window.open(href)
		}

		this.button.onmouseover = () => this.setHover(true)
		this.button.onmouseout = () => this.setHover(false)

		document.body.appendChild(this.button)

		this.button.onmouseout()
	}

	setHover( hovered ) {
		this.hovered = hovered

		if( this.height ) {
			this.resize(this.height)
		}

		this.description.setButton( this )
	}

	setAlpha( v = 1.0 ) {
		this.backgroundColor.a = v
		this.button.style.backgroundColor = this.backgroundColor.rgba()
	}

	animate() {
		let oldHeight = this.currentHeight
		this.currentHeight += this.stepHeight

		let ended = (this.currentHeight >= this.goalHeight && this.stepHeight > 0.0) || (this.currentHeight <= this.goalHeight && this.stepHeight < 0.0)
		if (ended) {
			this.currentHeight = this.goalHeight
		}

		this.button.style.fontSize = this.currentHeight.toString() + 'px'

		if (!ended) {
			window.requestAnimationFrame(this.animate.bind(this))
		}
	}

	resize( height = 0.0 ) {
		this.height = height

		let factor = this.hovered ? 0.5 : 0.42
		this.goalHeight = (height * factor * (72.0 / 96.0))
		this.stepHeight = (this.goalHeight - this.currentHeight) * 0.1

		this.button.style.height = height.toString() + 'px'

		window.requestAnimationFrame(this.animate.bind(this))
	}
}