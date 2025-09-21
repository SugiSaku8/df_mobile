export const appMeta = {
  name: "setting",
  title: "設定",
  icon: "/web/img/setting.png"
};

export function appInit(shell) {
  const root = document.getElementById("app-root");
  if (!root) {
    console.error("SettingsApp: #app-root not found");
    return;
  }

  // Sample settings data
  const settings = [
    {
      id: 'notifications',
      title: '通知',
      type: 'toggle',
      value: true
    },
    {
      id: 'darkMode',
      title: 'ダークモード',
      type: 'toggle',
      value: false
    },
    {
      id: 'language',
      title: '言語',
      type: 'select',
      value: 'ja',
      options: [
        { value: 'ja', label: '日本語' },
        { value: 'en', label: 'English' },
        { value: 'zh', label: '中文' },
        { value: 'ko', label: '한국어' }
      ]
    },
    {
      id: 'version',
      title: 'バージョン情報',
      type: 'text',
      value: '1.0.0',
      subtitle: 'Deep-Fried Mobile'
    },
    {
      id: 'privacy',
      title: 'プライバシーポリシー',
      type: 'link',
      url: '/privacy'
    },
    {
      id: 'terms',
      title: '利用規約',
      type: 'link',
      url: '/terms'
    }
  ];

  // Render settings
  const renderSettingItem = (setting) => {
    switch(setting.type) {
      case 'toggle':
        return `
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-title">${setting.title}</div>
            </div>
            <label class="switch">
              <input type="checkbox" ${setting.value ? 'checked' : ''} 
                onchange="handleSettingChange('${setting.id}', this.checked)">
              <span class="slider round"></span>
            </label>
          </div>
        `;
      case 'select':
        return `
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-title">${setting.title}</div>
            </div>
            <select class="setting-select" 
              onchange="handleSettingChange('${setting.id}', this.value)">
              ${setting.options.map(opt => 
                `<option value="${opt.value}" ${setting.value === opt.value ? 'selected' : ''}>
                  ${opt.label}
                </option>`
              ).join('')}
            </select>
          </div>
        `;
      case 'link':
        return `
          <div class="setting-item clickable" onclick="handleSettingClick('${setting.id}')">
            <div class="setting-info">
              <div class="setting-title">${setting.title}</div>
            </div>
            <div class="setting-arrow">›</div>
          </div>
        `;
      default:
        return `
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-title">${setting.title}</div>
              ${setting.subtitle ? `<div class="setting-subtitle">${setting.subtitle}</div>` : ''}
            </div>
            <div class="setting-value">${setting.value}</div>
          </div>
        `;
    }
  };

  // Set up the HTML
  root.innerHTML = `
    <div class="window" id="settings">
      <div class="title-bar">
        <div class="title-bar-text">設定</div>
        <div class="title-bar-controls">
          <button aria-label="Close" onclick="window.history.back()"></button>
        </div>
      </div>
      <div class="window-body settings-container">
        ${settings.map(setting => renderSettingItem(setting)).join('')}
      </div>
    </div>
    <style>
      .settings-container {
        padding: 0;
      }
      
      .setting-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 20px;
        border-bottom: 1px solid #f0f0f0;
        background: white;
      }
      
      .clickable {
        cursor: pointer;
      }
      
      .clickable:active {
        background-color: #f8f8f8;
      }
      
      .setting-info {
        flex: 1;
      }
      
      .setting-title {
        font-size: 16px;
        color: #333;
      }
      
      .setting-subtitle {
        font-size: 12px;
        color: #888;
        margin-top: 4px;
      }
      
      .setting-value {
        font-size: 14px;
        color: #666;
        margin-right: 8px;
      }
      
      .setting-arrow {
        color: #999;
        font-size: 20px;
        margin-left: 8px;
      }
      
      /* Toggle switch styles */
      .switch {
        position: relative;
        display: inline-block;
        width: 50px;
        height: 24px;
      }
      
      .switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }
      
      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: .4s;
        border-radius: 24px;
      }
      
      .slider:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: .4s;
        border-radius: 50%;
      }
      
      input:checked + .slider {
        background-color: #4CAF50;
      }
      
      input:focus + .slider {
        box-shadow: 0 0 1px #4CAF50;
      }
      
      input:checked + .slider:before {
        transform: translateX(26px);
      }
      
      /* Select styles */
      .setting-select {
        padding: 6px 10px;
        border-radius: 4px;
        border: 1px solid #ddd;
        background-color: white;
        font-size: 14px;
        color: #333;
        outline: none;
      }
      
      .setting-select:focus {
        border-color: #4CAF50;
      }
    </style>
  `;

  // Add global functions for event handling
  window.handleSettingChange = (id, value) => {
    console.log(`Setting changed: ${id} =`, value);
    // Here you would typically save the setting
    // For example: saveSetting(id, value);
  };

  window.handleSettingClick = (id) => {
    console.log(`Setting clicked: ${id}`);
    // Handle navigation or action for the clicked setting
    // For example: navigateTo(setting.url);
  };
}
