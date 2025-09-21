import * as welcomeApp from "./apps/welcome.df.js";
import * as aboutApp from "./apps/about.df.js";
import * as settingApp from "./apps/setting.df.js";

// Deep-Fried-Shell: 全アプリの初期化・表示制御ハブ

const appModules = {
  welcome: welcomeApp,
  about: aboutApp,
  setting: settingApp,
};

// Deep-Fried ログシステム
class DeepFriedShell {
  constructor() {
    this.currentApp = null;
    this.initializedApps = new Set();
    this.logMemory = {};
    this.logDisplays = [
      "stdout",
      "stderr",
      "appout",
      "appin",
      "apperr",
      "oappout",
      "oappin",
      "oapperr",
      "3rdappout",
      "3rdappin",
      "3rdapperr",
      "sysout",
      "sysin",
      "syserr",
    ];
    this.logDisplays.forEach((d) => (this.logMemory[d] = []));
    this._activeDisplay = null;

    // ds.log.swで呼べるようにlogにswを生やす
    const logFunc = this.log.bind(this);
    logFunc.sw = this.log_sw.bind(this);
    this.log = logFunc;

    // バージョン管理機能を初期化
    this._initVersionCommands();
  }

  // バージョン管理コマンドを初期化
  _initVersionCommands() {
    // バージョン情報を表示するコマンド
    this.version = {
      // 全バージョン情報を表示
      all: async () => {
        await versionManager.loadVersionConfig();
        const formatted = versionManager.formatVersion("all");
        console.log(formatted);
        this.log({
          from: "dp.sys.version",
          message: "Version information displayed",
          level: "info",
        });
        return formatted;
      },

      // 特定コンポーネントのバージョン情報を表示
      get: async (component = "client") => {
        await versionManager.loadVersionConfig();
        const formatted = versionManager.formatVersion(component);
        console.log(formatted);
        this.log({
          from: "dp.sys.version",
          message: `${component} version information displayed`,
          level: "info",
        });
        return formatted;
      },

      // 利用可能なコンポーネント一覧
      list: () => {
        const components = [
          "family",
          "client",
          "server",
          "workmaker",
          "toaster",
        ];
        console.log("Available components:", components.join(", "));
        this.log({
          from: "dp.sys.version",
          message: "Available components listed",
          level: "info",
        });
        return components;
      },

      // アップデートチェック
      check: async () => {
        await versionManager.loadVersionConfig();
        const updates = versionManager.checkForUpdates();
        console.log("Update check results:", updates);
        this.log({
          from: "dp.sys.version",
          message: "Update check completed",
          level: "info",
        });
        return updates;
      },

      // バージョン比較
      compare: (version1, version2) => {
        const result = versionManager.compareVersions(version1, version2);
        const comparison =
          result === 1 ? "newer" : result === -1 ? "older" : "same";
        console.log(
          `Version comparison: ${version1} is ${comparison} than ${version2}`
        );
        this.log({
          from: "dp.sys.version",
          message: `Version comparison: ${version1} vs ${version2}`,
          level: "info",
        });
        return { result, comparison };
      },
    };

    // ヘルプコマンド
    this.help = {
      version: () => {
        const help = `
=== Version Management Commands ===

ds.version.all()           - Display all version information
ds.version.get(component)  - Display specific component version
ds.version.list()          - List available components
ds.version.check()         - Check for updates
ds.version.compare(v1, v2) - Compare two versions

Available components: family, client, server, workmaker, toaster

Examples:
  ds.version.all()
  ds.version.get('client')
  ds.version.compare('1.0.1', '1.0.2')
        `;
        console.log(help);
        return help;
      },
    };
  }
  // ログ出力API
  log({
    from = "dp.sys.unknown",
    message = "",
    level = "info",
    timestamp = null,
  }) {
    const ts = timestamp || new Date().toISOString();
    const logObj = { from, timestamp: ts, message, level };
    const display = this._detectDisplay(from, level);
    if (!this.logMemory[display]) this.logMemory[display] = [];
    this.logMemory[display].push(logObj);
    // DevTools表示用: アクティブディスプレイなら即時console出力
    if (this._activeDisplay === display) {
      this._printLogToConsole(logObj);
    }
  }

  // ログ取得
  getLogs(displayName) {
    return this.logMemory[displayName] || [];
  }

  // DevTools用: ディスプレイ切替
  log_sw(displayName) {
    if (!this.logDisplays.includes(displayName)) {
      console.warn("[ds.log.sw] Unknown display:", displayName);
      return;
    }
    this._activeDisplay = displayName;
    console.clear();
    const logs = this.getLogs(displayName);
    logs.forEach((log) => this._printLogToConsole(log));
    // ユーザー向け案内
    console.info(`[ds.log.sw] Now watching display: ${displayName}`);
  }

