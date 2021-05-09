const listViewBtnEl=document.querySelector("#filter-view svg:nth-of-type(1)"),flexViewBtnEl=document.querySelector("#filter-view svg:nth-of-type(2)"),listViewEls=document.querySelectorAll(".file-list-container table"),flexViewEls=document.querySelectorAll(".file-list-container ul"),sliderEl=document.querySelector("#filter-view .slider");function filterAudio(e){const t=window.location.href.includes("folder")?"&folder_id="+window.location.href.substring(window.location.href.length-10):"";fetch("/ajax/filteraudio.php?val="+e+t).then(e=>{if(e.status>=200&&e.status<300)return e.text()}).then(e=>JSON.parse(e)).then(e=>{for(item in document.querySelector(".files.flexbox").innerHTML="",document.querySelector("table.files tbody").innerHTML="",window.filterResponse=e,e)addNewFile(e[item])})}function filterFolder(e){const t=window.location.href.includes("folder")?"&parent_id="+window.location.href.substring(window.location.href.length-10):"";fetch("/ajax/filterfolder.php?val="+e+t).then(e=>{if(e.status>=200&&e.status<300)return e.text()}).then(e=>JSON.parse(e)).then(e=>{for(item in document.querySelector(".folders.flexbox").innerHTML="",document.querySelector("table.folders tbody").innerHTML="",window.filterResponse=e,e)addNewFolder(e[item])})}function actionAudioFile(e,t,o,n="",l=function(e){}){fetch(`/ajax/${e}audio.php?user_id=${t}&audio_id=${o}&new_name=${n}`,{method:"get"}).then(e=>{if(e.status>=200&&e.status<300)return e.text()}).then(t=>{document.querySelector("."+e+"-container").style.display="none",window.displayStatus(t),l(t)})}function actionFolder(e,t,o,n="",l=function(e){}){fetch(`/ajax/${e}folder.php?user_id=${t}&folder_id=${o}&new_name=${n}`,{method:"get"}).then(e=>{if(e.status>=200&&e.status<300)return e.text()}).then(t=>{document.getElementsByClassName(e+"-container")[1].style.display="none",window.displayStatus(t),l(t)})}function deleteFolder(e,t){fetch("https://api.audio.borumtech.com/v1/folder",{method:"DELETE",headers:{authorization:"Basic "+e,"content-type":"application/x-www-form-urlencoded"},body:"folder_id="+t}).then(e=>{if(e.ok)return e.json()}).then(e=>{window.displayStatus("The folder was successfully deleted"),document.querySelector(".folders.flexbox").removeChild(document.getElementById("folder-"+t)),document.querySelectorAll(".delete-container")[1].style.display="none"})}function shareFolder(e,t){const o=document.getElementById("share-folder-email");o.parentElement.id.substring(17);actionFolder("share",e,t=t.substring("share-folder-box-".length),o.value)}function renameFolder(e,t){let o=document.querySelector("#"+t+' input[type="text"]');o=o.value,console.log(o);const n=t.substring("rename-folder-box-".length);actionFolder("rename",e,n,encodeURIComponent(o),(function(){document.querySelector("#folder-"+n+" a").innerHTML=o}))}function deleteAudioFile(e,t){actionAudioFile("delete",e,t)}function shareAudioFile(e,t){const o=document.getElementById("share-file-email");o.parentElement.id.substring(16);actionAudioFile("share",e,t=t.substring("share-audio-box-".length),o.value)}function renameAudioFile(e,t){const o=document.querySelector("#"+t+' input[type="text"]').value,n=t.substring(17);fetch("https://api.audio.borumtech.com/v1/audio",{method:"put",headers:{Authorization:"Basic "+e,"Content-Type":"application/x-www-form-urlencoded"},body:`audio_id=${t}&new_name=${o}`}).then(e=>{if(e.ok)return e.text()}).then(e=>{document.querySelector(".rename-container").style.display="none",window.displayStatus(e),document.querySelector("#file-"+n+" p").innerHTML=o}).catch(e=>{document.querySelector(".rename-container").style.display="none",window.displayStatus("Error: "+e)})}let w;function connectToBorum(e="Flytrap"){w=window.open("https://forum.borumtech.com/Login","MsgWindow","width=500,height=600"),window.addEventListener("message",(function(t){"https://forum.borumtech.com"===t.origin&&(console.log(t.data),performLoginWithBorum(t,e))}),!1),document.body.onunload=function(){w.close()}}function performLoginWithBorum(e,t){try{setTimeout((function(){window.location.href="/"}),1e3)}catch(e){alert(`You could not be logged in to ${t} because of a system error.`)}}function handlePlusMouseEvents(e,t,o,n){document.querySelectorAll(".plus-container *, .new-media-btn-container").forEach((l,i)=>{l.addEventListener(e,(function(e){window.matchMedia("(min-width: 1025px)").matches&&(document.getElementById("add-audio").className=t,document.querySelector(".new-media-btn-container").style.display=o,document.getElementById("plus-between").style.display=n)}))})}function handleMatch(){document.getElementById("filter-audio");if(window.matchMedia("(max-width: 460px)").matches){document.querySelector(".new-media-btn-container").style.display="block"}const e=document.querySelectorAll(".new-button");if(window.matchMedia("(min-width: 1025px)").matches){const t=document.querySelector(".new-media-btn-container");for(let o=0;o<e.length;o++)t.appendChild(e[o])}else if(window.matchMedia("(min-width: 768px) and (max-width: 1024px)").matches){const t=document.querySelector(".nav-container");for(let o=0;o<e.length;o++)t.appendChild(e[o])}else if(window.matchMedia("(max-width: 767px)").matches){const t=document.querySelector(".plus-container");for(let o=0;o<e.length;o++)t.appendChild(e[o])}}function recordDirectly(){hasGetUserMedia()?getMedia({video:!0}):alert("getUserMedia() is not supported by your browser")}function hasGetUserMedia(){return!(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)}function getMedia(e){navigator.mediaDevices.getUserMedia(e).then(useStream).catch((function(e){alert("Your audio will not be shared to the browser")}))}function useStream(e){const t=document.querySelector("video");t.srcObject=e,console.log(t.srcObject),document.querySelector("button.stop-recording").onclick=()=>{e.getVideoTracks().forEach(e=>e.stop())}}listViewBtnEl.onclick=e=>{sliderEl.classList.toggle("slide-right",!1),sliderEl.classList.toggle("slide-left",!0),listViewEls.forEach((e,t)=>{e.style.display="table"}),flexViewEls.forEach((e,t)=>{e.style.display="none"})},flexViewBtnEl.onclick=e=>{sliderEl.classList.toggle("slide-left",!1),sliderEl.classList.toggle("slide-right",!0),flexViewEls.forEach((e,t)=>{e.style.display="flex"}),listViewEls.forEach((e,t)=>{e.style.display="none"})},function(){function e(e){return svg=document.createElementNS("http://www.w3.org/2000/svg","svg"),svg.setAttribute("width",90),svg.setAttribute("height",40),filters=["Mine","Shared","All"],pentagon=document.createElementNS("http://www.w3.org/2000/svg","polygon"),pentagon.setAttribute("points","10,20 20,0 90,0 90,40 20,40"),pentagon.setAttribute("fill","lightblue"),pentagon.setAttribute("stroke-width",1),purpose=document.createElementNS("http://www.w3.org/2000/svg","text"),purpose.textContent=filters[e],purpose.setAttribute("x","50%"),purpose.setAttribute("y","50%"),purpose.setAttribute("text-anchor","middle"),svg.appendChild(pentagon),svg.appendChild(purpose),svg}document.querySelector(".filter-container").querySelectorAll(".files, .folders").forEach((t,o)=>{for(let n=0;n<3;n++){let l=e(n);t.appendChild(l),l.onclick=e=>{l.querySelector("polygon").setAttribute("points","0,20, 20,0, 90,0 90,40 20,40"),t.querySelectorAll("svg:not(:nth-child("+(n+1)+")) > polygon").forEach((e,t)=>{e.setAttribute("points","10,20 20,0 90,0 90,40 20,40")});let i=1==o?"Audio":"Folder";switch(i="filter"+i,l.querySelector("text").textContent){case"Mine":window[i]("owned");break;case"Shared":window[i]("shared");break;case"All":window[i]("all")}}}})}(),handleNewFileBox(),handlePlusMouseEvents("mouseover","rotate","block","block"),handlePlusMouseEvents("mouseout","rotate-back","none","none"),window.addEventListener("resize",handleMatch),window.addEventListener("load",handleMatch);const showBoxBtnEl=document.querySelector("#new-audio-btn");function handleAllAudioBoxes(){handleActionBox("share","audio"),handleActionBox("delete","audio"),handleActionBox("rename","audio",(e,t)=>{e.querySelector("input").value=t.parentElement.parentElement.querySelector("p").textContent})}function handleAllFolderBoxes(){handleActionBox("share","folder"),handleActionBox("delete","folder"),handleActionBox("rename","folder")}function handleActionBox(e,t,o=(e=>{})){const n=document.getElementsByClassName(e+"-container")["audio"==t?0:1];document.querySelectorAll("button."+e+"-"+t).forEach((l,i)=>{l.onclick=()=>{n.style.display="block",n.id=e+"-"+t+"-box-"+l.parentElement.parentElement.id.substring("audio"==t?5:7),o(n,l)}})}function showNameFolderPopupBox(){const e=document.querySelectorAll(".create-container")[1];e.style.display="block",e.querySelector("input").select()}handleAllAudioBoxes(),handleAllFolderBoxes();const fileBoxEl=document.querySelector(".new-file-box-container");function handleNewFileBox(){function e(t){var o;!fileBoxEl.contains(t.target)&&((o=fileBoxEl)&&(o.offsetWidth||o.offsetHeight||o.getClientRects().length))&&(toggleDisplay("none",1),toggleDisabled(!1,showBoxBtnEl),document.removeEventListener("click",e),document.getElementById("upload-file-progress-bar").style.display="none")}function t(){document.getElementById("upload-file-arrow").className="bounce"}document.getElementById("new-audio-btn").addEventListener("click",(function(o){o.preventDefault(),o.stopPropagation(),toggleDisplay("block",.5),toggleDisabled(!0,showBoxBtnEl),document.addEventListener("click",e),setTimeout(t,500)}))}function toggleDisplay(e,t){document.querySelectorAll(".grid > div:not(.new-file-box-container)").forEach((e,o)=>{e.style.opacity=t}),fileBoxEl.style.display=e}function toggleDisabled(e,t){t.attributes.disabled=e,isDisabled=e}function getAndDisplayFolderElements(e,t=""){fetch("https://api.audio.borumtech.com/v1/folder?folder_id="+t,{headers:{authorization:"Basic "+e}}).then(e=>{if(e.ok)return e.json()}).then(e=>{console.info(e),document.querySelector(".files.flexbox").innerHTML=displayAudioData(e.audio),handleAllAudioBoxes(),document.querySelector(".folders.flexbox").innerHTML=displayFolderData(e.folder),handleAllFolderBoxes()}).catch(e=>{window.displayStatus("The data could not be fetched due to a system error","error")})}function displayFolderData(e){if(e.error||!e.data)return;let t="";for(const o of e.data){t+=`\n\t\t<li id="folder-${o.id}">\n\t\t\t<a href="/folders/${o.alpha_id}">${o.folder_name}</a>\n\t\t\t<div class = 'customize-btns'>\n\t\t\t\t<button class = 'rename-folder'><img class = 'grey-circle' src = 'https://cdn.borumtech.com/images/Edit.png'></button>\n\t\t\t\t<button class = 'delete-folder'><img class = 'grey-circle' src = 'https://cdn.borumtech.com/images/Delete.png'></button>\n\t\t\t\t<button class = 'share-folder'><img class = 'grey-circle' src = 'https://cdn.borumtech.com/images/register.png'></button>\n\t\t\t</div>\n\t\t</li>\n\t\t`}return t}function displayAudioData(e){if(e.error||!e.data)return;let t="";for(const o of e.data){t+=`<li id = "file-${o.id}">\n\t\t\t<a href = '/audio/${o.alpha_id}'>\n\t\t\t\t<img id = "microphone-${o.id}" ondragstart='onDragStart(event);' ondragend='onDragEnd(event)' draggable='true' src = '/images/microphone.png'>\n\t\t\t\t<p>${o.file_name}</p>\n\t\t\t</a>\n\t\t\t<div class = 'customize-btns'>\n\t\t\t\t<button class = 'rename-audio'><img class = 'grey-circle' src = 'https://cdn.borumtech.com/images/Edit.png'></button>\n\t\t\t\t<button class = 'delete-audio'><img class = 'grey-circle' src = 'https://cdn.borumtech.com/images/Delete.png'></button>\n\t\t\t\t<button class = 'share-audio'><img class = 'grey-circle' src = 'https://cdn.borumtech.com/images/register.png'></button>\n\t\t\t</div>\n\t\t</li>`}return t}function createNewFolder(e,t="New Folder"){const o=window.location.href.substring(window.location.href.lastIndexOf("/")+1);fetch("https://api.audio.borumtech.com/v1/folder",{method:"post",headers:{authorization:"Basic "+e,"content-type":"application/x-www-form-urlencoded"},body:`parent_id=${o}&name=${t}`}).then(e=>{if(e.ok)return e.json()}).then(e=>{e.error&&e.error.message&&window.displayStatus(e.error.message),addNewFolder(e.data)})}function searchFlytrap(e){const t=e.target.value;document.querySelector(".file-list-container");["Shift","Control"].includes(e.key)||(fetch("ajax/search.php?q="+t,{method:"get"}).then(e=>{if(e.status>=200&&e.status<300)return e.text()}).then(e=>JSON.parse(e)).then(e=>{for(item of(document.querySelector(".files.flexbox").innerHTML="",document.querySelector(".folders.flexbox").innerHTML="",document.querySelector("table.files tbody").innerHTML="",document.querySelector("table.folders tbody").innerHTML="",console.log("Add New File Data: "),console.log(e[0]),e[0]))addNewFile(item);for(item of(console.log("Add New Folder Data: "),console.log(e[1]),e[1]))addNewFolder(item)}),"Enter"==e.key&&(location.href="/search?q="+t))}function addNewFolder(e){document.querySelector(".folders.flexbox").innerHTML+=`\n\t<li id = "folder-${e.id}">\n\t\t<a href = "/folders/${e.alpha_id}">${e.folder_name}</a>\n\t\t<div class = 'customize-btns'>\n\t\t\t<button class = 'rename-folder'>\n\t\t\t\t<img class = 'grey-circle' src = 'https://cdn.borumtech.com/images/Edit.png'>\n\t\t\t</button>\n\t\t\t<button class = 'delete-folder'>\n\t\t\t\t<img class = 'grey-circle' src = 'https://cdn.borumtech.com/images/Delete.png'>\n\t\t\t</button>\n\t\t\t<button class = 'share-folder'>\n\t\t\t\t<img class = 'grey-circle' src = 'https://cdn.borumtech.com/images/register.png'>\n\t\t\t</button>\n\t\t</div>\n\t</li>`,document.querySelector("table.folders tbody").innerHTML+=`<tr id = "folder-${e.id}">\n\t\t<td><a href = 'folders/${e.alpha_id}'>${e.folder_name}</a></td>\n\t\t<td>${e.time_created}</td>\n\t\t<td class = 'customize-btns'>\n\t\t\t<button class = 'rename-folder'><img class = 'grey-circle' src = 'https://cdn.borumtech.com/images/Edit.png'></button>\n\t\t\t<button class = 'delete-folder'><img class = 'grey-circle' src = 'https://cdn.borumtech.com/images/Delete.png'></button>\n\t\t\t<button class = 'share-folder'><img class = 'grey-circle' src = 'https://cdn.borumtech.com/images/register.png'></button>\n\t\t</td>\n\t</tr>`,document.querySelectorAll(".create-container")[1].style.display="none",handleActionBox("share","folder"),handleActionBox("delete","folder"),handleActionBox("rename","folder")}function addNewFile(e){document.querySelector(".files.flexbox").innerHTML+=`<li id = 'file-${e.id}'><a href = "/audio/${e.alpha_id}">\n\t\t<img src = '/images/microphone.png'>\n\t\t<p>${e.file_name}</p></a><div class = 'customize-btns'>\t<button class="rename-audio"><img class="grey-circle" src="https://cdn.borumtech.com/images/Edit.png"></button><button class="delete-audio"><img class="grey-circle" src="https://cdn.borumtech.com/images/Delete.png"></button><button class="share-audio"><img class="grey-circle" src="https://cdn.borumtech.com/images/register.png"></button></div></li>`,document.querySelector("table.files tbody").innerHTML+=`<tr id = "file-${e[0]}"><td><a href = "audio/${e.afid}">${e.file_name}</a></td><td>${e.time_created}</td><td class = 'customize-btns'><button class = 'rename-audio'><img class = 'grey-circle' src = 'https://cdn.borumtech.com/images/Edit.png'></button><button class = 'delete-audio'><img class = 'grey-circle' src = 'https://cdn.borumtech.com/images/Delete.png'></button><button class = 'share-audio'><img class = 'grey-circle' src = 'https://cdn.borumtech.com/images/register.png'></button></td>\n\t</tr>`,handleActionBox("share","audio"),handleActionBox("delete","audio"),handleActionBox("rename","audio")}function exitPopup(e){e.target.parentElement.style.display="none"}function uploadFile(e){const t=document.getElementById("upload-file-progress-bar"),o=new FormData;for(let e in this.files)if(this.files.hasOwnProperty(e)){const n=this.files[e];if(o.append("file"+e,n),!["audio/wav","audio/x-wav","audio/mp3","audio/mpeg"].includes(n.type))return void displayStatus("You may only upload an audio file!");if(n.size>1e7)return void displayStatus("max upload size is 10 MB");t.style.display="inline-block"}sendFiles(o)}function sendFiles(e){let t;t=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");function o(e){document.getElementById("upload-file-progress-bar").value=e.loaded}t.open("POST","/ajax/uploadaudio.php",!0),t.overrideMimeType("multipart/form-data"),t.addEventListener("loadstart",o),function e(t){t>90||(document.getElementById("upload-file-progress-bar").value=t,setTimeout((function(){e(t+1)}),200))}(1),t.addEventListener("loadend",o),t.addEventListener("error",o),t.addEventListener("abort",o),t.onreadystatechange=function(){4==t.readyState&&200==t.status&&(toggleDisplay("none",1),toggleDisabled(!1),document.getElementById("upload-file-progress-bar").style.display="none",displayStatus(t.responseText))},t.send(e)}function displayStatus(e,t="success"){const o=document.querySelector(".status-container");"error"===t&&o.classList.add("error"),document.querySelector(".status-container").classList.remove("hide-status"),document.querySelector(".status-container").classList.add("show-status"),document.querySelector(".status-container").style.display="flex",o.style.justifyContent="center",o.style.alignItems="center",document.querySelector(".status-container").innerHTML=e,setTimeout((function(){document.querySelector(".status-container").classList.remove("show-status"),document.querySelector(".status-container").classList.add("hide-status")}),2e3)}function onDragStart(e){e.dataTransfer.setData("text/plain",e.target.id),e.currentTarget.style.backgroundColor="yellow"}function onDragOver(e){e.preventDefault(),"true"==e.target.getAttribute("draggable")?e.dataTransfer.dropEffect="none":e.dataTransfer.dropEffect="all"}function onDrop(e){const t=e.dataTransfer.getData("text");if(t.includes("microphone-")){const o=document.getElementById(t);let n=e.target.closest("li").id.substring("folder-".length),l=o.parentElement.parentElement.id.substring("file-".length);console.log("Folder ID: "+n+", File ID: "+l),e.dataTransfer.clearData(),moveFolder(n,l)}}function moveFolder(e,t,o="0"){fetch("/ajax/moveaudio.php",{method:"post",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:`new_folder=${e}&file_id=${t}&convert=${o}`}).then(e=>{if(e.status>=200&&e.status<300)return e.text()}).then(e=>{window.displayStatus(e)})}function moveDragOver(e){e.target.src="/images/openbox.png",onDragOver(e)}function moveDrop(e){e.target.src="/images/closedbox.png",onDrop(e)}function onDragEnd(e){e.currentTarget.style.background="none"}document.getElementById("search-bar").onkeyup=searchFlytrap,document.querySelectorAll(".action-container img").forEach((e,t)=>{e.onclick=exitPopup,e.onkeydown=e=>{"Escape"==e.key&&exitPopup(e)}}),document.querySelector('.new-file-box-container form input[name="file"]').onchange=uploadFile;const advancedButtonEl=document.getElementsByClassName("advanced-btn")[0],advancedMoveBox=document.getElementsByClassName("change-id-container")[0];function handleAdvancedMoveItem(){function e(t){var o;!advancedMoveBox.contains(t.target)&&((o=advancedMoveBox)&&(o.offsetWidth||o.offsetHeight||o.getClientRects().length))&&(toggleDisplay2("none",1),toggleDisabled2(!1),document.removeEventListener("click",e))}advancedButtonEl&&advancedMoveBox&&(advancedButtonEl.addEventListener("click",(function(t){t.preventDefault(),t.stopPropagation(),toggleDisplay2("block",.5),toggleDisabled2(!0),advancedMoveBox.querySelector("input").value="https://audio.borumtech.com/folders/",document.addEventListener("click",e)})),advancedMoveBox.querySelectorAll(".file-list-container ul li").forEach((e,t)=>{e.onclick=t=>{e.style.outline="black solid 3px"==e.style.outline?"none":"3px solid black",e.classList.add("selected")}}))}function toggleDisplay2(e,t){document.querySelectorAll(".grid > div:not(.change-id-container)").forEach((e,o)=>{e.style.opacity=t}),advancedMoveBox.style.display=e}function toggleDisabled2(e){advancedButtonEl.attributes.disabled=e,isDisabled=e}function moveAdvancedItem(){const e=document.querySelectorAll(".change-id-container .file-list-container .files .selected");let t=document.querySelector(".change-id-container input").value.substring("https://audio.borumtech.com/folders/".length),o=3;""==t&&(t=0,o=0),e.forEach((e,n)=>{let l=e.id.substring("file-".length);moveFolder(t,l,o)}),document.querySelector(".change-id-container").style.display="none",toggleDisplay2("none",1),toggleDisabled2(!1)}handleAdvancedMoveItem();