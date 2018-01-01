export function ReactiveDefine(props = []) {
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