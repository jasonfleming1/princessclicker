(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{1:function(e){e.exports=[{id:1,name:"belle",image:"/assets/images/belle.png",clicked:!1},{id:2,name:"rapunzel",image:"/assets/images/rapunzel.png",clicked:!1},{id:3,name:"ariel",image:"/assets/images/ariel.png",clicked:!1},{id:4,name:"tiana",image:"/assets/images/tiana.png",clicked:!1},{id:5,name:"moana",image:"/assets/images/moana.png",clicked:!1},{id:6,name:"cinderella",image:"/assets/images/cinderella.png",clicked:!1},{id:7,name:"anna",image:"/assets/images/anna.png",clicked:!1},{id:8,name:"elsa",image:"/assets/images/elsa.png",clicked:!1},{id:9,name:"pocahontas",image:"/assets/images/pocahontas.png",clicked:!1},{id:10,name:"jasmine",image:"/assets/images/jasmine.png",clicked:!1},{id:11,name:"mulan",image:"/assets/images/mulan.png",clicked:!1},{id:12,name:"snowwhite",image:"/assets/images/snowwhite.png",clicked:!1}]},13:function(e,a,t){e.exports=t(30)},19:function(e,a,t){},20:function(e,a,t){},27:function(e,a,t){},28:function(e,a,t){},29:function(e,a,t){},30:function(e,a,t){"use strict";t.r(a);var n=t(0),i=t.n(n),s=t(5),c=t.n(s),r=(t(19),t(12)),o=t(6),l=t(7),m=t(10),d=t(8),g=t(11),u=t(1),h=t(9),f=t.n(h),p=(t(20),function(e){return i.a.createElement(f.a,{className:"wrapper"},e.children)}),k=(t(27),function(e){return i.a.createElement("div",{className:"card m-4 float-left"},i.a.createElement("img",{className:"card-img-top",alt:"princess",src:e.image,onClick:function(){return e.handleClickEvent(e.name)},id:e.id}))}),v=(t(28),function(e){return i.a.createElement("header",{className:"header",id:"headerContainer"},i.a.createElement("div",{id:"brand"},"Princess Clicker"),i.a.createElement("div",{id:"alert"},e.alert),i.a.createElement("div",{id:"scoreBoard"},"Score: ",e.score," | High Score: ",e.highScore," "))}),E=(t(29),function(){return i.a.createElement("footer",{className:"footer"},i.a.createElement("div",{id:"appName"},"Princess Clicker"))}),w=function(e){function a(){var e,t;Object(o.a)(this,a);for(var n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];return(t=Object(m.a)(this,(e=Object(d.a)(a)).call.apply(e,[this].concat(i)))).state={data:u,score:0,highScore:0,clicked:[],alert:"Click a princess to begin!"},t.shuffle=function(e){for(var a=e.length-1;a>0;a--){var t=Math.floor(Math.random()*(a+1)),n=e[a];e[a]=e[t],e[t]=n}return e},t.resetGame=function(){t.setState({alert:"Too bad! let's try again",highScore:Math.max(t.state.score,t.state.highScore),score:0,data:u})},t.handleClickEvent=function(e){var a=!1,n=t.state.data.map(function(t){var n=Object(r.a)({},t);return n.name===e&&(n.clicked||(console.log("Already guessed this princess"),n.clicked=!0,a=!0)),n});console.log("Guess Correct! ",a),a?t.handleCorrectGuess(n):t.handleIncorrectGuess(n)},t.handleCorrectGuess=function(e){t.setState({data:t.shuffle(e),score:t.state.score+1,alert:"Nice One! Keep going!"})},t.handleIncorrectGuess=function(){t.resetGame()},t}return Object(g.a)(a,e),Object(l.a)(a,[{key:"componentDidMount",value:function(){this.setState({data:this.shuffle(this.state.data)})}},{key:"render",value:function(){var e=this;return i.a.createElement("div",null,i.a.createElement(v,{alert:this.state.alert,score:this.state.score,highScore:this.state.highScore}),i.a.createElement(p,null,this.state.data.map(function(a){return i.a.createElement(k,{key:a.id,name:a.name,image:a.image,handleClickEvent:e.handleClickEvent})})),i.a.createElement(E,null))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(i.a.createElement(w,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[13,1,2]]]);
//# sourceMappingURL=main.22d04e14.chunk.js.map