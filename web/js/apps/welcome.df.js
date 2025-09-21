  export const appMeta = {
    name: "welcome",
    title: "Welcome",
    icon: "re/ico/home_32x.png"
  };
  
  
  function handleMenuClick(action) {
    console.log(`Menu item clicked: ${action}`);
    // Add your menu item click handling logic here
    switch(action) {
      case 'settings':
          window.shell.loadApp("setting");
        break;
      case 'net':
        // Handle backup click
        console.log('Initiating backup...');
        break;
      case 'lilkau':
        // Handle restore click
        console.log('Initiating restore...');
        break;
      case 'something':
        // Handle version info click
        console.log('Showing version info...');
        break;
    }
  } 
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
			<h1 style="font-size:70px;">Deep-Fried Mobile</h>
            <p style="font-family:'thin';font-size:40px;">Welcome to <br>Deep-Fried Mobile</p>
            <div class="icon-grid">
                <div class="icon-item" onclick="handleMenuClick('something')">
                    <img src="/web/img/anything.png" alt="SomeThing" class="icon-image">
                    <span class="icon-label">SomeThing</span>
                </div>
                <div class="icon-item" onclick="handleMenuClick('net')">
                    <img src="/web/img/net.png" alt="ネット" class="icon-image">
                    <span class="icon-label">ネット</span>
                </div>
                <div class="icon-item" onclick="handleMenuClick('lilkau')">
                    <img src="/web/img/shop.png" alt="ショップ" class="icon-image">
                    <span class="icon-label">Lilkau</span>
                </div>
                <div class="icon-item" onclick="handleMenuClick('setting')">
                    <img src="/web/img/setting.png" alt="設定" class="icon-image">
                    <span class="icon-label">設定</span>
                </div>
            </div>
        </div>
    </div>
    <style>
        .about-logo {
            width: 200px;
            height: auto;
            margin-bottom: 10px;
        }
        
        .icon-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 25px;
            max-width: 400px;
            margin: 30px auto 0;
            padding: 0 20px;
            width: 100%;
            box-sizing: border-box;
        }
        
        
        .icon-item:active {
            transform: scale(0.95);
        }
        
        .icon-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
            transition: transform 0.2s ease;
            text-decoration: none;
            color: inherit;
            padding: 10px;
        }
        
        .icon-image {
            width: 140px;
            height: 140px;
            object-fit: cover;
            border-radius: 25px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            transition: all 0.2s ease;
        }
        
        .icon-item:hover .icon-image {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }
        
        .icon-label {
            font-size: 30px;
            text-align: center;
            margin-top: 6px;
            color: #333;
            font-weight: 500;
        }
        .menu-container {
            margin-top: 30px;
            width: 100%;
            max-width: 400px;
            margin-left: auto;
            margin-right: auto;
        }
        .menu-item {
            display: flex;
            align-items: center;
            padding: 12px 20px;
            margin: 5px 0;
            background-color: #f8f8f8;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s ease;
            user-select: none;
        }
        
        .menu-item:active {
            transform: scale(0.98);
            background-color: #e8e8e8;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1) inset;
        }
        .menu-item:hover {
            background-color: #f0f0f0;
        }
        .menu-icon {
            width: 24px;
            height: 24px;
            margin-right: 15px;
        }
        .menu-item span {
            font-size: 16px;
            color: #333;
        }
    `;
  
  }