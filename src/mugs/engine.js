import Entity from './entity';

export default class Engine {
	constructor() {
		this.systems = [];
		this.deltaTime = 0;
		this.lastTime = null;
	}	

	add(system) {
		system.active = true;
		this.systems.push(system);
	}

	start() {
		this.lastTime = new Date().getTime();
		this.deltaTime = 0;
		this.running = true;
		this.run();
	}

	stop() {
		this.running = false;
	}

	run() {
		const loop = () => {
			if (!this.running) { return; }

			const currentTime = new Date().getTime();
			this.deltaTime = currentTime - this.lastTime;
			this.lastTime = currentTime;

			// console.log(currentTime, this.lastTime, this.elapsedTime)

			for (let i=0; i<this.systems.length; i++) {
				const system = this.systems[i];
				if (system.active) {
					this.runSystem(system)
				}
			}	

			window.requestAnimationFrame(loop);

		}

		window.requestAnimationFrame(loop);
		
	}

	runSystem(system) {
		if (system.dependencies.length === 0) {
			system.update(this.deltaTime, []);
			return;
		}

		if (system.dependencies.length === 1) {
			const entities = 
				system.dependencies[0]
					.all()
					.map((cmp) => { return Entity.byId(cmp.entityId) });
			system.update(this.deltaTime, entities);
			return;
		}

		const groups = 
			system.dependencies
				  .map((d) => { return d.all(); })
			    .sort((xs) => { return xs.length; })

		const candidates = groups[0]
			.map((cmp) => { return Entity.byId(cmp.entityId) });

		const result = [];

		search : for (let i=0; i<candidates.length; i++) {
			const candidate = candidates[i];
			for (let j=1; j<groups.length; j++) {
				if (!system.dependencies[j].get(candidate)) {
					continue search
				}
			}
			result.push(candidate);
		}

		system.update(this.deltaTime, result);
	
	}	

}