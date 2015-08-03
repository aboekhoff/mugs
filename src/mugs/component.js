import PooledObject from './pooled_object';

export default class Component extends PooledObject {
	constructor() {
		super()
		this.entityId = null;
	}

	destroy() {
		this.super();
		this.constructor.updateIndex(this.entityId, null);
	}

	setEntity(entity) {
		this.entityId = entity.id;
		this.constructor.updateIndex(entity.id, this);
	}

	static get (entity) {
		return this.index[entity.id];
	}

	static updateIndex(entityId, value) {
		if (typeof this.index == 'undefined') {
			this.index = {};
		}
		this.index[entityId] = value;
	}

}