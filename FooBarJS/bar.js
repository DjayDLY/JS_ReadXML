/**
 * A whole lot of fun ! =)
 * @param handler
 * @param c
 */
let circleMaker = (handler,c) => {

    /**
     * State Of Circle
     */
    const STOP = {
        color: "#bbbbbb",
        go:  () => {
            circle.start();
        },
    };
    const START = {
        color: c,
        go:  () => {
            circle.close();
        },
    };


    /**
     * Component model
     */
    let circle = {
        id: handler.id,
        subscriber: [],
        state:STOP,

        notify: () => {
            circle.subscriber.forEach((sub)=>{
                sub.execute("stop");
            });
        },

        update: () => {
            circle.state.go();
            circle.notify();
        },

        close: () => {
            circle.state = STOP;
            view.update();
        },

        start: () => {
            circle.state = START;
            view.update();
        },

    };




    /**
     * Component View
     */
    let view = {
        handle: handler,
        init: () => {
            view.handle.addEventListener('click', function(){ circle.update(); } );
            return this;
        },
        update: () => {
            view.handle.style.background = circle.state.color;
        },

    };


    /**
     * Component Controller
     */
    let controller = {
        view: view.init(),
        model: circle,
        execute : function(name){
            return CircleManager[name] && CircleManager[name].apply( CircleManager, [].slice.call(arguments, 1) );
        },
        attach : function(comp){
            comp.forEach((c)=>{controller.model.subscriber.push(c)});
        },

    }

    /**
     * Component Command
     */
    let CircleManager = {

        stop: function(){
            circle.close();
        },

        start: function(){
            circle.update();
        },

    }

    return controller;
}


let htmlComp = (function(id)  {
    let r = document.createElement("span"); r.className = "dot"; r.id = id;
    document.getElementsByTagName('body')[0].appendChild(r);
    return r;
});

let circle1 = circleMaker(htmlComp('c1'),"green");
let circle2 = circleMaker(htmlComp('c2'),"yellow");
let circle3 = circleMaker(htmlComp('c3'),"red");


circle1.attach([circle2,circle3]);
circle2.attach([circle1,circle3]);
circle3.attach([circle1,circle2]);
circle1.execute("start");