  // from文字列からディスプレイ名を判定
  _detectDisplay(from, level) {
    if (from.startsWith("dp.sys.")) {
      if (from.includes(".err") || level === "error") return "syserr";
      if (from.includes(".out") || level === "log" || level === "info")
        return "sysout";
      if (from.includes(".in")) return "sysin";
      return "stdout";
    }
    if (from.startsWith("dp.app.")) {
      if (from.includes(".oapp.")) {
        if (from.includes(".err")) return "oapperr";
        if (from.includes(".out")) return "oappout";
        if (from.includes(".in")) return "oappin";
      } else if (from.includes(".3rd.")) {
        if (from.includes(".err")) return "3rdapperr";
        if (from.includes(".out")) return "3rdappout";
        if (from.includes(".in")) return "3rdappin";
      } else {
        if (from.includes(".err") || level === "error") return "apperr";
        if (from.includes(".out") || level === "log" || level === "info")
          return "appout";
        if (from.includes(".in")) return "appin";
      }
      return "appout";
    }
    // fallback
    if (level === "error") return "stderr";
    if (level === "warn") return "stderr";
    return "stdout";
  }

  // ログをconsoleに出力
  _printLogToConsole(log) {
    const prefix = `[${log.timestamp.split("T")[1].slice(0, 8)}] ${log.from}`;
    if (log.level === "error") {
      console.error(prefix, log.message);
    } else if (log.level === "warn") {
      console.warn(prefix, log.message);
    } else if (log.level === "info") {
      console.info(prefix, log.message);
    } else {
      console.log(prefix, log.message);
    }
  }

  async showApp(appName) {
    // アプリが存在するか確認
    if (!appModules[appName]) {
      this.log({
        from: "dp.sys.shell",
        message: `アプリ '${appName}' は存在しません`,
        level: "error",
      });
      return;
    }

    // 同じアプリを再度表示する場合は何もしない
    if (this.currentApp === appName) {
      return;
    }

    this.log({
      from: `dp.app.${appName}.out`,
      message: `${appName}アプリを表示中`,
      level: "info",
    });
    const previousApp = this.currentApp;
    this.currentApp = appName;

    // アプリ要素を取得
    let appElement = document.getElementById(`app-${appName}`);

    // アプリ要素が存在しない場合は初期化されていないのでロードを試みる
    if (!appElement) {
      this.log({
        from: "dp.sys.shell",
        message: `アプリ '${appName}' が初期化されていないため、ロードを試みます`,
        level: "warn",
      });
      await this.loadApp(appName);
      appElement = document.getElementById(`app-${appName}`);

      // それでも要素がなければエラー
      if (!appElement) {
        this.log({
          from: "dp.sys.shell",
          message: `アプリ '${appName}' の要素を作成できませんでした`,
          level: "error",
        });
        return;
      }
    }

    // 前のアクティブなアプリを非アクティブにする
    if (previousApp) {
      const prevAppElement = document.getElementById(`app-${previousApp}`);
      if (prevAppElement) {
        prevAppElement.classList.remove("active");
        prevAppElement.classList.add("layer_other");
        prevAppElement.style.display = "none";
        prevAppElement.style.visibility = "hidden";
        prevAppElement.style.opacity = "0";
        prevAppElement.style.pointerEvents = "none";
      }
    }

    // 現在のアプリをアクティブにする
    appElement.classList.remove("layer_other");
    appElement.classList.add("active");
    appElement.style.display = "block";
    appElement.style.visibility = "visible";
    appElement.style.opacity = "1";
    appElement.style.pointerEvents = "auto";

    // アプリが画面の最前面に表示されるようにする
    appElement.style.zIndex = "1000";

    // ウィンドウを最前面にスクロール
    appElement.scrollIntoView({ behavior: "smooth", block: "nearest" });

    // アプリの初期化関数を呼び出す
    if (
      appModules[appName] &&
      typeof appModules[appName].onShow === "function"
    ) {
      try {
        await appModules[appName].onShow();
      } catch (error) {
        this.log({
          from: `dp.app.${appName}.err`,
          message: `アプリ表示中にエラーが発生しました: ${error}`,
          level: "error",
        });
      }
    }

    this.log({
      from: `dp.app.${appName}.out`,
      message: `現在のアプリ: ${appName} を表示しました`,
      level: "info",
    });
  }

