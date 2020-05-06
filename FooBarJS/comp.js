// class Builder {
//
//     static createLabel(id, text){
//         let el = document.createElement("label");
//         el.id = id;
//         el.textContent = text;
//         return el;
//     }
//
//     static createButton(id, text){
//         let el = document.createElement("button");
//         el.id = id;
//         el.textContent = text;
//         return el;
//     }
//
//     static createSelect(id, opt){
//         let el = document.createElement("select");
//         el.id = id;
//         opt.forEach((o)=>{
//             let item = document.createElement("option", o);
//             item.value = o;
//             el.appendChild(item);
//         });
//         return el;
//     }
//
//     static createPanel(id){
//         let el = document.createElement("div");
//         el.id = id;
//         return el;
//     }
//
//     static createSpan(id){
//         let el = document.createElement("span");
//         el.id = id;
//         return el;
//     }
//
//
// }