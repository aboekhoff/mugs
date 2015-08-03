(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _mugsEngine = require('./mugs/engine');

var _mugsEngine2 = _interopRequireDefault(_mugsEngine);

var _mugsEntity = require('./mugs/entity');

var _mugsEntity2 = _interopRequireDefault(_mugsEntity);

var _mugsComponent = require('./mugs/component');

var _mugsComponent2 = _interopRequireDefault(_mugsComponent);

var _mugsSystem = require('./mugs/system');

var _mugsSystem2 = _interopRequireDefault(_mugsSystem);

var WHITE = '#FFFFFF';
var BLACK = '#000000';
var GRAY = '#666666';
var RED = '#DD3333';
var GREEN = '#33DD33';
var BLUE = '#3333DD';

window.mugs = {
	Entity: _mugsEntity2['default'],
	Component: _mugsComponent2['default'],
	System: _mugsSystem2['default'],
	Engine: _mugsEngine2['default']
};

var canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

var engine = new _mugsEngine2['default']();

var ControlComponent = (function (_Component) {
	function ControlComponent() {
		_classCallCheck(this, ControlComponent);

		_get(Object.getPrototypeOf(ControlComponent.prototype), 'constructor', this).call(this);
		this.rotateRight = false;
		this.rotateLeft = false;
		this.thrustForward = false;
		this.thrustBackward = false;
	}

	_inherits(ControlComponent, _Component);

	return ControlComponent;
})(_mugsComponent2['default']);

var TransformComponent = (function (_Component2) {
	function TransformComponent(position, rotation) {
		_classCallCheck(this, TransformComponent);

		_get(Object.getPrototypeOf(TransformComponent.prototype), 'constructor', this).call(this);
		this.position = position || { x: 0, y: 0 };
		this.rotation = rotation || 0;
	}

	_inherits(TransformComponent, _Component2);

	return TransformComponent;
})(_mugsComponent2['default']);

var MotionComponent = (function (_Component3) {
	function MotionComponent() {
		var options = arguments[0] === undefined ? {} : arguments[0];

		_classCallCheck(this, MotionComponent);

		_get(Object.getPrototypeOf(MotionComponent.prototype), 'constructor', this).call(this);
		this.acceleration = options.acceleration || { x: 0, y: 0 };
		this.velocity = options.velocity || { x: 0, y: 0 };
	}

	_inherits(MotionComponent, _Component3);

	return MotionComponent;
})(_mugsComponent2['default']);

var RenderComponent = (function (_Component4) {
	function RenderComponent() {
		var options = arguments[0] === undefined ? {} : arguments[0];

		_classCallCheck(this, RenderComponent);

		_get(Object.getPrototypeOf(RenderComponent.prototype), 'constructor', this).call(this);
		this.shape = options.shape || 'circle';
		this.size = options.size || 10;
		this.outline = options.outline || '#222222';
		this.fill = options.fill || '#33CC33';
	}

	_inherits(RenderComponent, _Component4);

	return RenderComponent;
})(_mugsComponent2['default']);

var InputSystem = new _mugsSystem2['default']([MotionComponent, ControlComponent], function update(dt, xs) {});

var PhysicsSystem = new _mugsSystem2['default']([TransformComponent, MotionComponent], function update(dt, xs) {
	xs.forEach(function (x) {
		var t = TransformComponent.get(x);
		var m = MotionComponent.get(x);
		t.position.x += m.velocity.x * dt / 1000;
		t.position.y += m.velocity.y * dt / 1000;

		if (t.position.x < 0) {
			t.position.x = 0;
			m.velocity.x *= -1;
		} else if (t.position.x > canvas.width) {
			t.position.x = canvas.width;
			m.velocity.x *= -1;
		}

		if (t.position.y < 0) {
			t.position.y = 0;
			m.velocity.y *= -1;
		} else if (t.position.y > canvas.height) {
			t.position.y = canvas.height;
			m.velocity.y *= -1;
		}
	});
});

var RenderingSystem = new _mugsSystem2['default']([TransformComponent, RenderComponent], function update(dt, xs) {
	var ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	xs.forEach(function (x) {
		var t = TransformComponent.get(x);
		var r = RenderComponent.get(x);
		ctx.strokeStyle = r.outline;
		ctx.fillStyle = r.fill;
		ctx.beginPath();
		ctx.arc(t.position.x, t.position.y, r.size, 0, 2 * Math.PI, false);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
	});
});

engine.add(InputSystem);
engine.add(PhysicsSystem);
engine.add(RenderingSystem);

window.engine = engine;

function randomInt(min, max) {
	if (arguments.length === 1) {
		max = min;min = 0;
	}
	return Math.round(Math.random() * (max - min)) + min;
}

function randomFloat(min, max) {
	if (arguments.length === 1) {
		max = min;min = 0;
	}
	return Math.random() * (max - min) + min;
}

function randomRGBA() {
	var r = randomInt(255);
	var g = randomInt(255);
	var b = randomInt(255);
	var a = Math.random();
	return 'rgba(' + [r, g, b, a].join(',') + ')';
}

window.randomRGB = function randomRGB() {
	var r = randomInt(255);
	var g = randomInt(255);
	var b = randomInt(255);
	return '#' + (r | g << 8 | b << 16).toString(16);
};

function randomBall() {
	_mugsEntity2['default'].create().add(TransformComponent, { x: randomInt(0, canvas.width), y: randomInt(0, canvas.height) }, 0).add(RenderComponent, { fill: randomRGB(), size: randomInt(4, 32) }).add(MotionComponent, { velocity: { x: randomFloat(-128, 128), y: randomFloat(-128, 128) } });
}

for (var i = 0; i < 800; i++) {
	randomBall();
}

window.RenderComponent = RenderComponent;
window.TransformComponent = TransformComponent;
window.MotionComponent = MotionComponent;

window.engine = engine;
engine.start();

},{"./mugs/component":2,"./mugs/engine":3,"./mugs/entity":4,"./mugs/system":6}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _pooled_object = require('./pooled_object');