  // menu.df.base.js の機能を統合
  showAppCard(card) {
    const appCards = document.querySelectorAll('.window[id^="app-"]');
    let isAnimating = false;

    if (isAnimating) return;
    isAnimating = true;

    // Add active class
    if (card && card.classList) {
      card.classList.add("active");

      // Show back button if exists
      const closeBtn = card.querySelector(".close-btn-color");
      if (closeBtn && closeBtn.classList) {
        closeBtn.classList.remove("hidden");
      }

      // Update other cards with layer effects
      this.updateCardLayers(card, appCards);

      // Prevent body scroll
      document.body.style.overflow = "hidden";

      // Re-enable interaction after animation
      setTimeout(() => {
        isAnimating = false;
      }, 500);
    }
  }

  updateCardLayers(activeCard, allCards = null) {
    const appCards =
      allCards || document.querySelectorAll('.window[id^="app-"]');
    const activeIndex = Array.from(appCards).indexOf(activeCard);

    appCards.forEach((card, index) => {
      if (card === activeCard) return;

      if (index < activeIndex) {
        // Cards above the active one
        card.classList.add("layer_other");
        card.classList.remove("layer_below");
      } else {
        // Cards below the active one
        card.classList.add("layer_below");
        card.classList.remove("layer_other");
      }
    });
  }

  async loadApp(appName) {
    return new Promise((resolve) => {
      try {
        // アプリが存在するか確認
        if (!appModules[appName]) {
          this.log({
            from: "dp.sys.shell",
            message: `アプリ '${appName}' は存在しません`,
            level: "error",
          });
          resolve(false);
          return;
        }

        let appRoot = document.getElementById("app-root");
        if (!appRoot) {
          appRoot = document.createElement("div");
          appRoot.id = "app-root";
          document.body.appendChild(appRoot);
          this.log({
            from: "dp.sys.shell",
            message: "#app-root がなかったので自動生成しました",
            level: "warn",
          });
        }

        // app-rootがhiddenやdisplay:noneになっていたら強制的に表示
        appRoot.style.display = "";
        appRoot.hidden = false;

        // アプリ要素を取得または作成
        let appElement = document.getElementById(`app-${appName}`);
        if (!appElement) {
          appElement = document.createElement("div");
          appElement.id = `app-${appName}`;
          appElement.className = "window";
          appElement.style.display = "none"; // 初期状態では非表示
          appElement.classList.add("layer_other"); // デフォルトでlayer_otherを追加
          appRoot.appendChild(appElement);
          this.log({
            from: `dp.app.${appName}.out`,
            message: `アプリ要素を作成しました`,
            level: "debug",
          });
        }

        // アプリが既に初期化済みかチェック
        if (this.initializedApps.has(appName)) {
          this.log({
            from: `dp.app.${appName}.out`,
            message: `アプリは既に初期化済みです`,
            level: "debug",
          });
          resolve(true);
          return;
        }

        // アプリを初期化
        const appModule = appModules[appName];
        if (appModule && typeof appModule.appInit === "function") {
          try {
            // アプリの初期化を実行
            const initResult = appModule.appInit(this);

            // 初期化がPromiseを返すかどうかで処理を分岐
            if (initResult && typeof initResult.then === "function") {
              initResult
                .then(() => {
                  this.initializedApps.add(appName);
                  this.log({
                    from: `dp.app.${appName}.out`,
                    message: `アプリ ${appName} を初期化しました (非同期)`,
                    level: "info",
                  });
                  resolve(true);
                })
                .catch((error) => {
                  this.log({
                    from: `dp.app.${appName}.err`,
                    message: `アプリ ${appName} の初期化中にエラーが発生しました: ${error}`,
                    level: "error",
                  });
                  resolve(false);
                });
            } else {
              // 同期処理の場合
              this.initializedApps.add(appName);
              this.log({
                from: `dp.app.${appName}.out`,
                message: `アプリ ${appName} を初期化しました (同期)`,
                level: "info",
              });
              resolve(true);
            }
          } catch (error) {
            this.log({
              from: `dp.app.${appName}.err`,
              message: `アプリ ${appName} の初期化中に例外が発生しました: ${error}`,
              level: "error",
              error: error,
            });
            resolve(false);
          }
        } else {
          this.log({
            from: `dp.app.${appName}.err`,
            message: `アプリ ${appName} の初期化関数が見つかりません`,
            level: "warn",
          });
          resolve(false);
        }
      } catch (error) {
        this.log({
          from: "dp.sys.shell",
          message: `アプリ ${appName} のロード中に予期せぬエラーが発生しました: ${error}`,
          level: "error",
          error: error,
        });
        resolve(false);
      }
    });
  }
}

if (typeof window !== "undefined") {
  window.shell = new DeepFriedShell();
}
