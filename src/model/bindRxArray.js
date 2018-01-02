export class bindRxArray extends Array {

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