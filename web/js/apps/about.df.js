export const appMeta = {
  name: "about",
  title: "About this Deep-Fried Mobile",
};

export function appInit(shell) {
  const root = document.getElementById("app-root");
  if (!root) {
    console.error("HomeApp: #app-rootが見つかりません");
    return;
  }
  root.innerHTML = `
 		<div class="window" id="about">
    		<div class="title-bar">
        		<div class="title-bar-controls">
           		        <button id="close-btn-color" onclick="closeWindow()"></button>
                 </div>
                <div class="title-bar-controls-left">
           		        <button id="open-btn-color" onclick=""></button>
                </div>
    </div>
    <div class="window-body">
			<h2>About this Deep-Fried Mobile</h2>
           <img src="../img/logo.svg" alt="Deep-Fried Mobile" class="about-main-logo">
           <div class="about-sub-images">
                      <img src="../img/db6.png" alt="Deep-Base Version 6">
                      <img src="../img/mobile.svg" alt="For Mobile">
           </div>
        <p style="font-family:'thin';text-size:10vh;">
            Deep-Fried Mobile
            Version 5.5.0
            2025.11.1 Released
        </p>
         </div>
        </div>
    `;
}
