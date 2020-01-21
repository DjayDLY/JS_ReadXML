/*
	@Author: Jerome Boucher-Veilleux
	@Date  : March 2019
*/
var carArray = new Array();

(function initMockup(xmlFile){

	/*
	*
	*	Classe Car
	* 	Nothing Complex
	*
	*/
	class Car{
		constructor(_Brand,_Make,_Year,_Color,_Price){
			this.brand = _Brand;
			this.make  = _Make;
			this.year  = _Year;
			this.color = _Color;
			this.price = _Price;
		}

		getBrand(){ return this.brand; }
		getMake (){ return this.make;  }
		getYear (){ return this.year;  }
		getColor(){ return this.color; }
		getPrice(){ return this.price; }

	}

	/*
	*
	*	Classe Query
	*	Bon on fait une interface pour pouvoir exploiter les donnes du genre
	*	!! J'ai faite juste des Get mais on aurait pu avoir des ADD / Delete / etc. !!
	*	!! Bref jpense pas qu'on est a manager le data fourni si oui bah c'est pas trop complique !!\
	*
	*/

	class Query{
			constructor(Data){
				this.data = Data;
			}

			/* Retourne une liste de toute les voitures */
			getAllCar(){
				return this.data;
			}

			/*
			* Retourne une liste de toute les voitures de
			*		@brand : input
			*		@make  : input
			*/
			getCarBy(brand, make){
				var ret = new Array();
				for(var i=0; i<this.data.length; i++){
						if(this.data[i].getBrand() === brand && this.data[i].getMake() === make){
								ret.push(this.data[i]);
						}
				}
				return ret;
			}

			/*
			* Retourne une liste de toute les voitures dont le prix est
			* inferieur a...
			*		@price : input
			*/
			getCarBy(price){
				var ret = new Array();
				for(var i=0; i<this.data.length; i++){
						if(this.data[i].getPrice() < price){
								ret.push(this.data[i]);
						}
				}
				return ret;
			}

		}


	/*
	*
	* 	Read XML
	*
	*/
	(function readXML(xmlFile){
		var xmlDoc;

		if(typeof window.DOMParser != "undefined") {
		    xmlhttp=new XMLHttpRequest();
		    xmlhttp.open("GET",xmlFile,false);
		    if (xmlhttp.overrideMimeType){
		        xmlhttp.overrideMimeType('text/xml');
		    }
		    xmlhttp.send();
		    xmlDoc=xmlhttp.responseXML;
		}
		else{
		    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		    xmlDoc.async="false";
		    xmlDoc.load(xmlFile);
		}


		/*
		*
		* 	Create object of type car and add it to the array
		*	Ici on initialise
		*
		*/

		var tagObj=xmlDoc.getElementsByTagName("car");

		for(var i=0; i<tagObj.length;i++){
				var brand = tagObj[i].getElementsByTagName("brand")[0].childNodes[0].nodeValue;
				var make  = tagObj[i].getElementsByTagName("make" )[0].childNodes[0].nodeValue;
				var year  = tagObj[i].getElementsByTagName("year" )[0].childNodes[0].nodeValue;
				var color = tagObj[i].getElementsByTagName("color")[0].childNodes[0].nodeValue;
				var price = tagObj[i].getElementsByTagName("price")[0].childNodes[0].nodeValue;

				const mCar = new Car(brand,make,year,color,price);
				carArray.push(mCar);
		}


		/*
		*
		*	POC
		*
		*/

			// J'initilise un Query-er avec mon data a l'interieur
			const q = new Query(carArray);

			// Ptite Popup box pour la POC
			alert("Prix Tesla Model-S :"+ q.getCarBy("Tesla","Model-S")[0].getPrice());

			// Vehicule sous les 100000.00$
			var str = "Car cheaper than 100000";
			var QuerySet = q.getCarBy(100000);
			for (var i=0; i < QuerySet.length; i++){
					str += "Model :" + QuerySet[i].getBrand() + "\n";
					str += "Make  :" + QuerySet[i].getMake () + "\n";
					str += "Color :" + QuerySet[i].getColor() + "\n";
					str += "Year  :" + QuerySet[i].getColor() + "\n";
					str += "\n\n";
			}
			alert(str);


	})(xmlFile);

})("mockup.xml");
