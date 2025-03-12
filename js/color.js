class Color {
	constructor( r = 1.0, g = 1.0, b = 1.0, a = 1.0 ) {
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