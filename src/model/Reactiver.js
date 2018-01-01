import { ReactiveDefine, GenerateId } from "../utils"
import { Listener } from "./Listener"

export class Reactiver {
    constructor(options = {}) {
        this._listeners = []
        this._reactiverId = GenerateId()
        ReactiveDefine.call(this, Object.keys(options))
        Object.keys(options).forEach((prop) => {
            this[prop] = options[prop]
        })
    }

    getReactiveId() {
        return this._reactiverId
    }

    addReactiveProp(prop, value){
        ReactiveDefine.call(this, [prop])
        this[prop] = value
    }

    listen(listener) {
        if (!(listener instanceof Listener)) {
            throw new Error("Cant create none bindRx listener")
            return
        }
        if (this._listeners.indexOf(listener) === -1) {
            this._listeners.push(listener)
        }
    }

    unlisten(listener) {
        if (!(listener instanceof Listener)) {
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
}