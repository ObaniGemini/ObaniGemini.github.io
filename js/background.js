const vertexShaderSource = `attribute vec2 a_position; void main() { gl_Position = vec4(a_position, 0.0, 1.0); }`;

const fragmentShaderSource = `
precision mediump float;

uniform sampler2D colors;

uniform float time;
uniform float width;
uniform float height;
uniform int numNodes;


float v(vec2 pos, float time) {
	return pos.y + cos(time + pos.y * 5.0 + pos.x * 5.0) * 0.05 * pos.x * pos.x;
}

vec3 fun(vec2 pos, float time, sampler2D c, int numNodes) {
	float v1 = v(pos, time);
	float mid = v1 < 0.0 || v1 > 1.0 ?
		0.0 :
		abs(float(int(v1 * float(numNodes) + 0.5)) - v1 * float(numNodes)) * 2.0;
	return mix(vec3(0.0), texture2D(c, vec2(0.0, v1)).rgb, sqrt(sqrt(mid)));
}

void main() {
	vec2 pos = (gl_FragCoord.xy / vec2(width, height) - vec2(0.5, 0.0));
	pos.x *= 2.0;
	pos.y = pos.y;

	gl_FragColor.rgb = fun(pos, time, colors, numNodes); 
}`;


class Background {
	constructor() {
		this.canvas = document.createElement( "canvas" )
		this.gl = this.canvas.getContext("webgl")
		this.image = new Image()

		if (this.gl) {
			this.gl.clearColor(0.0, 0.0, 0.0, 1.0)
			this.gl.clear(this.gl.COLOR_BUFFER_BIT)
			
			const vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER)
			this.gl.shaderSource(vertexShader, vertexShaderSource)
			this.gl.compileShader(vertexShader)

			const fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER)
			this.gl.shaderSource(fragmentShader, fragmentShaderSource)
			this.gl.compileShader(fragmentShader)

			const program = this.gl.createProgram()
			this.gl.attachShader(program, vertexShader)
			this.gl.attachShader(program, fragmentShader)
			this.gl.linkProgram(program)

			const positions = [
				-1.0, -1.0,
				 1.0, -1.0,
				 1.0,  1.0,
				-1.0,  1.0
			]

			const positionBuffer = this.gl.createBuffer()
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer)
			this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW)

			const positionAttributeLocation = this.gl.getAttribLocation(program, "a_position")
			this.gl.enableVertexAttribArray(positionAttributeLocation)
			this.gl.vertexAttribPointer(positionAttributeLocation, 2, this.gl.FLOAT, false, 0, 0)

			this.time = this.gl.getUniformLocation(program, "time")
			this.width = this.gl.getUniformLocation(program, "width")
			this.height = this.gl.getUniformLocation(program, "height")
			this.numNodes = this.gl.getUniformLocation(program, "numNodes")

			this.texture = this.gl.createTexture();
			this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);

			// Set the parameters so we can render any size image.
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);

			this.gl.useProgram(program)
			this.gl.drawArrays(this.gl.TRIANGLE_FAN, 0, 4)
		}

		document.body.appendChild(this.canvas)

		const draw = () => {
			this.gl.uniform1f(this.time, performance.now() * 0.001)
			//Draw a triangle strip connecting vertices 0-4
			this.gl.drawArrays(this.gl.TRIANGLE_FAN, 0, 4)
			requestAnimationFrame(draw);
		}

		draw()
	}

	setButtons(buttons) {
		let genBMPUri = (width, pixels) => {
			let LE = n => (n + 2**32).toString(16).match(/\B../g).reverse().join``;
			let wh = LE(width) + LE(pixels.length/width/4);
			let size = LE(109 + pixels.length);
			let r = n => '0'.repeat(n);
  
			let head = `424d${size}ZZ7BZ006CZ00${wh}01002Z3${r(50)}FFZFFZFFZZZFF${r(106)}`

			return "data:image/bmp;base64,"
				+ btoa(String.fromCharCode(...head.replace(/Z/g,'0000').match(/../g).map(x=> +`0x${x}`))) 
				+ btoa(pixels.map(p=>String.fromCharCode(p)).join``);
		}

		if (this.gl) {
			let pixels = []
			buttons.forEach((btn) => {
				pixels.push(btn.backgroundColor.b)
				pixels.push(btn.backgroundColor.g)
				pixels.push(btn.backgroundColor.r)
				pixels.push(0)
			})

			console.log(pixels)
			this.image.src = genBMPUri(1, pixels);			
			this.image.onload = () => this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, this.image);
			
			this.gl.uniform1i(this.numNodes, buttons.length)

			buttons.forEach((btn) => { btn.setAlpha(0.0) })
		} else {
			buttons.forEach((btn) => { btn.setAlpha(1.0) })
		}
	}

	resize() {
		this.canvas.style.width = window.innerWidth.toString() + 'px'
		this.canvas.style.height = window.innerHeight.toString() + 'px'
		this.canvas.width = window.innerWidth
		this.canvas.height = window.innerHeight

		this.gl.viewport(0, 0, window.innerWidth, window.innerHeight)
		this.gl.uniform1f(this.width, window.innerWidth)
  		this.gl.uniform1f(this.height, window.innerHeight)
	}
}