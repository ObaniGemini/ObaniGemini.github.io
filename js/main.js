var BUTTONS = []

const main = () => {
	let properties = [
		['Gitlab', new Color( 255, 255, 255 ), new Color( 0, 0, 0 ), 'https://gitlab.com/obani/'],
		['GitHub', new Color( 0, 0, 0 ), new Color( 255, 255, 255 ), 'https://github.com/ObaniGemini/'],
		['Itch.io', new Color( 255, 255, 255 ), new Color( 0, 0, 0 ), 'https://obanigarage.itch.io/'],
		['PropFight on Steam', new Color( 23, 29, 37 ), new Color( 255, 255, 255 ), 'https://store.steampowered.com/app/2881590/PropFight/'],
		['YouTube', new Color( 255, 0, 51 ), new Color( 0, 0, 0 ), 'https://www.youtube.com/@obanigarage'],
		['NO TYPE BEAT', new Color( 54, 0, 28 ), new Color( 255, 255, 255 ), 'https://www.youtube.com/@notypebeat1150'],
		['Twitch', new Color( 169, 112, 255 ), new Color( 0, 0, 0 ), 'https://www.twitch.tv/obanigarage'],
	]

	properties.forEach((prop) => BUTTONS.push(new Button(prop[0], prop[1], prop[2], prop[3])))

	resize()
}

const resize = () => {
	let numElements = BUTTONS.length
	let actualHeight = window.innerHeight

	BUTTONS.forEach(
		(btn) => {
			let height = actualHeight/numElements
			actualHeight -= height
			numElements -= 1
			btn.resize(height)
		})
}

window.addEventListener("load", main);
window.addEventListener("resize", resize)