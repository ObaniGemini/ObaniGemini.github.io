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


const Trans = {
    LINEAR: "linear",
    SINE: "sine",
    SQUARE: "square",
    CUBE: "cube"
};


class IFloat {
	constructor(trans = Trans.LINEAR, init = 0.0) {
		this.value = init
		this.start = init
		this.goal = 0.0

		this.trans = trans

		this.current_step = 0
		this.num_steps = 0
		this.finished = true
	}

	set(goal = 0.0, steps = 1) {
		this.start = this.value
		this.goal = goal - this.start
		this.num_steps = steps
		this.current_step = 0
	}

	apply() {
		let d = this.current_step / this.num_steps
		return this.start + this.goal * (this.trans == Trans.CUBE ? d * d * d :
										this.trans == Trans.SQUARE ? d * d :
										this.trans == Trans.SINE ? Math.sin(d * Math.PI * 0.5) :
										d)
	}

	step() {
		this.current_step += 1

		if (this.current_step >= this.num_steps) {
			this.value = this.start + this.goal
			this.finished = true
		} else {
			this.value = this.apply()
			this.finished = false
		}

		return this.value
	}
}