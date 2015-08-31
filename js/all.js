"use strict";var init={};init.wheelSpeed=4,init.moveSpeed=1,init.mapSetinterval=1e3/60,init.map={left:!1,up:!1,right:!1,down:!1},init.alt=!1,init.drawIsMove=!1,init.mouseDownX=0,init.mouseDownY=0,init.mouseMoveX=0,init.mouseMoveY=0,init.mouseMoveW=0,init.mouseMoveH=0,init.isMoveArr=[],init.arr=[],init.mapArr=[],init.npcArr=[],init.img=["http://dkbo.github.io/images/rpg_maker_xp.png"],init.pre=[],init.immediate=!1;var Sprites=React.createClass({displayName:"Sprites",render:function(){return React.createElement("div",{style:this.props.style,id:"sprites",onWheel:this.props.onWheel,onMouseDown:this.props.onMouseDown,onContextMenu:this.props.onContextMenu},this.props.children)}}),Top=React.createClass({displayName:"Top",render:function(){return React.createElement("div",{id:"top"},this.props.children)}}),Root=React.createClass({displayName:"Root",getDefaultProps:function(){return{left:-init.moveSpeed,right:init.moveSpeed,up:-init.moveSpeed,down:init.moveSpeed,map:{width:1920,height:1080,sX:32,sY:32}}},getInitialState:function(){return{sprite:{top:0},objectNum:0,mapObjects:null,mapTop:0,mapLeft:0,width:this.props.map.width,height:this.props.map.height,sourceX:!1,sourceY:!1,sourceW:this.props.map.sX,sourceH:this.props.map.sY,gridX:!1,gridY:!1,opacityF:1,opacityB:1,opacityM:1,json:null,jsonParse:{map:{},styles:[],isMove:[]},spritesSrc:"http://dkbo.github.io/images/rpg_maker_xp.png"}},handleSpritesMouseDown:function(t){if(init.scontext.clearRect(0,0,256,12e3),0==t.button){var e=(window.innerHeight,this.props.map.sX*Math.floor(t.clientX/this.props.map.sX)),i=this.props.map.sY*Math.floor((t.clientY-100+this.props.map.sY*-this.state.sprite.top)/this.props.map.sY),s=this.state.sourceW,a=this.state.sourceH;this.state.sourceX===!1?this.setState({sourceX:e,sourceY:i}):(e>this.state.sourceX?(s=e-this.state.sourceX+this.props.map.sX,e=this.state.sourceX):s=this.state.sourceX-e+this.props.map.sX,i>this.state.sourceY?(a=i-this.state.sourceY+this.props.map.sY,i=this.state.sourceY):a=this.state.sourceY-i+32,this.setState({sourceX:e,sourceY:i,sourceW:s,sourceH:a})),init.scontext.beginPath(),init.scontext.rect(e,i,s,a),init.scontext.fillStyle="rgba(27, 136, 224, 0.53)",init.scontext.fill(),init.scontext.lineWidth=1,init.scontext.strokeStyle="black",init.scontext.stroke()}else this.setState({sourceX:!1,sourceY:!1,sourceW:this.props.map.sX,sourceH:this.props.map.sY})},handleWheel:function(t){var e=t.deltaY/100*init.wheelSpeed,i=this.state.sprite;i.top+-e<=0&&(i.top+=-e,this.setState({sprite:i}))},handleChange:function(t){var e=JSON.parse(t.target.value);"object"==typeof e&&(t.target.value=null,this.drawJson(e))},handleObjectName:function(t){init.objectName=t.target.value},handleSprite:function(t){var e;if(this.isReaptImg(t.target.value)){{init.pre.length}e=new Image,e.src=t.target.value,init.img.push(e.src)}this.setState({spritesSrc:t.target.value})},isReaptImg:function(t){for(var e=0;e<init.img.length;e++)if(init.img[e]===t)return!1;return!0},mapWidth:function(t){this.setState({width:t.target.value})},mapHeight:function(t){this.setState({height:t.target.value})},contextMenu:function(t){t.preventDefault()},drawJson:function(t){init.npcArr=t.npc,init.mapArr=t.map,this.drawObjects(init.arr=t.styles),this.drawIsMove(init.isMoveArr=t.isMove),this.setState({json:JSON.stringify(t,null,"	"),jsonParse:t,mapObjects:1,objectNum:0})},drawObjects:function(t){var e=new Image;init.fcontext.clearRect(0,0,this.state.width,this.state.height),init.bcontext.clearRect(0,0,this.state.width,this.state.height);for(var i=0;i<t.length;i++)this.drawJsonPreImg(t[i].b)&&(e.src=t[i].b,2==t[i].z?init.fcontext.drawImage(e,t[i].x,t[i].y,t[i].w,t[i].h,t[i].l,t[i].t,t[i].w,t[i].h):init.bcontext.drawImage(e,t[i].x,t[i].y,t[i].w,t[i].h,t[i].l,t[i].t,t[i].w,t[i].h))},drawIsMove:function(t){init.mcontext.clearRect(0,0,this.state.width,this.state.height);for(var e=0;e<t.length;e++)init.mcontext.beginPath(),init.mcontext.rect(t[e].x,t[e].y,t[e].w,t[e].h),init.mcontext.fillStyle="rgba(27, 136, 224, 0.83)",init.mcontext.fill()},drawJsonPreImg:function(t){for(var e=!1,i=0;i<init.img.length;i++)if(t===init.img[i]){e=!0;break}if(!e){var s=new Image;s.onload=function(){return e}.bind(this),s.src=t,init.img.push(t)}return e},drawDown:function(t){var e=Math.floor((t.clientX-256-this.state.mapLeft*this.props.map.sX)/this.props.map.sX)*this.props.map.sX,i=Math.floor((t.clientY-100-this.state.mapTop*this.props.map.sY)/this.props.map.sY)*this.props.map.sY;if(this.state.sourceX!==!1)switch(t.button){case 0:this.draw(e,i,0);break;case 2:this.draw(e,i,2)}else if(init.alt)switch(t.button){case 0:init.drawIsMove=!0,init.mouseDownX=t.clientX,init.mouseDownY=t.clientY}else this.findObjects(t)},drawMove:function(t){init.drawIsMove&&(init.mcontext.clearRect(init.mouseMoveX,init.mouseMoveY,init.mouseMoveW,init.mouseMoveH),init.mouseMoveX=t.clientX>init.mouseDownX?init.mouseDownX-255-this.state.mapLeft*this.props.map.sX:t.clientX-255-this.state.mapLeft*this.props.map.sX,init.mouseMoveY=t.clientY>init.mouseDownY?init.mouseDownY-100-this.state.mapTop*this.props.map.sY:t.clientY-100-this.state.mapTop*this.props.map.sY,init.mouseMoveW=t.clientX-init.mouseDownX>0?t.clientX-init.mouseDownX:init.mouseDownX-t.clientX,init.mouseMoveH=t.clientY-init.mouseDownY>0?t.clientY-init.mouseDownY:init.mouseDownY-t.clientY,init.mcontext.beginPath(),init.mcontext.rect(init.mouseMoveX,init.mouseMoveY,init.mouseMoveW,init.mouseMoveH),init.mcontext.fillStyle="rgba(27, 136, 224, 0.83)",init.mcontext.fill())},drawUp:function(t){!this.state.sourceX&&init.alt&&(init.drawIsMove=!1,this.pushIsMove())},pushIsMove:function(){var t={};t.n=init.objectName,t.x=init.mouseMoveX,t.y=init.mouseMoveY,t.w=init.mouseMoveW,t.h=init.mouseMoveH,init.mouseMoveX=0,init.mouseMoveY=0,init.mouseMoveW=0,init.mouseMoveH=0,init.isMoveArr.push(t);var e={styles:init.arr,isMove:init.isMoveArr};this.drawObjectsSelect(t.x,t.y,t.w,t.h),this.setState({json:JSON.stringify(e,null,"	"),jsonParse:e,objectNum:init.isMoveArr.length-1,mapObjects:2})},findObjects:function(t){var e,i=(this.state,t.clientX-255-this.state.mapLeft*this.props.map.sX),s=t.clientY-100-this.state.mapTop*this.props.map.sY;if(0===t.button){for(var a=this.state.jsonParse.styles,n=0;n<a.length;n++)a[n].l<=i&&i<=a[n].l+a[n].w&&a[n].t<=s&&s<=a[n].t+a[n].h&&(this.setState({objectNum:n,mapObjects:1}),e=n);e>=0&&this.drawObjectsSelect(a[e].l,a[e].t,a[e].w,a[e].h)}if(2===t.button){for(var a=this.state.jsonParse.isMove,n=0;n<a.length;n++)a[n].x<=i&&i<=a[n].x+a[n].w&&a[n].y<=s&&s<=a[n].y+a[n].h&&(this.setState({objectNum:n,mapObjects:2}),e=n);e>=0&&this.drawObjectsSelect(a[e].x,a[e].y,a[e].w,a[e].h)}},drawObjectsSelect:function(t,e,i,s){init.oscontext.clearRect(0,0,this.state.width,this.state.height),init.oscontext.beginPath(),init.oscontext.rect(t,e,i,s),init.oscontext.fillStyle="rgba(255, 255, 255, 0.23)",init.oscontext.fill(),init.oscontext.lineWidth=1,init.oscontext.strokeStyle="black",init.oscontext.stroke()},mapKeyDown:function(t){switch(t.keyCode){case 71:this.drawGridX(),this.drawGridY();break;case 70:this.opacityF();break;case 66:this.opacityB();break;case 77:this.opacityM();break;case 37:init.map.left=!0;break;case 65:init.map.left=!0;break;case 39:init.map.right=!0;break;case 68:init.map.right=!0;break;case 38:init.map.up=!0;break;case 87:init.map.up=!0;break;case 40:init.map.down=!0;break;case 83:init.map.down=!0,this.save();break;case 73:this.immediateSave();break;case 46:this.handleObjectsRemove();break;case 76:this.load();break;case 67:this.clear();break;case 18:init.alt=!0}},mapKeyUp:function(t){switch(t.keyCode){case 37:init.map.left=!1;break;case 65:init.map.left=!1;break;case 39:init.map.right=!1;break;case 68:init.map.right=!1;break;case 38:init.map.up=!1;break;case 87:init.map.up=!1;break;case 40:init.map.down=!1;break;case 83:init.map.down=!1;break;case 18:init.alt=!1}},opacityF:function(){this.setState({opacityF:this.state.opacityF?0:1})},opacityB:function(){this.setState({opacityB:this.state.opacityB?0:1})},opacityM:function(){this.setState({opacityM:this.state.opacityM?0:1})},drawGridX:function(){if(this.state.gridX)init.gcontext.clearRect(0,0,this.state.width,this.state.height);else{init.gcontext.beginPath();for(var t=1;t<this.state.width/this.props.map.sX;t++)init.gcontext.moveTo(t*this.props.map.sX,this.props.map.sY),init.gcontext.lineTo(t*this.props.map.sX,this.state.height),init.gcontext.font="italic .5em Calibri",init.gcontext.textAlign="center",init.gcontext.fillText(t*this.props.map.sX,t*this.props.map.sX,20);init.gcontext.stroke()}this.setState({gridX:!this.state.gridX})},drawGridY:function(){if(this.state.gridY)init.gcontext.clearRect(0,0,this.state.width,this.state.height);else{init.gcontext.beginPath();for(var t=1;t<this.state.height/this.props.map.sY;t++)init.gcontext.moveTo(this.props.map.sX,t*this.props.map.sY),init.gcontext.lineTo(this.state.width,t*this.props.map.sY),init.gcontext.font="italic .5em Calibri",init.gcontext.textAlign="center",init.gcontext.fillText(t*this.props.map.sY,20,t*this.props.map.sY+4);init.gcontext.stroke()}this.setState({gridY:!this.state.gridY})},save:function(){if(init.alt){var t={width:this.state.width,height:this.state.height},e={map:init.mapArr,styles:init.arr,isMove:init.isMoveArr,npc:init.npcArr};localStorage.dkbo=JSON.stringify(e),localStorage.dkbomap=JSON.stringify(t)}},load:function(){if(init.alt){var t=JSON.parse(localStorage.dkbomap);this.setState({width:t.width,height:t.height}),this.drawJson(JSON.parse(localStorage.dkbo))}},clear:function(){if(init.alt){init.oscontext.clearRect(0,0,this.state.width,this.state.height),init.npcArr.length=0,this.state.opacityF&&this.state.opacityB&&(init.fcontext.clearRect(0,0,this.state.width,this.state.height),init.bcontext.clearRect(0,0,this.state.width,this.state.height),init.arr.length=0),this.state.opacityM&&(init.mcontext.clearRect(0,0,this.state.width,this.state.height),init.isMoveArr.length=0);var t={map:{},styles:init.arr,isMove:init.isMoveArr,npc:init.npcArr};this.setState({json:JSON.stringify(t,null,"	"),jsonParse:t,mapObjects:null})}},immediateSave:function(){init.immediate=init.immediate?!1:!0},draw:function(t,e,i){var s=this.state,a=new Image;a.src=this.state.spritesSrc;var n={n:init.objectName,l:t,t:e,w:s.sourceW,h:s.sourceH,b:a.src,x:s.sourceX,y:s.sourceY};2==i?(n.z=2,init.fcontext.drawImage(a,s.sourceX,s.sourceY,s.sourceW,s.sourceH,t,e,s.sourceW,s.sourceH)):init.bcontext.drawImage(a,s.sourceX,s.sourceY,s.sourceW,s.sourceH,t,e,s.sourceW,s.sourceH),this.drawObjectsSelect(t,e,s.sourceW,s.sourceH),init.arr.push(n),n={styles:init.arr,isMove:init.isMoveArr},this.setState({json:JSON.stringify(n,null,"	"),jsonParse:n,objectNum:init.arr.length-1,mapObjects:1})},mapMove:function(){init.alt||(init.map.left&&this.state.mapLeft-this.props.left<=0&&this.setState({mapLeft:this.state.mapLeft-this.props.left}),init.map.right&&this.setState({mapLeft:this.state.mapLeft-this.props.right}),init.map.up&&this.state.mapTop-this.props.up<=0&&this.setState({mapTop:this.state.mapTop-this.props.up}),init.map.down&&this.setState({mapTop:this.state.mapTop-this.props.down}))},componentDidMount:function(){var t=document.getElementById("objectFront"),e=document.getElementById("objectBack"),i=document.getElementById("objectIsMove"),s=document.getElementById("spriteCanvas"),a=document.getElementById("objectSelect"),n=document.getElementById("grid");init.fcontext=t.getContext("2d"),init.bcontext=e.getContext("2d"),init.mcontext=i.getContext("2d"),init.scontext=s.getContext("2d"),init.oscontext=a.getContext("2d"),init.gcontext=n.getContext("2d"),$(window).on("keydown",this.mapKeyDown),$(window).on("keyup",this.mapKeyUp),this.timer=setInterval(this.mapMove.bind(this),init.mapSetinterval)},handelMapFalse:function(){$(window).off("keydown",this.mapKeyDown),$(window).off("keyup",this.mapKeyUp)},handelMapTrue:function(){$(window).on("keydown",this.mapKeyDown),$(window).on("keyup",this.mapKeyUp)},handleObjectsRemove:function(){if(this.state.mapObjects){init.oscontext.clearRect(0,0,this.state.width,this.state.height);var t=this.state.jsonParse,e=this.state.mapObjects;switch(e){case 2:{t.isMove.splice(this.state.objectNum,1)}break;case 1:{t.styles.splice(this.state.objectNum,1)}}this.setState({json:JSON.stringify(t,null,"	"),jsonParse:t,mapObjects:null}),this.handleObjectsDraw(e)}},handleObjectsDraw:function(t){(2==this.state.mapObjects||2==t)&&this.drawIsMove(this.state.jsonParse.isMove),(1==this.state.mapObjects||1==t)&&this.drawObjects(this.state.jsonParse.styles)},handleObjectsArea:function(t){this.setState({objectNum:0,mapObjects:2==this.state.mapObjects?1:2})},handleObjectsId:function(t){var e=Number(t.target.value),i=[];1==this.state.mapObjects&&(i=this.state.jsonParse.styles),2==this.state.mapObjects&&(i=this.state.jsonParse.isMove),!isNaN(Math.floor(e))&&e<i.length&&e>=0&&this.setState({objectNum:Math.floor(e)},function(){var t=i[this.state.objectNum];1==this.state.mapObjects&&this.drawObjectsSelect(t.l,t.t,t.w,t.h),2==this.state.mapObjects&&this.drawObjectsSelect(t.x,t.y,t.w,t.h)}.bind(this))},handleObjectsName:function(t){var e=this.state.jsonParse;2!=this.state.mapObjects?e.styles[this.state.objectNum].n=t.target.value:e.isMove[this.state.objectNum].n=t.target.value,this.setState({json:JSON.stringify(e,null,"	"),jsonParse:e})},handleObjectsX:function(t){var e=Number(t.target.value);if(!isNaN(e)){var i=this.state.jsonParse;2!=this.state.mapObjects?i.styles[this.state.objectNum].l=e:i.isMove[this.state.objectNum].x=e,this.setState({json:JSON.stringify(i,null,"	"),jsonParse:i}),init.immediate&&this.handleObjectsDraw()}},handleObjectsY:function(t){var e=Number(t.target.value);if(!isNaN(e)){var i=this.state.jsonParse;2!=this.state.mapObjects?i.styles[this.state.objectNum].t=e:i.isMove[this.state.objectNum].y=e,this.setState({json:JSON.stringify(i,null,"	"),jsonParse:i}),init.immediate&&this.handleObjectsDraw()}},handleObjectsW:function(t){var e=Number(t.target.value);if(!isNaN(e)){var i=this.state.jsonParse;2!=this.state.mapObjects?i.styles[this.state.objectNum].w=e:i.isMove[this.state.objectNum].w=e,this.setState({json:JSON.stringify(i,null,"	"),jsonParse:i}),init.immediate&&this.handleObjectsDraw()}},handleObjectsH:function(t){var e=Number(t.target.value);if(!isNaN(e)){var i=this.state.jsonParse;2!=this.state.mapObjects?i.styles[this.state.objectNum].h=e:i.isMove[this.state.objectNum].h=e,this.setState({json:JSON.stringify(i,null,"	"),jsonParse:i}),init.immediate&&this.handleObjectsDraw()}},handleObjectsSX:function(t){var e=Number(t.target.value);if(!isNaN(e)){var i=this.state.jsonParse;i.styles[this.state.objectNum].x=e,this.setState({json:JSON.stringify(i,null,"	"),jsonParse:i}),init.immediate&&this.handleObjectsDraw()}},handleObjectsSY:function(t){var e=Number(t.target.value);if(!isNaN(e)){var i=this.state.jsonParse;i.styles[this.state.objectNum].y=e,this.setState({json:JSON.stringify(i,null,"	"),jsonParse:i}),init.immediate&&this.handleObjectsDraw()}},handleObjectsE:function(t){var e=Number(t.target.value);if(!isNaN(e)){var i=this.state.jsonParse;t.target.value>=0?i.isMove[this.state.objectNum].e=e:delete i.isMove[this.state.objectNum].e,this.setState({json:JSON.stringify(i,null,"	"),jsonParse:i})}},handleObjectsCM:function(t){var e=Number(t.target.value);if(!isNaN(e)){var i=this.state.jsonParse;t.target.value>=0?i.isMove[this.state.objectNum].cm=e:delete i.isMove[this.state.objectNum].cm,this.setState({json:JSON.stringify(i,null,"	"),jsonParse:i})}},handleObjectsCMM:function(t){var e=Number(t.target.value);if(!isNaN(e)){var i=this.state.jsonParse;t.target.value>=0?i.isMove[this.state.objectNum].cmm=e:delete i.isMove[this.state.objectNum].cmm,this.setState({json:JSON.stringify(i,null,"	"),jsonParse:i})}},render:function(){var t=this.state;return React.createElement("div",{id:"container"},React.createElement("div",{id:"map",style:{WebkitTransform:"translate3D("+t.mapLeft*this.props.map.sX+"px,"+t.mapTop*this.props.map.sY+"px,0)",msTransform:"translate3D("+t.mapLeft*this.props.map.sX+"px,"+t.mapTop*this.props.map.sY+"px,0)",transform:"translate3D("+t.mapLeft*this.props.map.sX+"px,"+t.mapTop*this.props.map.sY+"px,0)",width:t.width,height:t.height},onMouseDown:this.drawDown,onMouseMove:this.drawMove,onMouseUp:this.drawUp,onContextMenu:this.contextMenu},React.createElement("canvas",{width:t.width,height:t.height,style:{opacity:t.opacityB},id:"objectBack"}),React.createElement("canvas",{width:t.width,height:t.height,style:{opacity:t.opacityF},id:"objectFront"}),React.createElement("canvas",{width:t.width,height:t.height,style:{opacity:t.opacityM},id:"objectIsMove"}),React.createElement("canvas",{width:t.width,height:t.height,id:"objectSelect"}),React.createElement("canvas",{width:t.width,height:t.height,id:"grid"})),React.createElement(Sprites,{style:{WebkitTransform:"translateY("+t.sprite.top*this.props.map.sY+"px)",msTransform:"translateY("+t.sprite.top*this.props.map.sY+"px)",transform:"translateY("+t.sprite.top*this.props.map.sY+"px)"},onWheel:this.handleWheel,onMouseDown:this.handleSpritesMouseDown,onContextMenu:this.contextMenu},React.createElement("canvas",{width:"256",height:"12000",id:"spriteCanvas"}),React.createElement("img",{src:t.spritesSrc})),React.createElement(Top,null,React.createElement("textarea",{id:"jsoncode",value:t.json}),React.createElement("textarea",{id:"jsontext",onChange:this.handleChange,placeholder:"Object Json"}),React.createElement("input",{id:"spritesSrc",value:t.spritesSrc,onChange:this.handleSprite}),React.createElement("input",{id:"objectname",onChange:this.handleObjectName,placeholder:"Object Name"}),React.createElement("input",{id:"mapWidth",onChange:this.mapWidth,value:t.width}),React.createElement("input",{id:"mapHeight",onChange:this.mapHeight,value:t.height})),2!=t.mapObjects&&null!=t.mapObjects?React.createElement(Ui,null,React.createElement("input",{id:"del",type:"button",value:"刪除",onClick:this.handleObjectsRemove}),React.createElement("input",{id:"draw",type:"button",value:"重畫",onClick:this.handleObjectsDraw}),React.createElement("label",{htmlFor:"area"},"區域層"),React.createElement("select",{id:"area",onChange:this.handleObjectsArea,onKeyDown:this.handelMapFalse,onKeyUp:this.handelMapTrue},React.createElement("option",{value:"1",selected:!0},"物件區域"),React.createElement("option",{value:"2"},"碰撞區域")),React.createElement("label",{htmlFor:"id"},"物件ID"),React.createElement("input",{id:"id",type:"number",onChange:this.handleObjectsId,onKeyDown:this.handelMapFalse,onKeyUp:this.handelMapTrue,value:t.objectNum}),React.createElement("label",{htmlFor:"name"},"物件名"),React.createElement("input",{id:"name",onChange:this.handleObjectsName,onKeyDown:this.handelMapFalse,onKeyUp:this.handelMapTrue,value:t.jsonParse.styles[t.objectNum].n}),React.createElement("label",{htmlFor:"x"},"X 座標"),React.createElement("input",{id:"x",type:"number",onChange:this.handleObjectsX,onKeyDown:this.handelMapFalse,onKeyUp:this.handelMapTrue,value:t.jsonParse.styles[t.objectNum].l}),React.createElement("label",{htmlFor:"y"},"Y 座標"),React.createElement("input",{id:"y",type:"number",onChange:this.handleObjectsY,onKeyDown:this.handelMapFalse,onKeyUp:this.handelMapTrue,value:t.jsonParse.styles[t.objectNum].t}),React.createElement("label",{htmlFor:"width"},"物件寬"),React.createElement("input",{id:"width",type:"number",onChange:this.handleObjectsW,onKeyDown:this.handelMapFalse,onKeyUp:this.handelMapTrue,value:t.jsonParse.styles[t.objectNum].w}),React.createElement("label",{htmlFor:"height"},"物件高"),React.createElement("input",{id:"height",type:"number",onChange:this.handleObjectsH,onKeyDown:this.handelMapFalse,onKeyUp:this.handelMapTrue,value:t.jsonParse.styles[t.objectNum].h}),React.createElement("label",{htmlFor:"background"},"物件主圖"),React.createElement("input",{id:"background",value:t.jsonParse.styles[t.objectNum].b}),React.createElement("label",{htmlFor:"spriteX"},"物件拼圖 X 座標"),React.createElement("input",{id:"spriteX",type:"number",onChange:this.handleObjectsSX,onKeyDown:this.handelMapFalse,onKeyUp:this.handelMapTrue,value:t.jsonParse.styles[t.objectNum].x}),React.createElement("label",{htmlFor:"spriteY"},"物件拼圖 Y 座標"),React.createElement("input",{id:"spriteY",type:"number",onChange:this.handleObjectsSY,onKeyDown:this.handelMapFalse,onKeyUp:this.handelMapTrue,value:t.jsonParse.styles[t.objectNum].y}),React.createElement("label",{htmlFor:"zindex"},"物件前後層"),React.createElement("input",{id:"zindex",value:t.jsonParse.styles[t.objectNum].z})):null,2==t.mapObjects?React.createElement(Ui,null,React.createElement("input",{id:"del",type:"button",value:"刪除",onClick:this.handleObjectsRemove}),React.createElement("input",{id:"draw",type:"button",value:"重畫",onClick:this.handleObjectsDraw}),React.createElement("label",{htmlFor:"area"},"區域物件"),React.createElement("select",{id:"area",onChange:this.handleObjectsArea,onKeyDown:this.handelMapFalse,onKeyUp:this.handelMapTrue},React.createElement("option",{value:"1"},"物件區域"),React.createElement("option",{value:"2",selected:!0},"碰撞區域")),React.createElement("label",{htmlFor:"id"},"物件ID"),React.createElement("input",{id:"id",type:"number",onChange:this.handleObjecstId,onKeyDown:this.handelMapFalse,onKeyUp:this.handelMapTrue,type:"number",value:t.objectNum}),React.createElement("label",{htmlFor:"name"},"物件名"),React.createElement("input",{id:"name",onChange:this.handleObjectsName,onKeyDown:this.handelMapFalse,onKeyUp:this.handelMapTrue,value:t.jsonParse.isMove[t.objectNum].n}),React.createElement("label",{htmlFor:"x"},"X 座標"),React.createElement("input",{id:"x",type:"number",onChange:this.handleObjectsX,onKeyDown:this.handelMapFalse,onKeyUp:this.handelMapTrue,value:t.jsonParse.isMove[t.objectNum].x}),React.createElement("label",{htmlFor:"y"},"Y 座標"),React.createElement("input",{id:"y",type:"number",onChange:this.handleObjectsY,onKeyDown:this.handelMapFalse,onKeyUp:this.handelMapTrue,value:t.jsonParse.isMove[t.objectNum].y}),React.createElement("label",{htmlFor:"width"},"物件寬"),React.createElement("input",{id:"width",type:"number",onChange:this.handleObjectsW,onKeyDown:this.handelMapFalse,onKeyUp:this.handelMapTrue,value:t.jsonParse.isMove[t.objectNum].w}),React.createElement("label",{htmlFor:"height"},"物件高"),React.createElement("input",{id:"height",type:"number",onChange:this.handleObjectsH,onKeyDown:this.handelMapFalse,onKeyUp:this.handelMapTrue,value:t.jsonParse.isMove[t.objectNum].h}),React.createElement("label",{htmlFor:"events"},"事件ID"),React.createElement("input",{id:"events",type:"number",onChange:this.handleObjectsE,onKeyDown:this.handelMapFalse,onKeyUp:this.handelMapTrue,value:t.jsonParse.isMove[t.objectNum].h,value:t.jsonParse.isMove[t.objectNum].e}),React.createElement("label",{htmlFor:"inMap"},"入場圖"),React.createElement("input",{id:"inMap",type:"number",onChange:this.handleObjectsCM,onKeyDown:this.handelMapFalse,onKeyUp:this.handelMapTrue,value:t.jsonParse.isMove[t.objectNum].h,value:t.jsonParse.isMove[t.objectNum].cm}),React.createElement("label",{htmlFor:"inMapPoint"},"入場點"),React.createElement("input",{id:"inMapPoint",type:"number",onChange:this.handleObjectsCMM,onKeyDown:this.handelMapFalse,onKeyUp:this.handelMapTrue,value:t.jsonParse.isMove[t.objectNum].h,value:t.jsonParse.isMove[t.objectNum].cmm})):null)}}),Ui=React.createClass({displayName:"Ui",render:function(){return React.createElement("div",{className:"ui"},this.props.children)}}),map=React.render(React.createElement(Root,null),document.body);