export default class PooledObject {
	constructor() {
	}

	static initObjectPool() {
		if (!this.objectPool) {
			this.objectPool = {
				all: [],
				live: [],
				dead: [],
				liveIndex: {},
				dirty: false
			}
		}
	}

	static create() {
		this.initObjectPool();

		let instance = null;

		if (this.objectPool.dead.length > 0) {
			instance = this.objectPool.dead.pop();
		}

		else {
			instance = new this();
			instance.id = this.objectPool.all.length;
			this.objectPool.all.push(instance);
		}

		this.apply(instance, arguments);
		this.objectPool.liveIndex[instance.id] = true;
		this.objectPool.live.push(instance);

		return instance;
	}

	static destroy(instance) {
		this.objectPool.dead.push(instance);
		this.objectPool.liveIndex[instance.id] = false;
		this.objectPool.dirty = true;
	}

	static forEach(callback) {
		for (let i=0; i<this.all.length; i++) {
			if (this.liveIndex[i]) {
				callback(this.objectPool.all[i]);
			}
		}
	}

	static all() {
		this.initObjectPool();
		if (this.objectPool.dirty) {
			this.objectPool.live.length = 0;
			for (let i=0; i<this.all.length; i++) {
				if (this.liveIndex[i]) {
					this.objectPool.live.push(this.objectPool.all[i]);
				}
			}
			this.objectPool.dirty = false;		
		}
		return this.objectPool.live;
	}

	static byId(id) {
		return this.objectPool.all[id];
	}

}