var _pooled_object2 = _interopRequireDefault(_pooled_object);

var Component = (function (_PooledObject) {
	function Component() {
		_classCallCheck(this, Component);

		_get(Object.getPrototypeOf(Component.prototype), 'constructor', this).call(this);
		this.entityId = null;
	}

	_inherits(Component, _PooledObject);

	_createClass(Component, [{
		key: 'destroy',
		value: function destroy() {
			this['super']();
			this.constructor.updateIndex(this.entityId, null);
		}
	}, {
		key: 'setEntity',
		value: function setEntity(entity) {
			this.entityId = entity.id;
			this.constructor.updateIndex(entity.id, this);
		}
	}], [{
		key: 'get',
		value: function get(entity) {
			return this.index[entity.id];
		}
	}, {
		key: 'updateIndex',
		value: function updateIndex(entityId, value) {
			if (typeof this.index == 'undefined') {
				this.index = {};
			}
			this.index[entityId] = value;
		}
	}]);

	return Component;
})(_pooled_object2['default']);

exports['default'] = Component;
module.exports = exports['default'];

},{"./pooled_object":5}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _entity = require('./entity');

var _entity2 = _interopRequireDefault(_entity);

var Engine = (function () {
	function Engine() {
		_classCallCheck(this, Engine);

		this.systems = [];
		this.deltaTime = 0;
		this.lastTime = null;
	}

	_createClass(Engine, [{
		key: 'add',
		value: function add(system) {
			system.active = true;
			this.systems.push(system);
		}
	}, {
		key: 'start',
		value: function start() {
			this.lastTime = new Date().getTime();
			this.deltaTime = 0;
			this.running = true;
			this.run();
		}
	}, {
		key: 'stop',
		value: function stop() {
			this.running = false;
		}
	}, {
		key: 'run',
		value: function run() {
			var _this = this;

			var loop = function loop() {
				if (!_this.running) {
					return;
				}

				var currentTime = new Date().getTime();
				_this.deltaTime = currentTime - _this.lastTime;
				_this.lastTime = currentTime;

				// console.log(currentTime, this.lastTime, this.elapsedTime)

				for (var i = 0; i < _this.systems.length; i++) {
					var system = _this.systems[i];
					if (system.active) {
						_this.runSystem(system);
					}
				}

				window.requestAnimationFrame(loop);
			};

			window.requestAnimationFrame(loop);
		}
	}, {
		key: 'runSystem',
		value: function runSystem(system) {
			if (system.dependencies.length === 0) {
				system.update(this.deltaTime, []);
				return;
			}

			if (system.dependencies.length === 1) {
				var entities = system.dependencies[0].all().map(function (cmp) {
					return _entity2['default'].byId(cmp.entityId);
				});
				system.update(this.deltaTime, entities);
				return;
			}

			var groups = system.dependencies.map(function (d) {
				return d.all();
			}).sort(function (xs) {
				return xs.length;
			});

			var candidates = groups[0].map(function (cmp) {
				return _entity2['default'].byId(cmp.entityId);
			});

			var result = [];

			search: for (var i = 0; i < candidates.length; i++) {
				var candidate = candidates[i];
				for (var j = 1; j < groups.length; j++) {
					if (!system.dependencies[j].get(candidate)) {
						continue search;
					}
				}
				result.push(candidate);
			}

			system.update(this.deltaTime, result);
		}
	}]);

	return Engine;
})();

