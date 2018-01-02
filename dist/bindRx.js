/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Listener__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bindRxArray__ = __webpack_require__(2);




class Reactiver {
    constructor(options = {}) {
        this._listeners = []
        this._reactiverId = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* GenerateId */])()
        __WEBPACK_IMPORTED_MODULE_0__utils__["b" /* ReactiveDefine */].call(this, Object.keys(options))
        Object.keys(options).forEach((prop) => {
            this.__setReactiveProp(prop, options[prop])
        })
    }

    getReactiveId() {
        return this._reactiverId
    }

    addReactiveProp(prop, value) {
        __WEBPACK_IMPORTED_MODULE_0__utils__["b" /* ReactiveDefine */].call(this, [prop])
        this.__setReactiveProp(prop, value)
    }

    listen(listener) {
        if (!(listener instanceof __WEBPACK_IMPORTED_MODULE_1__Listener__["a" /* Listener */])) {
            throw new Error("Cant create none bindRx listener")
            return
        }
        if (this._listeners.indexOf(listener) === -1) {
            this._listeners.push(listener)
        }
    }

    unlisten(listener) {
        if (!(listener instanceof __WEBPACK_IMPORTED_MODULE_1__Listener__["a" /* Listener */])) {
            throw new Error("Cant unlisten none bindRx listener")
            return
        }
        if (this._listeners.indexOf(listener) > -1) {
            this._listeners.splice(this._listeners.indexOf(listener), 1)
        }
    }

    trigger(event) {
        this._listeners.forEach((listener) => {
            listener.__emit(this, event)
        })
    }

    __setReactiveProp(prop, value) {
        let newValue = value
        if (Array.isArray(newValue)) {
            newValue = new __WEBPACK_IMPORTED_MODULE_2__bindRxArray__["a" /* bindRxArray */](value, prop, this.trigger.bind(this))
        }
        this[prop] = newValue
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Reactiver;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Reactiver__ = __webpack_require__(0);


class Listener {

    constructor() {
        this._callbacks = {}
    }

    __emit(object, event) {
        if (!(object instanceof __WEBPACK_IMPORTED_MODULE_0__Reactiver__["a" /* Reactiver */])) {
            throw new Error("Can't register callback fro none reactive component")
        }
        if (this._callbacks && this._callbacks[object.getReactiveId()] && this._callbacks[object.getReactiveId()][event.name]) {
            this._callbacks[object.getReactiveId()][event.name].forEach((callback) => {
                callback(event)
            })
        }
    }

    registerCallback(target, callback, eventName) {
        if (!(target instanceof __WEBPACK_IMPORTED_MODULE_0__Reactiver__["a" /* Reactiver */])) {
            throw new Error("Can't register callback fro none reactive component")
        }
        if (this._callbacks[target.getReactiveId()]) {
            this.__addEventCallback(this._callbacks[target.getReactiveId()], callback, eventName)
            return
        }
        this._callbacks[target.getReactiveId()] = {}
        this.__addEventCallback(this._callbacks[target.getReactiveId()], callback, eventName)
    }

    unregisterCallback(target, callback, eventName) {
        if (!(target instanceof __WEBPACK_IMPORTED_MODULE_0__Reactiver__["a" /* Reactiver */])) {
            throw new Error("Can't unregister callback fro none reactive component")
        }
        if (this._callbacks[target.getReactiveId()]) {
            this.__removeEventCallback(this._callbacks[target.getReactiveId()], callback, eventName)
        }
    }

    __addEventCallback(target, callback, name) {
        if (target[name]) {
            target[name].push(callback)
            return
        }
        target[name] = [callback]
    }

    __removeEventCallback(target, callback, name) {
        if (target[name].indexOf && target[name].indexOf(callback) > -1) {
            target[name].splice(target[name].indexOf(callback), 1)
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Listener;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class bindRxArray extends Array {

    constructor(arg, prop, triggerFunction) {
        super(...arg)
        this.__property = prop
        this.__trigger = triggerFunction
    }

    push(item) {
        super.push.apply(this, [item])
        this.__trigger({
            key: this.__property,
            name: "add",
            value: item
        })
    }

    set(index, value) {
        const oldValue = this[index]
        this[index] = value
        this.__trigger({
            key: this.__property,
            name: "change",
            newValue: value,
            oldValue: oldValue
        })
    }

    pop() {
        const item = super.pop.apply(this)
        this.__trigger({
            key: this.__property,
            name: "remove",
            value: item
        })
    }

    shift() {
        const item = super.shift.apply(this)
        this.__trigger({
            key: this.__property,
            name: "remove",
            value: item
        })
    }

    unshift() {
        const item = super.unshift.apply(this)
        this.__trigger({
            key: this.__property,
            name: "add",
            value: item
        })
    }


    splice(index, deleteCount, itemN) {
        const item = super.unshift.apply(this, [index, deleteCount, itemN])
        this.__trigger({
            key: this.__property,
            name: "remove",
            value: item
        })
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = bindRxArray;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_Reactiver__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_Listener__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_bindRxArray__ = __webpack_require__(2);




window.bindRx = {
    Listener: __WEBPACK_IMPORTED_MODULE_1__model_Listener__["a" /* Listener */],
    Reactiver: __WEBPACK_IMPORTED_MODULE_0__model_Reactiver__["a" /* Reactiver */],
    bindRxArray: __WEBPACK_IMPORTED_MODULE_2__model_bindRxArray__["a" /* bindRxArray */]
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__reactiveDefine__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__reactiveDefine__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__generateId__ = __webpack_require__(6);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__generateId__["a"]; });



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = ReactiveDefine;
function ReactiveDefine(props = []) {
    if (props.length) {
        props.forEach((prop) => {
            let property = undefined
            Object.defineProperty(this, prop, {
                set: (value) => {
                    let oldValue = this[prop]
                    let newValue = value
                    let name = "set"
                    if (oldValue) {
                        name = "change"
                    }
                    property = value
                    if (this.trigger) {
                        this.trigger({
                            key: prop, name, newValue, oldValue
                        })
                    }

                },
                get: () => {
                    return property
                }
            })
        })
    }
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = GenerateId;
function GenerateId(prefix = "__reactiver_") {
    if (window.__reactiver) {
        window.__reactiver += 1
    } else {
        window.__reactiver = 1
    }
    return prefix + window.__reactiver
}


/***/ })
/******/ ]);