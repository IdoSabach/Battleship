(()=>{"use strict";class t{constructor(t){this.length=t,this.shipSunk=!1}get lengthOfShip(){return this.length}hits(){return this.length-=1}isSunk(){return 0===this.length?this.shipSunk=!0:this.shipSunk=!1}}class e{constructor(t){this.name=t}makeRandomAttack(t){let e=!1;for(;!e;){const o=t.getRandomAttackCoordinates(),{row:n,column:a}=o;t.isCoordinateAttacked(n,a)||(e=t.receiveAttack(n,a),m(n,a))}}makeAttack(t,e,o){t.receiveAttack(e,o)}}class o{constructor(t){this.rows=10,this.columns=10,this.grid=this.createBoard(),this.attacks=[],this.ships=[],this.name=t}createBoard(){return Array.from({length:this.rows},(()=>Array(this.columns).fill(null)))}placeShip(t,e,o,n=!1){n?this.placeShipInColumn(t,e,o):this.placeShipInRow(t,e,o)}placeRandomShip(t,e=!1){let o=!1;for(;!o;){const n=Math.floor(Math.random()*this.rows),a=Math.floor(Math.random()*this.columns);try{e?(this.placeShipInColumn(t,n,a),h(t.length,n,a,!0)):(this.placeShipInRow(t,n,a),h(t.length,n,a)),o=!0}catch(t){}}}placeShipInRow(t,e,o){if(o+t.lengthOfShip-1>10)throw new Error("Cannot place the ship at the given coordinates. Out of bounds.987");for(let n=0;n<t.lengthOfShip;n++)if(null!==this.grid[e][o+n])throw new Error("Cannot place the ship at the given coordinates. Another ship is already there.");for(let n=0;n<t.lengthOfShip;n++)this.grid[e][o+n]=t;this.ships.push(t)}placeShipInColumn(t,e,o){if(e+t.lengthOfShip-1>10)throw new Error("Cannot place the ship at the given coordinates. Out of bounds.123");for(let n=0;n<t.lengthOfShip;n++)if(null!==this.grid[e+n][o])throw new Error("Cannot place the ship at the given coordinates. Another ship is already there.");for(let n=0;n<t.lengthOfShip;n++)this.grid[e+n][o]=t;this.ships.push(t)}receiveAttack(t,e){if(this.attacks.some((o=>o.row===t&&o.column===e)))return console.log(`Coordinates (${t}, ${e}) have already been attacked. Please choose another pair.`),!1;{const o=this.grid[t][e];return null===o?this.grid[t][e]="o":(o.hits(),this.grid[t][e]="x"),this.attacks.push({row:t,column:e}),!0}}reportAttacks(){this.attacks.forEach((t=>console.log(`(${t.row}, ${t.column})`)))}areAllShipsSunk(){return this.ships.every((t=>t.isSunk()))}checkShipsStatus(){this.ships.forEach((t=>{0===t.lengthOfShip&&(t.shipSunk=!0)}))}getRandomAttackCoordinates(){return{row:Math.floor(Math.random()*this.rows),column:Math.floor(Math.random()*this.columns)}}isCoordinateAttacked(t,e){return this.attacks.some((o=>o.row===t&&o.column===e))}}const n=new o("player"),a=new o("computer"),r=new e("Player"),s=new e("Computer"),l=document.querySelector(".main"),i=document.querySelector(".boxForStart"),d=document.querySelector(".random"),c="icons8-boom-96.png";function h(t,e,o,n=!1){document.querySelectorAll(".boxOnGridToPlayer").forEach((a=>{const r=parseInt(a.dataset.row),s=parseInt(a.dataset.column);if(r===e&&s===o)for(let a=0;a<t;a++)if(n){const t=document.querySelector(`.boxOnGridToPlayer[data-row="${e+a}"][data-column="${o}"]`);t&&(t.style.backgroundColor="#adb5bd")}else{const t=document.querySelector(`.boxOnGridToPlayer[data-row="${e}"][data-column="${o+a}"]`);t&&(t.style.backgroundColor="#adb5bd")}}))}function u(e,o,n,a,r=!1){e.placeShip(new t(o),n,a,r)}const p=[];function m(t,e){p.forEach((o=>{const a=parseInt(o.dataset.row),r=parseInt(o.dataset.column);a===t&&r===e&&"x"===n.grid[t][e]?(setInterval((()=>{o.style.backgroundImage=`url(${c})`}),400),o.style.backgroundSize="cover"):a===t&&r===e&&"o"===n.grid[t][e]&&setInterval((()=>{o.style.backgroundColor="#bde0fe"}),400)}))}function f(t){t.addEventListener("click",(function(e){"none"===t.style.background&&(function(t,e){const o=t.currentTarget.dataset.row,s=t.currentTarget.dataset.column;null!==a.grid[o][s]?(e.style.backgroundImage=`url(${c})`,e.style.backgroundSize="cover",r.makeAttack(a,o,s),n.checkShipsStatus(),a.checkShipsStatus()):e.style.background="#bde0fe"}(e,t),s.makeRandomAttack(n),setTimeout((()=>{!function(){const t=document.querySelector(".popup"),e=document.querySelector(".text");a.areAllShipsSunk()?(t.style.display="flex",e.textContent="You Won!"):n.areAllShipsSunk()&&(t.style.display="flex",e.textContent="You Lose!"),document.querySelector(".btn").addEventListener("click",(function(){location.reload()}))}()}),500))}))}const y=document.querySelector(".boardOfStart"),g=document.querySelector(".btnSwitch"),S=document.querySelector(".boxForStart"),w=document.querySelectorAll(".ship"),x=document.querySelector(".one"),b=document.querySelector(".two"),k=document.querySelector(".three"),A=document.querySelector(".four"),C=document.querySelector(".five");function v(){!function(){for(let t=0;t<10;t++){E[t]=[];for(let e=0;e<10;e++){const o=document.createElement("div");o.classList.add("boxStart"),o.dataset.row=t,o.dataset.column=e,o.style["border-style"]="solid",o.style["border-width"]="0.5px",y.appendChild(o),E[t][e]=0}}}(),g.addEventListener("click",(function(){L=!L,L?(x&&"false"===x.getAttribute("data-towed")&&(x.style.width="40px",x.style.height="80px"),b&&"false"===b.getAttribute("data-towed")&&(b.style.width="40px",b.style.height="120px"),k&&"false"===k.getAttribute("data-towed")&&(k.style.width="40px",k.style.height="120px"),A&&"false"===A.getAttribute("data-towed")&&(A.style.width="40px",A.style.height="160px"),C&&"false"===C.getAttribute("data-towed")&&(C.style.width="40px",C.style.height="200px")):(x&&"false"===x.getAttribute("data-towed")&&(x.style.width="80px",x.style.height="40px"),b&&"false"===b.getAttribute("data-towed")&&(b.style.width="120px",b.style.height="40px"),k&&"false"===k.getAttribute("data-towed")&&(k.style.width="120px",k.style.height="40px"),A&&"false"===A.getAttribute("data-towed")&&(A.style.width="160px",A.style.height="40px"),C&&"false"===C.getAttribute("data-towed")&&(C.style.width="200px",C.style.height="40px"))})),function(){const t=document.querySelectorAll(".boxStart");w.forEach((t=>{t.addEventListener("dragstart",(function(e){const o=t.classList[1];q[o]?e.preventDefault():e.dataTransfer.setData("text/plain",o)}))})),t.forEach((t=>{t.addEventListener("dragover",(function(t){t.preventDefault()})),t.addEventListener("drop",(function(e){const o=e.dataTransfer.getData("text/plain"),a=document.querySelector(`.${o}`),r=parseInt(t.dataset.row),s=parseInt(t.dataset.column);(function(t,e,o){const n=parseInt(t.dataset.length);if(L){if("x"===E[e][o]||"x"===E[e+1][o]||"x"===E[e+2][o]||"x"===E[e+3][o]||"x"===E[e+4][o]||"x"===E[e+5][o])return!1;if(e+n<=10)return!0}else{if("x"===E[e][o]||"x"===E[e][o+1]||"x"===E[e][o+2]||"x"===E[e][o+3]||"x"===E[e][o+4]||"x"===E[e][o+5])return!1;if(o+n<=10)return!0}return!1})(a,r,s)&&(t.appendChild(a),function(t,e,o){const a=parseInt(document.querySelector(`.${t}`).dataset.length);if(L)for(let t=0;t<a;t++)E[e+t][o]="x";else for(let t=0;t<a;t++)E[e][o+t]="x";!function(t,e,o){L?(u(n,t,e,o,!0),h(t,e,o,!0)):(u(n,t,e,o),h(t,e,o))}(a,e,o)}(o,r,s),q[o]=!0,5===Object.keys(q).length&&(S.style.display="none"),a.setAttribute("data-towed","true"))}))}))}()}let E=[];const q={};let L=!1;document.addEventListener("DOMContentLoaded",(function(){v(),function(e){e.placeRandomShip(new t(3)),e.placeRandomShip(new t(4)),e.placeRandomShip(new t(5)),e.placeRandomShip(new t(3),!0),e.placeRandomShip(new t(2),!0)}(a),d.addEventListener("click",(function(){n.placeRandomShip(new t(3)),n.placeRandomShip(new t(4)),n.placeRandomShip(new t(5)),n.placeRandomShip(new t(3),!0),n.placeRandomShip(new t(2),!0),i.style.display="none",h()})),function(){const t=document.querySelector("main"),e=document.createElement("div");e.classList.add("AllGridPlayer");const o=document.createElement("div"),a=document.createElement("div");a.classList.add("yourName"),a.textContent="Player",e.appendChild(a),e.appendChild(o),o.classList.add("gridPlayer"),t.appendChild(e);for(let t=0;t<10;t++)for(let e=0;e<10;e++){const a=document.createElement("div");a.classList.add("boxOnGridToPlayer"),a.dataset.row=t,a.dataset.column=e,a.dataset.data=n.grid[t][e],a.style["border-style"]="solid",a.style["border-width"]="0.5px",o.appendChild(a),p.push(a)}}(),function(){const t=document.createElement("div");t.classList.add("AllGridPlayerComputer");const e=document.createElement("div"),o=document.createElement("div");o.classList.add("computerName"),o.textContent="Computer",e.classList.add("gridComputer"),t.appendChild(o),t.appendChild(e),l.appendChild(t);for(let t=0;t<10;t++)for(let o=0;o<10;o++){const n=document.createElement("button");n.classList.add("boxOnGridToComputer"),n.dataset.row=t,n.dataset.column=o,n.style["border-style"]="solid",n.style["border-width"]="0.5px",n.style["border-color"]="black",n.style.background="none",n.style.cursor="pointer",f(n),e.appendChild(n)}}()}))})();