exports['default'] = Engine;
module.exports = exports['default'];

},{"./entity":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _pooled_object = require('./pooled_object');

var _pooled_object2 = _interopRequireDefault(_pooled_object);

var Entity = (function (_PooledObject) {
	function Entity() {
		_classCallCheck(this, Entity);

		_get(Object.getPrototypeOf(Entity.prototype), 'constructor', this).call(this);
		this.components = [];
	}

	_inherits(Entity, _PooledObject);

	_createClass(Entity, [{
		key: 'add',
		value: function add(componentType) {
			var args = Array.prototype.slice.call(arguments, 1);
			var component = componentType.create.apply(componentType, args);
			component.setEntity(this);
			this.components.push(component);
			return this;
		}
	}]);

	return Entity;
})(_pooled_object2['default']);

exports['default'] = Entity;
module.exports = exports['default'];

},{"./pooled_object":5}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PooledObject = (function () {
	function PooledObject() {
		_classCallCheck(this, PooledObject);
	}

	_createClass(PooledObject, null, [{
		key: "initObjectPool",
		value: function initObjectPool() {
			if (!this.objectPool) {
				this.objectPool = {
					all: [],
					live: [],
					dead: [],
					liveIndex: {},
					dirty: false
				};
			}
		}
	}, {
		key: "create",
		value: function create() {
			this.initObjectPool();

			var instance = null;

			if (this.objectPool.dead.length > 0) {
				instance = this.objectPool.dead.pop();
			} else {
				instance = new this();
				instance.id = this.objectPool.all.length;
				this.objectPool.all.push(instance);
			}

			this.apply(instance, arguments);
			this.objectPool.liveIndex[instance.id] = true;
			this.objectPool.live.push(instance);

			return instance;
		}
	}, {
		key: "destroy",
		value: function destroy(instance) {
			this.objectPool.dead.push(instance);
			this.objectPool.liveIndex[instance.id] = false;
			this.objectPool.dirty = true;
		}
	}, {
		key: "forEach",
		value: function forEach(callback) {
			for (var i = 0; i < this.all.length; i++) {
				if (this.liveIndex[i]) {
					callback(this.objectPool.all[i]);
				}
			}
		}
	}, {
		key: "all",
		value: function all() {
			this.initObjectPool();
			if (this.objectPool.dirty) {
				this.objectPool.live.length = 0;
				for (var i = 0; i < this.all.length; i++) {
					if (this.liveIndex[i]) {
						this.objectPool.live.push(this.objectPool.all[i]);
					}
				}
				this.objectPool.dirty = false;
			}
			return this.objectPool.live;
		}
	}, {
		key: "byId",
		value: function byId(id) {
			return this.objectPool.all[id];
		}
	}]);

	return PooledObject;
})();

exports["default"] = PooledObject;
module.exports = exports["default"];

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var System = (function () {
	function System(dependencies, update) {
		_classCallCheck(this, System);

		this.dependencies = dependencies;
		this.update = update;
	}

	_createClass(System, [{
		key: "update",
		value: function update(deltaTime, entities) {}
	}]);

	return System;
})();

