class Color {
	constructor( r = 255, g = 255, b = 255, a = 1.0 ) {
		this.r = r
		this.g = g
		this.b = b
		this.a = a
	}

	rgb() {
		return 'rgb(' + this.r.toString() + ',' + this.g.toString() + ',' + this.b.toString() + ')'
	}

	rgba() {
		return 'rgba(' + this.r.toString() + ',' + this.g.toString() + ',' + this.b.toString() + ',' + this.a.toString() + ')'
	}
}