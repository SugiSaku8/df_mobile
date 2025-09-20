  export const appMeta = {
    name: "home",
    title: "home",

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
			<h2>Deep-Fried Mobile</h2>
            <p>Welcome to All-New Deep-Fried Mobile!</p>	
         </div>
        </div>
    `;
  }
  