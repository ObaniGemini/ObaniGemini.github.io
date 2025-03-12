class Button {
	constructor( text = "", bg_color = new Color(), text_color =  new Color(), href = "" ) {
		this.button = document.createElement( "a" );
		this.button.className = "mainButton"

		bg_color.a = 1.0

		this.button.textContent = text
		this.button.href = "#"
		this.button.style.backgroundColor = bg_color.rgba()
		this.button.style.color = text_color.rgb()

		this.button.onclick = () => {
			console.log("Button '" + text + "' pressed")
			window.open(href)
		}

		document.body.appendChild( this.button );
	}

	resize( height = 0.0 ) {
		this.button.style.height = height.toString() + 'px'
		this.button.style.fontSize = (height * 0.5 * (72.0 / 96.0)).toString() + 'px'
	}
}