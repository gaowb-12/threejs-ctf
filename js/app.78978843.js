(function(){"use strict";var t={9791:function(t,e,s){var i=s(6369),n=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},o=[],a=s(3736),r={},c=(0,a.Z)(r,n,o,!1,null,null,null),l=c.exports,h=s(2631),d=function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"playground",attrs:{id:"ctf"}})},p=[],u=s(452),m=s(6265),w=s.n(m),g=s(9096),y=s(6276),f=s(2613);function v(t="div"){return document.createElement(t)}const b=v("div"),x=v("div");b.appendChild(x),b.className="load-ui",b.id="load-ui";const Z=new g.lLk;Z.onStart=()=>{document.body.appendChild(b),x.innerHTML="<div>LOADING... 0%</div>"},Z.onProgress=(t,e,s)=>{b.innerHTML=`<div>LOADING... ${(e/s*100).toFixed(2)}%</div>`},Z.onLoad=()=>{console.log("assets loaded."),x.innerHTML="<div>LOADING... 100%</div>",b.style.opacity="0",setTimeout((()=>document.body.removeChild(b)),5e3)},Z.onError=t=>{console.log("load assets error."),x.innerHTML=`<div>Load assets error: ${t}</div>`};const T="/assets",M=`${T}/models`,P=`${T}/imgs`;class z{static async load(){return new Promise((t=>{const e={buildings:[]};let s=8;function i(){s-=1,s||t(e)}new g.S3k(Z).load(`${P}/heigh2.jpg`,(t=>{e.heightimg=t,i()}));const n=["5","7","5","5","8","6"];new g.cBK(Z).load(n.map((t=>`${P}/${t}.png`)),(t=>{e.cubeTexture=t,i()})),new y.L(Z).load(`${M}/2.obj`,(t=>{const s=t.children[0];e.buildings.push(s.geometry),i()})),new y.L(Z).load(`${M}/3.obj`,(t=>{const s=t.children[0];e.buildings.push(s.geometry),i()})),new y.L(Z).load(`${M}/4.obj`,(t=>{const s=t.children[0];e.buildings.push(s.geometry),i()})),new y.L(Z).load(`${M}/5.obj`,(t=>{const s=t.children[0];e.buildings.push(s.geometry),i()})),new y.L(Z).load(`${M}/6.obj`,(t=>{const s=t.children[0],n=s.geometry;n.applyMatrix4((new g.yGw).makeTranslation(-750,0,-60)),e.buildings.push(n),i()})),new f.E(Z).load(`${M}/aerobat.gltf`,(t=>{const s=t.scene.children[0].children[0];e.aerobat=s,i()}))}))}}var k=s(2482),C=(s(1703),s(2943)),j=s(8350),S=s(2034),E=s(3087),L=s(2797);class ${constructor(t,e,s=1200){(0,k.Z)(this,"obj",void 0),(0,k.Z)(this,"el",void 0),(0,k.Z)(this,"_visible",!1),(0,k.Z)(this,"offset",void 0),(0,k.Z)(this,"content",void 0),(0,k.Z)(this,"distance",void 0),this.obj=t,this.el=v("div"),this.el.className="panel",this.content=v("div"),this.content.className="panel-content",this.content.innerHTML=this.obj.name||"_",this.distance=s,this.el.appendChild(this.content);let i=document.querySelector(".panels");i||(i=v("div"),i.className="panels",document.body.appendChild(i)),i.appendChild(this.el),$.instances.push(this),this.offset=e||{x:0,y:0,z:0}}static update(){$.instances.forEach((t=>t.update()))}update(){const t=this.obj.position.clone();this.obj.getWorldPosition(t);const e=$.camera.position.distanceTo(t);t.y+=this.offset.y*this.obj.scale.y;const s=t.project($.camera);s.x=(s.x+1)/2*window.innerWidth,s.y=-(s.y-1)/2*window.innerHeight;let i=`transform: translate3d(${s.x}px, ${s.y}px, 0);`;e>this.distance||e<=0?i+="visibility: hidden;":i+="visibility: visible;",this.el.setAttribute("style",i)}destroy(){document.body.removeChild(this.el),this.el=null}}(0,k.Z)($,"instances",[]),(0,k.Z)($,"renderer",void 0),(0,k.Z)($,"camera",void 0);class O extends g.xsS{constructor(t){super(),(0,k.Z)(this,"el",void 0),(0,k.Z)(this,"ambientLight",new g.Mig(16777215,.3)),(0,k.Z)(this,"camera",new g.cPb(72,1,.1,5e3)),(0,k.Z)(this,"renderer",new g.CP7({antialias:!0})),(0,k.Z)(this,"scenePass",new E.C(this,this.camera)),(0,k.Z)(this,"composer",new j.x(this.renderer)),(0,k.Z)(this,"controls",void 0),(0,k.Z)(this,"isPaused",!1),(0,k.Z)(this,"stats",new L.Z),this.el=t,this.el.classList.add("playground-canvas"),this.controls=new C.z(this.camera,t),this.init()}init(){const{renderer:t,camera:e,el:s,controls:i,composer:n,stats:o}=this;s.appendChild(t.domElement),this.renderer.shadowMap.enabled=!0,e.position.z=1e3,e.position.y=-100,e.lookAt(0,0,0),e.updateProjectionMatrix(),e.updateMatrixWorld(!0),this.fog=new g.yo9(987170,8e-4),this.add(this.ambientLight),n.passes=[this.scenePass],i.minDistance=500,i.maxDistance=1600,i.enabled=!0,i.autoRotate=!0,i.autoRotateSpeed=1,i.enableDamping=!0,i.dampingFactor=.1,i.maxPolarAngle=.57*Math.PI,o.domElement.style.position="absolute",o.domElement.style.top=0,this.el.appendChild(o.domElement),window.addEventListener("resize",this.resize.bind(this))}animate(){this.isPaused||requestAnimationFrame(this.animate.bind(this)),this.stats.update(),this.controls.update(),(0,S.Vx)(),$.update(),this.composer.render()}resize(){const{clientWidth:t,clientHeight:e}=this.el;this.camera.aspect=t/e,this.renderer.setSize(t,e),this.renderer.setPixelRatio(window.devicePixelRatio),this.composer.setSize(t,e),this.camera.updateProjectionMatrix()}}(0,k.Z)(O,"mouse",new g.FM8);class W extends g.BKK{constructor(t){const{width:e,height:s}=t;super(e,s,e-1,s-1);const i=(new g.yGw).makeRotationX(-Math.PI/2);this.applyMatrix4(i);const n=document.createElement("canvas");n.width=e,n.height=s;const o=n.getContext("2d");o.drawImage(t,0,0);const a=o.getImageData(0,0,e,s).data,r=this.attributes.position.array,c=e*s;for(let l=0;l<c;l++)r[3*l+1]=a[4*l]/256}}class R extends Array{constructor(t=20){super(),(0,k.Z)(this,"size",void 0),this.size=t;const e=document.createElement("canvas");e.width=t,e.height=t;const s=e.getContext("2d"),i=t/2,n=s.createRadialGradient(i,i,0,i,i,i);n.addColorStop(0,"#fff"),n.addColorStop(.2,"#888"),n.addColorStop(.5,"#444"),n.addColorStop(1,"#222"),s.fillStyle=n,s.fillRect(0,0,t,t);const o=s.getImageData(0,0,t,t).data,a=[],r=o.length;for(let l=0;l<r;l+=4)a.push(o[l]);const c=Math.max(...a);for(let l=0;l<t;l++)for(let e=0;e<t;e++){const s=a[l*t+e],i=Math.round(s/c*100),n={x:l-t/2,y:e-t/2,value:i,used:!1},o=t/2-1;(100===i&&l===o&&e===o||i<100)&&this.push(n)}this.sort(((t,e)=>e.value-t.value))}}class _ extends O{constructor(t,e){if(super(t),(0,k.Z)(this,"scan",void 0),(0,k.Z)(this,"assets",void 0),(0,k.Z)(this,"teams",[]),(0,k.Z)(this,"teamGroup",new g.ZAu),(0,k.Z)(this,"targets",[]),(0,k.Z)(this,"focusCamera",new g.cPb(55,1,.1,5e3)),(0,k.Z)(this,"focusScenePass",new E.C(this,this.focusCamera)),(0,k.Z)(this,"isFocus",!1),(0,k.Z)(this,"focusTeam",void 0),(0,k.Z)(this,"mapGrid",new R),(0,k.Z)(this,"gridSize",240),!e)throw new Error("缺少场景资源.");this.assets=e,$.camera=this.camera,this.resize();const s=new g.Ox3(16777215,.7);s.position.set(1500,800,3e3),this.add(s);const i=new g.cek(37119,2,1e3),n=new g.cek(54015,1,1e3);i.position.set(550,500,0),n.position.set(-550,500,0),this.add(i,n),this.background=e.cubeTexture;const o=new g.nls({color:27647,blending:g.WMw}),a=new W(e.heightimg),r=new g.TOt(a,1),c=new g.ejS(r,o);c.position.set(0,-300,-300),c.scale.set(60,700,60),this.add(c);const l=new g.BKK(1800,1800);l.applyMatrix4((new g.yGw).makeRotationX(-Math.PI/2));const h=new g.vBJ({transparent:!0,blending:g.WMw,map:(new g.dpR).load(`${P}/scan.png`),depthWrite:!1});this.scan=new g.Kj0(l,h),this.scan.position.y=-320,this.add(this.scan);const d=new g.BKK(2e3,2e3);d.applyMatrix4((new g.yGw).makeRotationX(-Math.PI/2));const p=new g.vBJ({transparent:!0,opacity:.6,blending:g.WMw,map:(new g.dpR).load(`${P}/btm-bg.png`),depthWrite:!1}),u=new g.Kj0(d,p);u.position.y=-321,this.add(u);const m=new g.nvb(5e3,50,5e3),w=new g.YBo({color:2768220,side:g.ehD}),y=new g.Kj0(m,w);y.position.y=-350,this.add(y),this.add(this.teamGroup),this.animate()}setTeams(t=[]){this.clearTeams(),t.forEach((t=>this.addTeam(t)))}addTeam(t){const e=this.teams.length+1,s=this.mapGrid[e],{x:i,y:n}=s,o=-Math.atan2(n,i);t.rotation.y=t.initialRotationY=o,t.position.set(i*this.gridSize+this.gridSize/2,300,n*this.gridSize+this.gridSize/2),this.teamGroup.add(t),this.teams.push(t)}clearTeams(){this.teams.forEach((t=>{this.teamGroup.remove(t),t.destroy()})),this.teams=[]}setTargets(t=[]){this.clearTargets(),t.sort(((t,e)=>e.score-t.score)).forEach((t=>this.addTarget(t)))}addTarget(t){const e=this.targets.length,s=this.mapGrid[e],{x:i,y:n,value:o}=s;0===e?(t.scale.set(2,2,2),t.position.set(0,-800,0)):(t.position.set(i*this.gridSize+this.gridSize/2,-800,n*this.gridSize+this.gridSize/2),t.scale.y=o/100),this.add(t);const a=t.position;new S.kX(a).delay(50*(e+1)).to({x:a.x,y:-300,z:a.z},1e3).easing(S.oY.Back.Out).start(),this.targets.push(t)}clearTargets(){this.targets.forEach((t=>{this.remove(t),t.destroy()})),this.targets=[]}focus(t){this.isFocus||!t||this.focusTeam||(this.focusTeam=t,$.camera=this.focusCamera,this.composer.passes=[this.focusScenePass],this.isFocus=!0,this.controls.enabled=!1,setTimeout(this.unFocus.bind(this),3e3))}unFocus(){$.camera=this.camera,this.composer.passes=[this.scenePass],this.focusTeam=null,this.controls.enabled=!0,setTimeout((()=>{this.isFocus=!1}),3e3)}updateFocusCamera(){const{focusTeam:t,focusCamera:e}=this;if(!t||!t.target)return;const s=new g.Pa4;t.cpos.getWorldPosition(s),e.position.set(s.x,s.y+100,s.z),e.lookAt(t.target.position)}animate(){super.animate(),this.scan.rotation.y+=.04,this.teamGroup.rotation.y-=.006,this.focusTeam&&this.updateFocusCamera()}resize(){super.resize(),this.focusCamera&&(this.focusCamera.aspect=this.camera.aspect,this.focusCamera.updateProjectionMatrix())}}s(6699),s(184);s(6553);class A extends g.Tme{get playground(){let t=this.parent;while(t&&"Scene"!==t.type)t=t.parent;return t}}const I=new g.nvb(3,3,30),K=new g.vBJ({color:16776960});class B extends g.Kj0{constructor(){super(I,K),(0,k.Z)(this,"used",void 0),this.used=!1,B.pool.push(this)}static shoot(t,e,s,i=!1){const n=B.pool.find((t=>!t.used))||new B;n.used=!0;const o=e.position.clone(),a=s.position.clone();if(o.applyMatrix4(e.parent.matrixWorld),a.applyMatrix4(s.parent.matrixWorld),n.position.set(o.x,o.y,o.z),t.add(n),i){const e=new g.mXe(new g.Pa4(o.x,o.y,o.z),new g.Pa4(o.x+(a.x-o.x)/2,500,o.z+(a.z-o.z)/2),new g.Pa4(a.x,a.y,a.z)),s={t:0};new S.kX(s).to({t:1}).onUpdate((t=>{const s=e.getPoint(t.t),i=e.getTangent(t.t);n.position.set(s.x,s.y,s.z),n.rotation.set(i.x,Math.PI/2+i.y,0)})).onComplete((()=>{t.remove(n),n.used=!1})).start()}else n.lookAt(s.position),new S.kX(n.position).to(a,1e3).onComplete((()=>{t.remove(n),n.used=!1})).start()}}(0,k.Z)(B,"pool",[]);new g.Wid({color:6710886,roughness:.4});class G extends A{constructor(){super(),(0,k.Z)(this,"texture",void 0),(0,k.Z)(this,"used",!1),(0,k.Z)(this,"tween",new S.kX({index:0}));const t=new g.BKK(G.size,G.size),e=new g.vBJ,s=G.texture.clone();s.needsUpdate=!0,s.repeat.set(1/4,1/4),s.offset.x=0,s.offset.y=3/4,e.side=g.ehD,e.transparent=!0,e.depthWrite=!1,e.map=s,e.blending=g.WMw;const i=new g.Kj0(t,e),n=new g.Kj0(t,e),o=new g.Kj0(t,e);n.rotation.y=-Math.PI/2,o.rotation.x=Math.PI/2,o.position.y=-10,this.add(i),this.texture=s,this.tween.to({index:15},2e3).easing(S.oY.Linear.None).onStart((()=>{this.playground.add(this)})).onUpdate((({index:t})=>{const e=~~(t%4),i=3-~~(t/4);s.offset.x=e/4,s.offset.y=i/4})).onComplete((()=>{this.playground.remove(this),this.used=!1})),G.pool.push(this)}start(){this.tween.start()}static getOne(){const t=G.pool.find((t=>!t.used))||new G;return t.used=!0,t}}(0,k.Z)(G,"pool",[]),(0,k.Z)(G,"size",100),(0,k.Z)(G,"texture",(new g.dpR).load(`${P}/fire1.png`));const F={normal:{mesh:new g.YBo({color:7908351,transparent:!0,opacity:.55}),line:new g.nls({color:27647,blending:g.WMw,transparent:!0,visible:!1}),box:new g.YBo({color:2768220,transparent:!0,opacity:.6,blending:g.WMw,depthWrite:!1})},red:{mesh:new g.YBo({color:10491671}),line:new g.nls({color:16719872,blending:g.WMw,transparent:!0,opacity:.3,visible:!0}),box:new g.YBo({color:16719872,transparent:!0,opacity:.6,blending:g.WMw,depthWrite:!1})},blue:{mesh:new g.YBo({color:25087}),line:new g.nls({color:27647,blending:g.WMw,transparent:!0,opacity:.2,visible:!0}),box:new g.YBo({color:27647,transparent:!0,opacity:.6,blending:g.WMw,depthWrite:!1})}};var N;(function(t){t[t["normal"]=1]="normal",t[t["blue"]=2]="blue",t[t["red"]=3]="red"})(N||(N={}));class Y extends A{constructor(t,e=200){super(),(0,k.Z)(this,"mesh",void 0),(0,k.Z)(this,"line",void 0),(0,k.Z)(this,"box",void 0),(0,k.Z)(this,"_size",void 0),(0,k.Z)(this,"_status",void 0),this._size=e;const s=new g.Kj0(t,F.normal.mesh),i=(new g.ZzF).setFromObject(s),n=i.getSize(new g.Pa4);if(n.x!==n.y){const s=(new g.yGw).makeScale(e/n.x,e/n.y,e/n.z);t.applyMatrix4(s)}this.add(s);const o=new g.TOt(s.geometry),a=new g.ejS(o,F.normal.line);this.add(a);const r=new g.nvb(e,e,e);r.applyMatrix4((new g.yGw).makeTranslation(0,e/2,0));const c=new g.TOt(r),l=new g.ejS(c,F.blue.line),h=new g.Kj0(r,F.normal.box);h.add(l),this.add(h),h.visible=!1,this.mesh=s,this.line=a,this.box=h}explode(){const t=this.playground;if(!t.isPaused){const e=G.getOne();e.position.copy(this.position),e.position.y+=this._size/2;const s=this._size*this.scale.x/G.size*1.8,i=this._size*this.scale.y/G.size*2;e.scale.set(s,i,s),t.add(e),e.start(),setTimeout((()=>{const s=G.getOne();s.position.copy(e.position),s.scale.copy(e.scale),s.rotation.y=-Math.PI/4,t.add(s),s.start()}),800)}}set status(t){switch(this._status=t,t){case N.blue:this.setMaterial("blue");break;case N.red:this.setMaterial("red");break;default:this.setMaterial("normal")}}get status(){return this._status}setMaterial(t){this.mesh.material=F[t].mesh,this.line.material=F[t].line,this.box.material=F[t].box;const e="normal"===t?F.blue.line:F[t].line;this.box.children[0]["material"]=e}}function D(t,e){return Math.floor(Math.random()*(e-t+1)+t)}function X(t,e,s,i,n,o){return t.moveTo(e,s+o),t.lineTo(e,s+n-o),t.quadraticCurveTo(e,s+n,e+o,s+n),t.lineTo(e+i-o,s+n),t.quadraticCurveTo(e+i,s+n,e+i,s+n-o),t.lineTo(e+i,s+o),t.quadraticCurveTo(e+i,s,e+i-o,s),t.lineTo(e+o,s),t.quadraticCurveTo(e,s,e,s+o),t}class H extends ${constructor(t,e){super(t,e),(0,k.Z)(this,"titleEl",void 0),(0,k.Z)(this,"listEl",void 0),(0,k.Z)(this,"_type",1),this.content.innerHTML="",this.content.classList.add("panel-target"),this.titleEl=v("div"),this.titleEl.className="panel-target-title",this.titleEl.innerHTML=`<span class="name">${t.name}</span><span class="score">${t.score}分</span>`,this.listEl=v("div"),this.listEl.className="panel-target-list",this.content.appendChild(this.titleEl),this.content.appendChild(this.listEl),this.el.addEventListener("mouseenter",(()=>{t.box.visible=!0})),this.el.addEventListener("mouseleave",(()=>{t.box.visible=!1}))}addItem(t){const e=this.listEl.childElementCount;if(3===e)return;const s=v("div");s.className="panel-target-item",s.innerHTML=`<span class="top">TOP0${e+1}</span><span class="tname">${t}</span>`,this.listEl.appendChild(s)}set type(t){this.content.classList.remove("panel-target-type-1"),this.content.classList.remove("panel-target-type-2"),this.content.classList.remove("panel-target-type-3"),this.content.classList.add(`panel-target-type-${t}`),this._type=t}get type(){return this._type}update(){super.update(),1!==this._type&&(this.el.style.visibility="visible")}}const q=[16771584,11075328,3604224,65472,41727];class J extends Y{constructor(t,e,s){super(t),(0,k.Z)(this,"name",void 0),(0,k.Z)(this,"score",void 0),(0,k.Z)(this,"panel",void 0),(0,k.Z)(this,"winTeams",[]),this.name=e,this.score=s,this.panel=new H(this,{y:200});const i=X(new g.bnF,0,0,220,220,20),n=(new g.u9r).setFromPoints(i.getPoints()),o=new g.x12(n,new g.nls({color:q[D(0,q.length-1)],linewidth:2,blending:g.WMw}));o.rotation.x=-Math.PI/2,o.position.set(-110,-10,110),this.add(o)}beAttack(t,e){e&&(this.panel.addItem(t.name),this.winTeams.includes(t)||this.winTeams.push(t)),setTimeout((()=>{this.explode(),this.status=e?2:3,this.panel.type=this.status,setTimeout((()=>{this.panel.type=1,this.status=e||this.winTeams.length?2:1}),4e3)}),500)}destroy(){this.panel.destroy()}}function U(t,e,s=2e3){const i=v("div");i.className="broadcast in",i.innerHTML=`\n    <div class="broadcast-title">${t}</div>\n    <div class="broadcast-content">${e}</div>`,document.body.appendChild(i),getComputedStyle(i).height,i.className="broadcast",setTimeout((()=>{i.className="broadcast out",setTimeout((()=>{document.body.removeChild(i)}),2e3)}),s)}class Q extends ${constructor(t,e){super(t,e),this.content.classList.add("panel-team")}}function V(t){let e,s=t.times||1;function i(){t.callback(),e=setTimeout((()=>{s-=1,s<=0?(clearTimeout(e),t.onEnd&&t.onEnd()):(t.callback(),i())}),t.interval)}t.onStart&&t.onStart(),i()}let tt;class et extends A{constructor(t,e){super(),(0,k.Z)(this,"name",void 0),(0,k.Z)(this,"target",void 0),(0,k.Z)(this,"success",!1),(0,k.Z)(this,"panel",void 0),(0,k.Z)(this,"box",void 0),(0,k.Z)(this,"mesh",void 0),(0,k.Z)(this,"cpos",new g.Tme),(0,k.Z)(this,"winRecords",[]),(0,k.Z)(this,"initialRotationY",0),this.name=e,this.panel=new Q(this,{y:55,x:-40});const s=t.material,i=s.normalMap;tt=tt||new g.Wid({color:4545129,roughness:.5,normalMap:i});const n=t.clone();n.material=tt,this.mesh=n,n.scale.set(.3,.3,.3),n.rotation.y=-Math.PI,n.position.y=-5;const o=new g.DvJ(6,24,6);o.faces.splice(4,2),o.faces.splice(4,2);const a=new g.vBJ({transparent:!0,blending:g.WMw,side:g.ehD,depthWrite:!1,map:(new g.dpR).load(`${P}/team-tail-${D(0,7)}.png`)}),r=new g.Kj0(o,a);r.rotation.x=-Math.PI/2,r.position.set(-20,-5,-55);const c=r.clone();c.position.x=20,this.position.y=400,this.cpos.position.set(0,20,-100),this.add(n,r,c,this.cpos)}startAttack(){const t=this.playground;t.focus(this),this.lookAt(this.target.position);const e={x:this.rotation.x,y:this.rotation.y,z:this.rotation.z};this.rotation.set(0,0,0),new S.kX(this.position).to({y:200},400).easing(S.oY.Quartic.InOut).onComplete(this.attack.bind(this)).start(),new S.kX(this.rotation).to(e,300).start()}attack(){const{target:t,success:e}=this,s=this.playground;V({interval:150,times:10,onStart:()=>{setTimeout((()=>{t.beAttack(this,e)}),900)},callback:()=>{this.lookAt(t.position),B.shoot(s,this,t)},onEnd:()=>{setTimeout(this.endAttack.bind(this),1100)}})}endAttack(){this.winRecords.length>=3&&U("KILL SPREE!!",`队伍 <span style="color:#fff">${this.name}</span> 连续攻破<span style="color:#fff">${this.winRecords.length}</span>题!`),this.target=null,this.success=!1,new S.kX(this.rotation).to({x:0,y:this.initialRotationY,z:0},400).start(),new S.kX(this.position).to({y:300}).easing(S.oY.Quadratic.InOut).start()}toAttack(t,e=!1){e?this.winRecords.push(t.name):this.winRecords=[],this.target||(this.target=t,this.success=e,this.playground.isPaused?(this.target.beAttack(this,e),this.target=null,this.success=!1):this.startAttack())}destroy(){this.panel.destroy()}}var st=function(t,e,s,i){var n,o=arguments.length,a=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)a=Reflect.decorate(t,e,s,i);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(a=(o<3?n(a):o>3?n(e,s,a):n(e,s))||a);return o>3&&a&&Object.defineProperty(e,s,a),a};let it=class extends u.w3{mounted(){this.init()}async init(){const t=await z.load(),[e,s]=await Promise.all([w().get("/json/targets.json"),w().get("/json/teams.json")]),i=new _(document.querySelector("#ctf"),t),n=e.data.map((e=>{const s=t.buildings[D(0,t.buildings.length-1)];return new J(s,e.name,e.score)})),o=s.data.map((e=>{const s=t.aerobat;return new et(s,e.name)}));function a(){if(!o.length||!n.length)return;const t=o[D(0,o.length-1)],e=n[D(0,n.length-1)],s=Math.random()>.5;t.toAttack(e,s),setTimeout(a,1e4*Math.random())}i.setTeams(o),i.setTargets(n),setTimeout(a,5e3)}};it=st([u.wA],it);var nt=it,ot=nt,at=(0,a.Z)(ot,d,p,!1,null,null,null),rt=at.exports;i.ZP.use(h.Z);const ct=[{path:"/",name:"ctf",component:rt}],lt=new h.Z({mode:"history",base:"/",routes:ct});var ht=lt,dt=s(3822);i.ZP.use(dt.ZP);var pt=new dt.ZP.Store({state:{},getters:{},mutations:{},actions:{},modules:{}});i.ZP.config.productionTip=!1,new i.ZP({router:ht,store:pt,render:t=>t(l)}).$mount("#app")}},e={};function s(i){var n=e[i];if(void 0!==n)return n.exports;var o=e[i]={exports:{}};return t[i](o,o.exports,s),o.exports}s.m=t,function(){var t=[];s.O=function(e,i,n,o){if(!i){var a=1/0;for(h=0;h<t.length;h++){i=t[h][0],n=t[h][1],o=t[h][2];for(var r=!0,c=0;c<i.length;c++)(!1&o||a>=o)&&Object.keys(s.O).every((function(t){return s.O[t](i[c])}))?i.splice(c--,1):(r=!1,o<a&&(a=o));if(r){t.splice(h--,1);var l=n();void 0!==l&&(e=l)}}return e}o=o||0;for(var h=t.length;h>0&&t[h-1][2]>o;h--)t[h]=t[h-1];t[h]=[i,n,o]}}(),function(){s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,{a:e}),e}}(),function(){s.d=function(t,e){for(var i in e)s.o(e,i)&&!s.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={143:0};s.O.j=function(e){return 0===t[e]};var e=function(e,i){var n,o,a=i[0],r=i[1],c=i[2],l=0;if(a.some((function(e){return 0!==t[e]}))){for(n in r)s.o(r,n)&&(s.m[n]=r[n]);if(c)var h=c(s)}for(e&&e(i);l<a.length;l++)o=a[l],s.o(t,o)&&t[o]&&t[o][0](),t[o]=0;return s.O(h)},i=self["webpackChunkctf_awd"]=self["webpackChunkctf_awd"]||[];i.forEach(e.bind(null,0)),i.push=e.bind(null,i.push.bind(i))}();var i=s.O(void 0,[998],(function(){return s(9791)}));i=s.O(i)})();
//# sourceMappingURL=app.78978843.js.map