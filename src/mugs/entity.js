import PooledObject from './pooled_object';

export default class Entity extends PooledObject {
	constructor() {
		super()
		this.components = [];
	}

	add(componentType) {
		const args = Array.prototype.slice.call(arguments, 1);
		const component = componentType.create.apply(componentType, args);
		component.setEntity(this);
		this.components.push(component);
		return this;
	}
}