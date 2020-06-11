
/** ===========================================================================
 * @author:JJ
 *  Just a spec for html comp
 * ============================================================================*/
let el =[
		{
			type:'div',
			components:
			[
			    {
					type:'p',
					id:'idNucl',
					value:'nuclear launch',
					events:{
						mouseover: ()=> {
							console.log("onmouseflyover");
						}
					}
			    },
			    {
					type:'div',
					components:[
						{   
							type:'label',
							id: 'idCompPoc',
							value:'1-2 attention please',
							events:	{
								mouseover:()=>{
									let x = document.getElementById("errorLabel");
									x.innerText = "YUPPPPP";
									x.style.color = "RED";
									x.style.visibility = "visible";
								},
								mouseout:()=>{
									let x = document.getElementById("errorLabel");
									x.style.visibility = "hidden";
								}
							}
				    	}
					]
			    }
			]
		},
		{
			type:'label',
			value:'title',
		},
		{
			type:'input',
			id: 'idInput1',
			value:'value ...',
			events:{
				change: ()=>{
		       		 let v = document.getElementById("idCompPoc");
		       		 v.innerText = document.getElementById("idInput1").value;
				},
			}
		},
		{
			type:'label',
			id:'idInput1',
			value:'title2',
		},
		{
			type:'input',
			id:'idInput2',
			value:'value ...',
			events:{
				change:()=>{
					console.log("can bind anonymous");
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
				click:()=>{
					alert("clicked");	
				}
			}
		}
	]


/** ===========================================================================
 * Just create element and bind events:
 * ============================================================================*/
let build = (components) => {
	let child = [];
	for (let elem in components) {

		// Create Element could easily
		let e = document.createElement(components[elem].type);
        
		// if id is defined set it
		if (components[elem].id)
		    e.id = components[elem].id;

		// if value is defined set it        
		if (components[elem].value)
		    e.innerText = e.placeholder = components[elem].value;

		// Map event with associate function then bind them
		if(components[elem].events)
			Object.keys(components[elem].events).map(function(key){
				return [String(key), components[elem].events[key]];
			}).forEach(ev=>{
				e.addEventListener(ev[0],ev[1]);
			});
		
		// Recursive call to append child
		if (components[elem].components)
		    build(components[elem].components).forEach(child => {
		        e.appendChild(child);
		    });
		
		// Add event to return array
		child.push(e);
	}
	return child;
};


/** ===========================================================================
 *  Just adding the array to the body
 * ============================================================================*/
build(el).forEach(comp => {
	document.getElementsByTagName('body')[0].appendChild(comp);
	document.getElementsByTagName('body')[0].appendChild(document.createElement("br"));
});
