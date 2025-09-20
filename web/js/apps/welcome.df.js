  export const appMeta = {
    name: "home",
    title: "home",

  };
  
  export function appInit(shell) {
    const processor = new GeminiProcessor();
    let session = null;
    const historyManager = new ChatHistoryManager("tm_chat_history");
    const root = document.getElementById("app-root");
    if (!root) {
      console.error("HomeApp: #app-rootが見つかりません");
      return;
    }
    root.innerHTML = `
 		<div class="window" id="home">
    		<div class="title-bar">
        		<div class="title-bar-controls">
           		        <button aria-label="Close" onclick="closeWindow()"></button>
                 </div>
                <div class="title-bar-controls-left">
           		        <button aria-label="Open" onclick="nothing()"></button>
                </div>
    </div>
    <div class="window-body">
			<h2>Deep-Fried Mobile</h2>
            <p>Welcome to All-New Deep-Fried Mobile!</p>	
         </div>
        </div>
    `;
  
   
  }
  