exports["default"] = System;
module.exports = exports["default"];

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYW5keS9Qcm9qZWN0cy9tdWdzL3NyYy9tdWdzLmpzIiwiL1VzZXJzL2FuZHkvUHJvamVjdHMvbXVncy9zcmMvbXVncy9jb21wb25lbnQuanMiLCIvVXNlcnMvYW5keS9Qcm9qZWN0cy9tdWdzL3NyYy9tdWdzL2VuZ2luZS5qcyIsIi9Vc2Vycy9hbmR5L1Byb2plY3RzL211Z3Mvc3JjL211Z3MvZW50aXR5LmpzIiwiL1VzZXJzL2FuZHkvUHJvamVjdHMvbXVncy9zcmMvbXVncy9wb29sZWRfb2JqZWN0LmpzIiwiL1VzZXJzL2FuZHkvUHJvamVjdHMvbXVncy9zcmMvbXVncy9zeXN0ZW0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OzBCQ0FtQixlQUFlOzs7OzBCQUNmLGVBQWU7Ozs7NkJBQ1osa0JBQWtCOzs7OzBCQUNyQixlQUFlOzs7O0FBRWxDLElBQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQztBQUN4QixJQUFNLEtBQUssR0FBRyxTQUFTLENBQUM7QUFDeEIsSUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDO0FBQ3ZCLElBQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQztBQUN0QixJQUFNLEtBQUssR0FBRyxTQUFTLENBQUM7QUFDeEIsSUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDOztBQUV2QixNQUFNLENBQUMsSUFBSSxHQUFHO0FBQ2IsT0FBTSx5QkFBUTtBQUNkLFVBQVMsNEJBQVc7QUFDcEIsT0FBTSx5QkFBUTtBQUNkLE9BQU0seUJBQVE7Q0FDZCxDQUFBOztBQUVELElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDaEQsTUFBTSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO0FBQ2pDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFdB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QUFNLEVBQUU7d0JBRGQsTUFBTTs7QUFFekIsTUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7QUFDakMsTUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7RUFDckI7O2NBSm1CLE1BQU07O1NBTXBCLGdCQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsRUFDM0I7OztRQVBtQixNQUFNOzs7cUJBQU4sTUFBTSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgRW5naW5lIGZyb20gJy4vbXVncy9lbmdpbmUnO1xuaW1wb3J0IEVudGl0eSBmcm9tICcuL211Z3MvZW50aXR5JztcbmltcG9ydCBDb21wb25lbnQgZnJvbSAnLi9tdWdzL2NvbXBvbmVudCc7XG5pbXBvcnQgU3lzdGVtIGZyb20gJy4vbXVncy9zeXN0ZW0nO1xuXG5jb25zdCBXSElURSA9IFwiI0ZGRkZGRlwiO1xuY29uc3QgQkxBQ0sgPSBcIiMwMDAwMDBcIjtcbmNvbnN0IEdSQVkgPSBcIiM2NjY2NjZcIjtcbmNvbnN0IFJFRCA9IFwiI0REMzMzM1wiO1xuY29uc3QgR1JFRU4gPSBcIiMzM0REMzNcIjtcbmNvbnN0IEJMVUUgPSBcIiMzMzMzRERcIjtcblxud2luZG93Lm11Z3MgPSB7XG5cdEVudGl0eTogRW50aXR5LFxuXHRDb21wb25lbnQ6IENvbXBvbmVudCxcblx0U3lzdGVtOiBTeXN0ZW0sXG5cdEVuZ2luZTogRW5naW5lXG59XG5cbmNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG5jYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjYW52YXMpO1xuXG5jb25zdCBlbmdpbmUgPSBuZXcgRW5naW5lKCk7XG5cbmNsYXNzIENvbnRyb2xDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMucm90YXRlUmlnaHQgPSBmYWxzZTtcblx0XHR0aGlzLnJvdGF0ZUxlZnQgID0gZmFsc2U7XG5cdFx0dGhpcy50aHJ1c3RGb3J3YXJkID0gZmFsc2U7XG5cdFx0dGhpcy50aHJ1c3RCYWNrd2FyZCA9IGZhbHNlOyBcblx0fVxufVxuXG5jbGFzcyBUcmFuc2Zvcm1Db21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRjb25zdHJ1Y3Rvcihwb3NpdGlvbiwgcm90YXRpb24pIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbiB8fCB7IHg6IDAsIHk6IDB9O1xuXHRcdHRoaXMucm90YXRpb24gPSByb3RhdGlvbiB8fCAwO1xuXHR9XG59XG5cbmNsYXNzIE1vdGlvbkNvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5hY2NlbGVyYXRpb24gPSBvcHRpb25zLmFjY2VsZXJhdGlvbiB8fCB7IHg6MCwgeTogMH1cblx0XHR0aGlzLnZlbG9jaXR5ID0gb3B0aW9ucy52ZWxvY2l0eSB8fCB7IHg6MCwgeTowIH1cblx0fVxufVxuXHRcbmNsYXNzIFJlbmRlckNvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5zaGFwZSA9IG9wdGlvbnMuc2hhcGUgfHwgXCJjaXJjbGVcIjtcblx0XHR0aGlzLnNpemUgPSBvcHRpb25zLnNpemUgfHwgMTA7XG5cdFx0dGhpcy5vdXRsaW5lID0gb3B0aW9ucy5vdXRsaW5lIHx8ICcjMjIyMjIyJztcblx0XHR0aGlzLmZpbGwgPSBvcHRpb25zLmZpbGwgfHwgJyMzM0NDMzMnO1xuXHR9XG59XG5cbmNvbnN0IElucHV0U3lzdGVtID0gbmV3IFN5c3RlbShcblx0W01vdGlvbkNvbXBvbmVudCwgQ29udHJvbENvbXBvbmVudF0sXG5cdGZ1bmN0aW9uIHVwZGF0ZShkdCwgeHMpIHtcblxuXHR9XG4pXG5cbmNvbnN0IFBoeXNpY3NTeXN0ZW0gPSBuZXcgU3lzdGVtKFxuXHRbVHJhbnNmb3JtQ29tcG9uZW50LCBNb3Rpb25Db21wb25lbnRdLFxuXHRmdW5jdGlvbiB1cGRhdGUoZHQsIHhzKSB7XG5cdFx0eHMuZm9yRWFjaCgoeCkgPT4ge1xuXHRcdFx0Y29uc3QgdCA9IFRyYW5zZm9ybUNvbXBvbmVudC5nZXQoeCk7XG5cdFx0XHRjb25zdCBtID0gTW90aW9uQ29tcG9uZW50LmdldCh4KTtcblx0XHRcdHQucG9zaXRpb24ueCArPSBtLnZlbG9jaXR5LnggKiBkdC8xMDAwO1xuXHRcdFx0dC5wb3NpdGlvbi55ICs9IG0udmVsb2NpdHkueSAqIGR0LzEwMDA7XG5cblx0XHRcdGlmICh0LnBvc2l0aW9uLnggPCAwKSB7XG5cdFx0XHRcdHQucG9zaXRpb24ueCA9IDA7XG5cdFx0XHRcdG0udmVsb2NpdHkueCAqPSAtMTtcblx0XHRcdH1cblxuXHRcdFx0ZWxzZSBpZiAodC5wb3NpdGlvbi54ID4gY2FudmFzLndpZHRoKSB7XG5cdFx0XHRcdHQucG9zaXRpb24ueCA9IGNhbnZhcy53aWR0aDtcblx0XHRcdFx0bS52ZWxvY2l0eS54ICo9IC0xOyBcblx0XHRcdH1cblxuXHRcdFx0aWYgKHQucG9zaXRpb24ueSA8IDApIHtcblx0XHRcdFx0dC5wb3NpdGlvbi55ID0gMDtcblx0XHRcdFx0bS52ZWxvY2l0eS55ICo9IC0xO1xuXHRcdFx0fVxuXG5cdFx0XHRlbHNlIGlmICh0LnBvc2l0aW9uLnkgPiBjYW52YXMuaGVpZ2h0KSB7XG5cdFx0XHRcdHQucG9zaXRpb24ueSA9IGNhbnZhcy5oZWlnaHQ7XG5cdFx0XHRcdG0udmVsb2NpdHkueSAqPSAtMTsgXG5cdFx0XHR9XG5cblx0XHR9KVxuXHR9XG5cdFx0XG4pXG5cblxuY29uc3QgUmVuZGVyaW5nU3lzdGVtID0gbmV3IFN5c3RlbShcblx0W1RyYW5zZm9ybUNvbXBvbmVudCwgUmVuZGVyQ29tcG9uZW50XSxcblx0ZnVuY3Rpb24gdXBkYXRlKGR0LCB4cykge1xuXHRcdGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXHRcdGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcblx0XHR4cy5mb3JFYWNoKCh4KSA9PiB7XG5cdFx0XHRjb25zdCB0ID0gVHJhbnNmb3JtQ29tcG9uZW50LmdldCh4KTtcblx0XHRcdGNvbnN0IHIgPSBSZW5kZXJDb21wb25lbnQuZ2V0KHgpO1xuXHRcdFx0Y3R4LnN0cm9rZVN0eWxlID0gci5vdXRsaW5lO1xuXHRcdFx0Y3R4LmZpbGxTdHlsZSA9IHIuZmlsbDtcblx0XHRcdGN0eC5iZWdpblBhdGgoKTtcblx0XHRcdGN0eC5hcmModC5wb3NpdGlvbi54LCB0LnBvc2l0aW9uLnksIHIuc2l6ZSwgMCwgMiAqIE1hdGguUEksIGZhbHNlKTtcblx0XHRcdGN0eC5jbG9zZVBhdGgoKTtcblx0XHRcdGN0eC5zdHJva2UoKTtcblx0XHRcdGN0eC5maWxsKCk7XG5cdFx0fSlcblx0fVxuKVxuXG5lbmdpbmUuYWRkKElucHV0U3lzdGVtKTtcbmVuZ2luZS5hZGQoUGh5c2ljc1N5c3RlbSk7XG5lbmdpbmUuYWRkKFJlbmRlcmluZ1N5c3RlbSk7XG5cbndpbmRvdy5lbmdpbmUgPSBlbmdpbmU7XG5cbmZ1bmN0aW9uIHJhbmRvbUludChtaW4sIG1heCkge1xuXHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuXHRcdG1heCA9IG1pbjsgbWluID0gMDtcblx0fVx0XG5cdHJldHVybiBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSkgKyBtaW47XG59XG5cbmZ1bmN0aW9uIHJhbmRvbUZsb2F0KG1pbiwgbWF4KSB7XG5cdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG5cdFx0bWF4ID0gbWluOyBtaW4gPSAwO1xuXHR9XG5cdHJldHVybiBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW47XG59XG5cbmZ1bmN0aW9uIHJhbmRvbVJHQkEoKSB7XG5cdGNvbnN0IHIgPSByYW5kb21JbnQoMjU1KTtcblx0Y29uc3QgZyA9IHJhbmRvbUludCgyNTUpO1xuXHRjb25zdCBiID0gcmFuZG9tSW50KDI1NSk7XG5cdGNvbnN0IGEgPSBNYXRoLnJhbmRvbSgpO1xuXHRyZXR1cm4gJ3JnYmEoJyArIFtyLCBnLCBiLCBhXS5qb2luKCcsJykgKyAnKSc7XG59XG5cbndpbmRvdy5yYW5kb21SR0IgPSBmdW5jdGlvbiByYW5kb21SR0IoKSB7XG5cdGNvbnN0IHIgPSByYW5kb21JbnQoMjU1KTtcblx0Y29uc3QgZyA9IHJhbmRvbUludCgyNTUpO1xuXHRjb25zdCBiID0gcmFuZG9tSW50KDI1NSk7XG5cdHJldHVybiAnIycgKyAociB8IChnIDw8IDgpIHwgKGIgPDwgMTYpKS50b1N0cmluZygxNik7XG59XG5cbmZ1bmN0aW9uIHJhbmRvbUJhbGwoKSB7XG5cdEVudGl0eVxuXHRcdC5jcmVhdGUoKVxuXHRcdC5hZGQoXG5cdFx0XHRUcmFuc2Zvcm1Db21wb25lbnQsXG5cdFx0XHR7eDogcmFuZG9tSW50KDAsIGNhbnZhcy53aWR0aCksIHk6IHJhbmRvbUludCgwLCBjYW52YXMuaGVpZ2h0KSB9LFxuXHRcdFx0MFxuXHRcdClcblx0XHQuYWRkKFxuXHRcdFx0UmVuZGVyQ29tcG9uZW50LCBcblx0XHRcdHtmaWxsOiByYW5kb21SR0IoKSwgc2l6ZTogcmFuZG9tSW50KDQsIDMyKX1cblx0XHQpXG5cdFx0LmFkZChcblx0XHRcdE1vdGlvbkNvbXBvbmVudCxcblx0XHRcdHsgdmVsb2NpdHk6IHsgeDogcmFuZG9tRmxvYXQoLTEyOCwgMTI4KSwgeTogcmFuZG9tRmxvYXQoLTEyOCwgMTI4KX0gfVxuXHRcdClcbn1cblxuZm9yIChsZXQgaT0wOyBpPDgwMDsgaSsrKSB7XG5cdHJhbmRvbUJhbGwoKTtcbn1cblxud2luZG93LlJlbmRlckNvbXBvbmVudCA9IFJlbmRlckNvbXBvbmVudDtcbndpbmRvdy5UcmFuc2Zvcm1Db21wb25lbnQgPSBUcmFuc2Zvcm1Db21wb25lbnQ7XG53aW5kb3cuTW90aW9uQ29tcG9uZW50ID0gTW90aW9uQ29tcG9uZW50O1xuXG53aW5kb3cuZW5naW5lID0gZW5naW5lO1xuZW5naW5lLnN0YXJ0KCk7IiwiaW1wb3J0IFBvb2xlZE9iamVjdCBmcm9tICcuL3Bvb2xlZF9vYmplY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21wb25lbnQgZXh0ZW5kcyBQb29sZWRPYmplY3Qge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpXG5cdFx0dGhpcy5lbnRpdHlJZCA9IG51bGw7XG5cdH1cblxuXHRkZXN0cm95KCkge1xuXHRcdHRoaXMuc3VwZXIoKTtcblx0XHR0aGlzLmNvbnN0cnVjdG9yLnVwZGF0ZUluZGV4KHRoaXMuZW50aXR5SWQsIG51bGwpO1xuXHR9XG5cblx0c2V0RW50aXR5KGVudGl0eSkge1xuXHRcdHRoaXMuZW50aXR5SWQgPSBlbnRpdHkuaWQ7XG5cdFx0dGhpcy5jb25zdHJ1Y3Rvci51cGRhdGVJbmRleChlbnRpdHkuaWQsIHRoaXMpO1xuXHR9XG5cblx0c3RhdGljIGdldCAoZW50aXR5KSB7XG5cdFx0cmV0dXJuIHRoaXMuaW5kZXhbZW50aXR5LmlkXTtcblx0fVxuXG5cdHN0YXRpYyB1cGRhdGVJbmRleChlbnRpdHlJZCwgdmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHRoaXMuaW5kZXggPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHRoaXMuaW5kZXggPSB7fTtcblx0XHR9XG5cdFx0dGhpcy5pbmRleFtlbnRpdHlJZF0gPSB2YWx1ZTtcblx0fVxuXG59IiwiaW1wb3J0IEVudGl0eSBmcm9tICcuL2VudGl0eSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVuZ2luZSB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuc3lzdGVtcyA9IFtdO1xuXHRcdHRoaXMuZGVsdGFUaW1lID0gMDtcblx0XHR0aGlzLmxhc3RUaW1lID0gbnVsbDtcblx0fVx0XG5cblx0YWRkKHN5c3RlbSkge1xuXHRcdHN5c3RlbS5hY3RpdmUgPSB0cnVlO1xuXHRcdHRoaXMuc3lzdGVtcy5wdXNoKHN5c3RlbSk7XG5cdH1cblxuXHRzdGFydCgpIHtcblx0XHR0aGlzLmxhc3RUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cdFx0dGhpcy5kZWx0YVRpbWUgPSAwO1xuXHRcdHRoaXMucnVubmluZyA9IHRydWU7XG5cdFx0dGhpcy5ydW4oKTtcblx0fVxuXG5cdHN0b3AoKSB7XG5cdFx0dGhpcy5ydW5uaW5nID0gZmFsc2U7XG5cdH1cblxuXHRydW4oKSB7XG5cdFx0Y29uc3QgbG9vcCA9ICgpID0+IHtcblx0XHRcdGlmICghdGhpcy5ydW5uaW5nKSB7IHJldHVybjsgfVxuXG5cdFx0XHRjb25zdCBjdXJyZW50VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXHRcdFx0dGhpcy5kZWx0YVRpbWUgPSBjdXJyZW50VGltZSAtIHRoaXMubGFzdFRpbWU7XG5cdFx0XHR0aGlzLmxhc3RUaW1lID0gY3VycmVudFRpbWU7XG5cblx0XHRcdC8vIGNvbnNvbGUubG9nKGN1cnJlbnRUaW1lLCB0aGlzLmxhc3RUaW1lLCB0aGlzLmVsYXBzZWRUaW1lKVxuXG5cdFx0XHRmb3IgKGxldCBpPTA7IGk8dGhpcy5zeXN0ZW1zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGNvbnN0IHN5c3RlbSA9IHRoaXMuc3lzdGVtc1tpXTtcblx0XHRcdFx0aWYgKHN5c3RlbS5hY3RpdmUpIHtcblx0XHRcdFx0XHR0aGlzLnJ1blN5c3RlbShzeXN0ZW0pXG5cdFx0XHRcdH1cblx0XHRcdH1cdFxuXG5cdFx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuXG5cdFx0fVxuXG5cdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcblx0XHRcblx0fVxuXG5cdHJ1blN5c3RlbShzeXN0ZW0pIHtcblx0XHRpZiAoc3lzdGVtLmRlcGVuZGVuY2llcy5sZW5ndGggPT09IDApIHtcblx0XHRcdHN5c3RlbS51cGRhdGUodGhpcy5kZWx0YVRpbWUsIFtdKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAoc3lzdGVtLmRlcGVuZGVuY2llcy5sZW5ndGggPT09IDEpIHtcblx0XHRcdGNvbnN0IGVudGl0aWVzID0gXG5cdFx0XHRcdHN5c3RlbS5kZXBlbmRlbmNpZXNbMF1cblx0XHRcdFx0XHQuYWxsKClcblx0XHRcdFx0XHQubWFwKChjbXApID0+IHsgcmV0dXJuIEVudGl0eS5ieUlkKGNtcC5lbnRpdHlJZCkgfSk7XG5cdFx0XHRzeXN0ZW0udXBkYXRlKHRoaXMuZGVsdGFUaW1lLCBlbnRpdGllcyk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ3JvdXBzID0gXG5cdFx0XHRzeXN0ZW0uZGVwZW5kZW5jaWVzXG5cdFx0XHRcdCAgLm1hcCgoZCkgPT4geyByZXR1cm4gZC5hbGwoKTsgfSlcblx0XHRcdCAgICAuc29ydCgoeHMpID0+IHsgcmV0dXJuIHhzLmxlbmd0aDsgfSlcblxuXHRcdGNvbnN0IGNhbmRpZGF0ZXMgPSBncm91cHNbMF1cblx0XHRcdC5tYXAoKGNtcCkgPT4geyByZXR1cm4gRW50aXR5LmJ5SWQoY21wLmVudGl0eUlkKSB9KTtcblxuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdFx0c2VhcmNoIDogZm9yIChsZXQgaT0wOyBpPGNhbmRpZGF0ZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbnN0IGNhbmRpZGF0ZSA9IGNhbmRpZGF0ZXNbaV07XG5cdFx0XHRmb3IgKGxldCBqPTE7IGo8Z3JvdXBzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGlmICghc3lzdGVtLmRlcGVuZGVuY2llc1tqXS5nZXQoY2FuZGlkYXRlKSkge1xuXHRcdFx0XHRcdGNvbnRpbnVlIHNlYXJjaFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXN1bHQucHVzaChjYW5kaWRhdGUpO1xuXHRcdH1cblxuXHRcdHN5c3RlbS51cGRhdGUodGhpcy5kZWx0YVRpbWUsIHJlc3VsdCk7XG5cdFxuXHR9XHRcblxufSIsImltcG9ydCBQb29sZWRPYmplY3QgZnJvbSAnLi9wb29sZWRfb2JqZWN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50aXR5IGV4dGVuZHMgUG9vbGVkT2JqZWN0IHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKVxuXHRcdHRoaXMuY29tcG9uZW50cyA9IFtdO1xuXHR9XG5cblx0YWRkKGNvbXBvbmVudFR5cGUpIHtcblx0XHRjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcblx0XHRjb25zdCBjb21wb25lbnQgPSBjb21wb25lbnRUeXBlLmNyZWF0ZS5hcHBseShjb21wb25lbnRUeXBlLCBhcmdzKTtcblx0XHRjb21wb25lbnQuc2V0RW50aXR5KHRoaXMpO1xuXHRcdHRoaXMuY29tcG9uZW50cy5wdXNoKGNvbXBvbmVudCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQb29sZWRPYmplY3Qge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0fVxuXG5cdHN0YXRpYyBpbml0T2JqZWN0UG9vbCgpIHtcblx0XHRpZiAoIXRoaXMub2JqZWN0UG9vbCkge1xuXHRcdFx0dGhpcy5vYmplY3RQb29sID0ge1xuXHRcdFx0XHRhbGw6IFtdLFxuXHRcdFx0XHRsaXZlOiBbXSxcblx0XHRcdFx0ZGVhZDogW10sXG5cdFx0XHRcdGxpdmVJbmRleDoge30sXG5cdFx0XHRcdGRpcnR5OiBmYWxzZVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBjcmVhdGUoKSB7XG5cdFx0dGhpcy5pbml0T2JqZWN0UG9vbCgpO1xuXG5cdFx0bGV0IGluc3RhbmNlID0gbnVsbDtcblxuXHRcdGlmICh0aGlzLm9iamVjdFBvb2wuZGVhZC5sZW5ndGggPiAwKSB7XG5cdFx0XHRpbnN0YW5jZSA9IHRoaXMub2JqZWN0UG9vbC5kZWFkLnBvcCgpO1xuXHRcdH1cblxuXHRcdGVsc2Uge1xuXHRcdFx0aW5zdGFuY2UgPSBuZXcgdGhpcygpO1xuXHRcdFx0aW5zdGFuY2UuaWQgPSB0aGlzLm9iamVjdFBvb2wuYWxsLmxlbmd0aDtcblx0XHRcdHRoaXMub2JqZWN0UG9vbC5hbGwucHVzaChpbnN0YW5jZSk7XG5cdFx0fVxuXG5cdFx0dGhpcy5hcHBseShpbnN0YW5jZSwgYXJndW1lbnRzKTtcblx0XHR0aGlzLm9iamVjdFBvb2wubGl2ZUluZGV4W2luc3RhbmNlLmlkXSA9IHRydWU7XG5cdFx0dGhpcy5vYmplY3RQb29sLmxpdmUucHVzaChpbnN0YW5jZSk7XG5cblx0XHRyZXR1cm4gaW5zdGFuY2U7XG5cdH1cblxuXHRzdGF0aWMgZGVzdHJveShpbnN0YW5jZSkge1xuXHRcdHRoaXMub2JqZWN0UG9vbC5kZWFkLnB1c2goaW5zdGFuY2UpO1xuXHRcdHRoaXMub2JqZWN0UG9vbC5saXZlSW5kZXhbaW5zdGFuY2UuaWRdID0gZmFsc2U7XG5cdFx0dGhpcy5vYmplY3RQb29sLmRpcnR5ID0gdHJ1ZTtcblx0fVxuXG5cdHN0YXRpYyBmb3JFYWNoKGNhbGxiYWNrKSB7XG5cdFx0Zm9yIChsZXQgaT0wOyBpPHRoaXMuYWxsLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAodGhpcy5saXZlSW5kZXhbaV0pIHtcblx0XHRcdFx0Y2FsbGJhY2sodGhpcy5vYmplY3RQb29sLmFsbFtpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIGFsbCgpIHtcblx0XHR0aGlzLmluaXRPYmplY3RQb29sKCk7XG5cdFx0aWYgKHRoaXMub2JqZWN0UG9vbC5kaXJ0eSkge1xuXHRcdFx0dGhpcy5vYmplY3RQb29sLmxpdmUubGVuZ3RoID0gMDtcblx0XHRcdGZvciAobGV0IGk9MDsgaTx0aGlzLmFsbC5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAodGhpcy5saXZlSW5kZXhbaV0pIHtcblx0XHRcdFx0XHR0aGlzLm9iamVjdFBvb2wubGl2ZS5wdXNoKHRoaXMub2JqZWN0UG9vbC5hbGxbaV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0aGlzLm9iamVjdFBvb2wuZGlydHkgPSBmYWxzZTtcdFx0XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLm9iamVjdFBvb2wubGl2ZTtcblx0fVxuXG5cdHN0YXRpYyBieUlkKGlkKSB7XG5cdFx0cmV0dXJuIHRoaXMub2JqZWN0UG9vbC5hbGxbaWRdO1xuXHR9XG5cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTeXN0ZW0ge1xuXHRjb25zdHJ1Y3RvcihkZXBlbmRlbmNpZXMsIHVwZGF0ZSkge1xuXHRcdHRoaXMuZGVwZW5kZW5jaWVzID0gZGVwZW5kZW5jaWVzO1xuXHRcdHRoaXMudXBkYXRlID0gdXBkYXRlO1xuXHR9XG5cblx0dXBkYXRlKGRlbHRhVGltZSwgZW50aXRpZXMpIHtcblx0fVxufSJdfQ==
