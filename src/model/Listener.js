import { Reactiver } from "./Reactiver";

export class Listener {

    constructor() {
        this._callbacks = {}
    }

    __emit(object, event) {
        if (!(object instanceof Reactiver)) {
            throw new Error("Can't register callback fro none reactive component")
        }
        if (this._callbacks && this._callbacks[object.getReactiveId()] && this._callbacks[object.getReactiveId()][event.name]) {
            this._callbacks[object.getReactiveId()][event.name].forEach((callback) => {
                callback(event)
            })
        }
    }

    registerCallback(target, callback, eventName) {
        if (!(target instanceof Reactiver)) {
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
        if (!(target instanceof Reactiver)) {
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