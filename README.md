# bindRx
Library for reactive data binding


##Usage
```javascript
var react = new bindRx.Reactiver()

        var list = new bindRx.Listener()

        function reactChangeName(event){
            console.log(event)
            $("#test").text(event.newValue)
        }

        function reactAddName(event){
            console.log(event)
        }

        function reactRemoveName(event){
            console.log(event)
        }
        list.registerCallback(react, reactRemoveName, "remove")
        list.registerCallback(react, reactAddName, "add")
        list.registerCallback(react, reactChangeName, "set")
        list.registerCallback(react, reactChangeName, "change")
        react.listen(list)
        react.addReactiveProp("name", ["tester"])
        react.name.set(0, "tester2")
```