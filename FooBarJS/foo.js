/***
 *
 */
class Builder {

    static createLabel(id, text){
        let el = document.createElement("label");
        el.id = id;
        el.textContent = text;
        return el;
    }

    static createButton(id, text){
        let el = document.createElement("button");
        el.id = id;
        el.textContent = text;
        return el;
    }

    static createSelect(id, opt){
        let el = document.createElement("select");
        el.id = id;
        opt.forEach((o)=>{
            let item = document.createElement("option", o);
            item.value = o;
            el.appendChild(item);
        });
        return el;
    }

    static createPanel(id, children){
        let el = document.createElement("div");
        el.id = id;

        children.forEach(function(child){
            el.appendChild(child);
        });

        return el;
    }

    static createSpan(id){
        let el = document.createElement("span");
        el.id = id;
        return el;
    }


}

/**
let car = function() {
    this.numWheels    = 4;
    this.manufacturer = 'Tesla';
    this.make         = 'Model S';
}

car.prototype = function() {

    let go = function() {
        // Rotate wheels
    };

    let stop = function() {
        // Apply brake pads
    };

    return {
        pressBrakePedal: stop,
        pressGasPedal: go
    }

}();


let ert = new car();
ert.pressBrakePedal();
ert.pressGasPedal();
 **/

let carMaker = (handler,type,model,year) => {

    /**
     * State Of Car
     */
    const STOP = {
        color: "#bbbbbb",
        go:  () => {
            car.state = START;
            car.speed = 0;
        },
        show: () => {
            return "Stopped";
        }
    };
    const START = {
        color: "green",
        go:  () => {
            car.state = STOP;
        },
        show: () => {
            return "Started";
        }
    };


    /**
     * Component model
     */
    let car = {
        brand:type,
        model:model,
        year:year,
        speed:0,
        state:STOP,

        update: () => {
            car.state.go();
            view.update();
        },

        toString: () => {
            return car.brand + " " + car.model + " " + car.year + " " + car.state.show();
        }
    };

    /**
     * Component View
     */
    let view = {
        handle: handler,
        init: () => {
            view.handle[0].innerHTML = car.brand + " " + car.model;
            view.handle[1].addEventListener('click', function(){ car.update(); } );
            view.handle[0].addEventListener('mouseover', function(){
                view.handle[0].innerHTML = car.brand + " " + car.model + " : " + car.speed + "mph";
            } );
            view.handle[0].addEventListener('mouseout', function(){
                view.handle[0].innerHTML = car.brand + " " + car.model;
            } );
            view.handle[0].addEventListener('click', function(){
                car.speed += 10;
                view.handle[0].innerHTML = car.brand + " " + car.model + " : " + car.speed + "mph";
            } );
            return this;
        },
        update: () => {
            view.handle[1].style.background = car.state.color;
        }
    };


    /**
     * Component Controller
     */
    let controller = {
        view: view.init(),
        model: car,
        execute : function(name){
            return CarManager[name] && CarManager[name].apply( CarManager, [].slice.call(arguments, 1) );
        }
    }

    /**
     * Component Command
     */
    let CarManager = {

            getInfo: function(){
                alert(car.toString());
            },

            setCruise: function(speed){
                car.speed = speed;
            },

        }


    return controller;
}



let carUI = (function(id, text)  {
    let p = Builder.createLabel("l1"+id,text);
    let m = Builder.createLabel("l3"+id,"yeaggggg");
    let y = Builder.createPanel("div", [m,p] );
    let r = Builder.createSpan(""); r.className = "dot";
    document.getElementsByTagName('body')[0].appendChild(y);
    document.getElementsByTagName('body')[0].appendChild(r);
    return [y,r];
});


let car1 = carMaker(carUI('car1', 'auto 1'),"Honda", "Accord", 1998);
let car2 = carMaker(carUI('car2', 'auto 2'),"Ford", "Fiesta", 2002);


car1.execute("getInfo");
car1.execute("setCruise", 100);


