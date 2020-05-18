/**
 * Javascript vanilla dynanmic html element maker
 */

// HTML element
let el =[
	{
		type:'label',
		id:'idLabel',
		value:'title',
	},
	{
		type:'input',
		id:'idInput',
		value:'value ...',
		events:{
			blur:foo, 				// normal-init
			change: ()=>{			// lazy-init
				console.log(getCompValue("idInput"));
			},
		}
	},
	{
		type:'label',
		id:'idLabel2',
		value:'title2',
	},
	{
		type:'input',
		id:'idInput2',
		value:'value ...',
		events:{
			blur:foo,
			blur:foo2,
			change:()=>{
				console.log("can bind anonymous");
				foo3(getCompValue("idInput2")); // bind function in function that even take param
			},
		}
	},
	{
		type:'label',
		id:'errorLabel',
		value:'',
	},
	{
		type:'button',
		id:'idButton',
		value:'ok',
		events:{
			click:bar,
		}
	}
]

// Function for html tag
function foo(){
	console.log(baz());
}
function foo2(){
	console.log("can bind more than 1 function");
}
function foo3(x){
	console.log("with param " + x);
}

function getCompValue(id){
	return document.getElementById(id).value;
}

function bar(){
	let v = document.getElementById("errorLabel");
	if(v.innerText === '')
		v.innerText = baz();
	else
		v.innerText = '';
}
function baz(){
	return document.getElementById("idInput").value +
		document.getElementById("idInput2").value;
}

/** ===========================================================================
 * Just create element and bind events:
 * ============================================================================*/
let build = (components) => {
	let child = [];
	for (let elem in components) {

		// Create Element could easily
		// Change at need
		let e = document.createElement(components[elem].type);
		e.id = components[elem].id;
		e.innerText = e.placeholder = components[elem].value;

		// Map event with associate function then bind them
		if(components[elem].events){
			Object.keys(components[elem].events).map(function(key){
				return [String(key), components[elem].events[key]];
			}).forEach(ev=>{
				e.addEventListener(ev[0],ev[1]);
			});
		}

		// Add event to return array
		child.push(e);
	}
	return child;
};


/** ===========================================================================
 * Just adding them to DOM
 * ============================================================================*/
build(el).forEach(comp => {
	document.getElementsByTagName('body')[0].appendChild(comp);
	document.getElementsByTagName('body')[0].appendChild(document.createElement('br'));
});