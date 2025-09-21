  export const appMeta = {
    name: "welcome",
    title: "Welcome",
    icon: "re/ico/home_32x.png"
  };
  
  export function appInit(shell) {
    const root = document.getElementById("app-root");
    if (!root) {
      console.error("HomeApp: #app-rootが見つかりません");
      return;
    }
    root.innerHTML = `
 		<div class="window" id="home">
    		<div class="title-bar">
        		<div class="title-bar-controls">
           		        <button id="close-btn-color" onclick=""></button>
                 </div>
                <div class="title-bar-controls-left">
           		        <button id="open-btn-color" onclick=""></button>
                </div>
    </div>
    <div class="window-body">
              <img src="/web/img/logo.svg" alt="Deep-Fried Mobile" class="about-logo">
			<h2>Deep-Fried Mobile</h2>
            <p>Welcome to All-New Deep-Fried Mobile!</p>	
         </div>
        </div>
        <style>
         .about-logo {
        width: 120px;
        height: auto;
        margin-bottom: 10px;
      }
        </style>
    `;
  }
  