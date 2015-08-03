import Engine from './mugs/engine';
import Entity from './mugs/entity';
import Component from './mugs/component';
import System from './mugs/system';

const WHITE = "#FFFFFF";
const BLACK = "#000000";
const GRAY = "#666666";
const RED = "#DD3333";
const GREEN = "#33DD33";
const BLUE = "#3333DD";

window.mugs = {
	Entity: Entity,
	Component: Component,
	System: System,
	Engine: Engine
}

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

const engine = new Engine();

class ControlComponent extends Component {
	constructor() {
		super();
		this.rotateRight = false;
		this.rotateLeft  = false;
		this.thrustForward = false;
		this.thrustBackward = false; 
	}
}

class TransformComponent extends Component {
	constructor(position, rotation) {
		super();
		this.position = position || { x: 0, y: 0};
		this.rotation = rotation || 0;
	}
}

class MotionComponent extends Component {
	constructor(options = {}) {
		super();
		this.acceleration = options.acceleration || { x:0, y: 0}
		this.velocity = options.velocity || { x:0, y:0 }
	}
}
	
class RenderComponent extends Component {
	constructor(options = {}) {
		super();
		this.shape = options.shape || "circle";
		this.size = options.size || 10;
		this.outline = options.outline || '#222222';
		this.fill = options.fill || '#33CC33';
	}
}

const InputSystem = new System(
	[MotionComponent, ControlComponent],
	function update(dt, xs) {

	}
)

const PhysicsSystem = new System(
	[TransformComponent, MotionComponent],
	function update(dt, xs) {
		xs.forEach((x) => {
			const t = TransformComponent.get(x);
			const m = MotionComponent.get(x);
			t.position.x += m.velocity.x * dt/1000;
			t.position.y += m.velocity.y * dt/1000;

			if (t.position.x < 0) {
				t.position.x = 0;
				m.velocity.x *= -1;
			}

			else if (t.position.x > canvas.width) {
				t.position.x = canvas.width;
				m.velocity.x *= -1; 
			}

			if (t.position.y < 0) {
				t.position.y = 0;
				m.velocity.y *= -1;
			}

			else if (t.position.y > canvas.height) {
				t.position.y = canvas.height;
				m.velocity.y *= -1; 
			}

		})
	}
		
)


const RenderingSystem = new System(
	[TransformComponent, RenderComponent],
	function update(dt, xs) {
		const ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		xs.forEach((x) => {
			const t = TransformComponent.get(x);
			const r = RenderComponent.get(x);
			ctx.strokeStyle = r.outline;
			ctx.fillStyle = r.fill;
			ctx.beginPath();
			ctx.arc(t.position.x, t.position.y, r.size, 0, 2 * Math.PI, false);
			ctx.closePath();
			ctx.stroke();
			ctx.fill();
		})
	}
)

engine.add(InputSystem);
engine.add(PhysicsSystem);
engine.add(RenderingSystem);

window.engine = engine;

function randomInt(min, max) {
	if (arguments.length === 1) {
		max = min; min = 0;
	}	
	return Math.round(Math.random() * (max - min)) + min;
}

function randomFloat(min, max) {
	if (arguments.length === 1) {
		max = min; min = 0;
	}
	return Math.random() * (max - min) + min;
}

function randomRGBA() {
	const r = randomInt(255);
	const g = randomInt(255);
	const b = randomInt(255);
	const a = Math.random();
	return 'rgba(' + [r, g, b, a].join(',') + ')';
}

window.randomRGB = function randomRGB() {
	const r = randomInt(255);
	const g = randomInt(255);
	const b = randomInt(255);
	return '#' + (r | (g << 8) | (b << 16)).toString(16);
}

function randomBall() {
	Entity
		.create()
		.add(
			TransformComponent,
			{x: randomInt(0, canvas.width), y: randomInt(0, canvas.height) },
			0
		)
		.add(
			RenderComponent, 
			{fill: randomRGB(), size: randomInt(4, 32)}
		)
		.add(
			MotionComponent,
			{ velocity: { x: randomFloat(-128, 128), y: randomFloat(-128, 128)} }
		)
}

for (let i=0; i<800; i++) {
	randomBall();
}

window.RenderComponent = RenderComponent;
window.TransformComponent = TransformComponent;
window.MotionComponent = MotionComponent;

window.engine = engine;
engine.start();