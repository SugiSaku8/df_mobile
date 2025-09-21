export const appMeta = {
  name: "about",
  title: "About This Deep-Fried",
  icon: "re/ico/info_32x.png"
};

export function appInit(shell) {
  const root = document.getElementById("app-about");
  if (!root) {
    console.error("AboutApp: #app-aboutが見つかりません");
    return;
  }

  root.innerHTML = `
    <div class="title-bar">
      <div class="title-bar-controls">
        <button id="close-btn-color"></button>
      </div>
      <div class="title-bar-controls-left">
        <button id="open-btn-color"></button>
      </div>
    </div>
    <div class="window-body">
      <div class="about-content">
      <h1>About this Deep-Fried</h1>
        <div class="about-header">
          <img src="/web/img/logo.svg" alt="Deep-Fried Mobile" class="about-logo">
          <h2>Deep-Fried Mobile</h2>
          <p class="version">Version 5.5.0</p>
          <p class="release-date">Released: 2025.11.1</p>
        </div>

        <div class="about-details">
          <div class="about-section">
            <h3>About</h3>
            <p>Deep-Fried Mobile brings the power of Deep-Fried to your mobile device with an optimized interface and touch controls.</p>
          </div>

          <div class="about-section">
            <h3>Powered By</h3>
            <div class="powered-by">
              <img src="/web/img/db6.png" alt="Deep-Base 6" class="powered-by-logo">
              <span>Deep-Base 6</span>
            </div>
            <div class="presented-by">
              <img src="/web/img/crs.png" alt="Presented By Carnation Studio" class="presented-logo">
            </div>
          </div>

        </div>
      </div>
    </div>
    <style>
      .about-content {
        padding: 15px;
        max-width: 500px;
        margin: 0 auto;
      }

      .about-header {
        text-align: center;
        margin-bottom: 20px;
      }

      .about-logo {
        width: 120px;
        height: auto;
        margin-bottom: 10px;
      }

      .version, .release-date {
        color: #666;
        margin: 5px 0;
      }

      .about-section {
        margin: 20px 0;
        padding: 15px;
        background: rgba(0,0,0,0.03);
        border-radius: 5px;
      }

      .about-section h3 {
        margin-top: 0;
        color: #0066cc;
      }

      .powered-by {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 10px;
      }

      .powered-by-logo {
        height: 120px;
        width:auto;
        border-radius:25px;
      }


         .presented-by {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 10px;
      }

      .presented-logo {
        height: 300px;
        width: auto;
        border-radius:99px;
      }
      .system-info {
        font-family: monospace;
        font-size: 12px;
      }

      .info-row {
        margin: 5px 0;
        word-break: break-all;
      }

      .info-label {
        font-weight: bold;
        margin-right: 5px;
      }
    </style>
  `;

  // Add event listeners for close button
  const closeBtn = root.querySelector('#close-btn-color');
  if (closeBtn) {
    closeBtn.onclick = () => {
      root.style.display = 'none';
    };
  }

  console.log('About window initialized');
}
