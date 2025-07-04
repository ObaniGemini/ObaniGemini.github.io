var BUTTONS = []
var background
var description

const main = () => {
	let properties = [
		['Gitlab', new Color( 255, 255, 255 ), new Color( 0, 0, 0 ), 'https://gitlab.com/obani/', 'Personal code-heavy oriented projects'],
		['GitHub', new Color( 0, 0, 0 ), new Color( 255, 255, 255 ), 'https://github.com/ObaniGemini/', 'More diverse projects and contributions'],
		['Itch.io', new Color( 255, 255, 255 ), new Color( 0, 0, 0 ), 'https://obanigarage.itch.io/', 'Jam games'],
		['PropFight on Steam', new Color( 23, 29, 37 ), new Color( 255, 255, 255 ), 'https://store.steampowered.com/app/2881590/PropFight/', 'A game I made, published on Steam'],
		//['Cocaine Diesel', new Color( 255, 204, 38 ), new Color( 0, 0, 0 ), 'https://cocainediesel.fun/', 'A game I worked on'],
		['NO TYPE BEAT', new Color( 54, 0, 28 ), new Color( 255, 255, 255 ), 'https://www.youtube.com/@notypebeat1150', 'A music channel I run'],
		['Spotify', new Color( 2, 212, 85 ), new Color( 0, 0, 0 ), 'https://open.spotify.com/artist/2rE2eyZAeLXhVvT4M0rPcQ', 'Basically the soundtrack to my game, and other stuff'],
		['Drummer at Cosmic Cow', new Color( 29, 29, 29 ), new Color( 255, 255, 255 ), 'https://cosmiccowband.bandcamp.com/', 'Jazz/Funk/Hip-Hop band I play with'],
		['Soundcloud', new Color( 255, 90, 0 ), new Color( 0, 0, 0 ), 'https://soundcloud.com/obani', 'Songs I published a few years ago'],
	]


	background = new Background()
	description = new Description( properties.length )
	properties.forEach( (prop, idx) => BUTTONS.push(new Button(idx, description, prop[0], prop[1], prop[2], prop[3], prop[4])) )
	background.setButtons( BUTTONS )

	resize()
}

const resize = () => {
	let numElements = BUTTONS.length
	let actualHeight = window.innerHeight

	background.resize()
	description.resize()

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