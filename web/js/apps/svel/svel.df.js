export const appMeta = {
    name: "svel",
    title: "Svel",
    icon: "re/ico/home_32x.png"
  };
  
  
  
  export function appInit(shell) {
    const root = document.getElementById("app-root");
    if (!root) {
      console.error("HomeApp: #app-rootが見つかりません");
      return;
    }
    root.innerHTML = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=1.0, user-scalable=no">
    <title>Svel - 統合音楽ツール</title>
    
    <!-- iOS specific meta tags -->
    <meta name="apple-mobile-web-app-title" content="Svel">
    <meta name="format-detection" content="telephone=no">
    <meta name="apple-touch-startup-image" href="/splash.png">
    <meta name="apple-touch-fullscreen" content="yes">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="css/style.css">
    <meta name="theme-color" content="#007AFF">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff">
    <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000000">
    
    <!-- iOS Safari specific -->
    <meta name="apple-touch-fullscreen" content="yes">
</head>
<body>
    <div class="app-container">
        <!-- サイドバーナビゲーション -->
        <nav class="sidebar">
            <div class="logo">
                <i class="fas fa-music"></i>
                <span>Music Lab</span>
            </div>
            <ul class="nav-links">
                <li class="active" data-tab="practice">
                    <i class="fas fa-dumbbell"></i>
                    <span>練習プログラム</span>
                </li>
                <li data-tab="tuner">
                    <i class="fas fa-tachometer-alt"></i>
                    <span>チューナー</span>
                </li>
                <li data-tab="analyzer">
                    <i class="fas fa-chart-line"></i>
                    <span>オーディオ解析</span>
                </li>
            </ul>
        </nav>

        <!-- メインコンテンツ -->
        <main class="main-content">
            <!-- 練習プログラムタブ -->
            <section id="practice" class="tab-content active">
                <div class="content-header">
                    <h1>練習プログラム</h1>
                    <div class="header-actions">
                        <button id="newProgram" class="btn btn-primary">
                            <i class="fas fa-plus"></i> 新規
                        </button>
                        <button id="saveProgram" class="btn btn-secondary">
                            <i class="fas fa-save"></i> 保存
                        </button>
                        <button id="loadProgram" class="btn btn-secondary">
                            <i class="fas fa-folder-open"></i> 開く
                        </button>
                    </div>
                </div>

                <div class="program-editor">
                    <div class="program-settings card">
                        <h2>プログラム設定</h2>
                        <div class="form-group">
                            <label for="programName">プログラム名:</label>
                            <input type="text" id="programName" placeholder="練習プログラム名を入力">
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="bpm">BPM:</label>
                                <input type="number" id="bpm" min="30" max="300" value="120">
                            </div>
                            <div class="form-group">
                                <label for="timeSignature">拍子:</label>
                                <select id="timeSignature">
                                    <option value="4/4">4/4</option>
                                    <option value="3/4">3/4</option>
                                    <option value="6/8">6/8</option>
                                    <option value="5/4">5/4</option>
                                    <option value="7/8">7/8</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="key">キー:</label>
                                <select id="key">
                                    <option value="C">C</option>
                                    <option value="C#">C#</option>
                                    <option value="D">D</option>
                                    <option value="D#">D#</option>
                                    <option value="E">E</option>
                                    <option value="F">F</option>
                                    <option value="F#">F#</option>
                                    <option value="G">G</option>
                                    <option value="G#">G#</option>
                                    <option value="A">A</option>
                                    <option value="A#">A#</option>
                                    <option value="B">B</option>
                                </select>
                                <select id="scaleType">
                                    <option value="major">メジャー</option>
                                    <option value="minor">マイナー</option>
                                    <option value="dorian">ドリアン</option>
                                    <option value="mixolydian">ミクソリディアン</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="exercises card">
                        <div class="card-header">
                            <h2>練習項目</h2>
                            <button id="addExercise" class="btn btn-primary">
                                <i class="fas fa-plus"></i> 追加
                            </button>
                        </div>
                        <div id="exerciseList" class="exercise-list">
                            <!-- 練習項目がここに追加されます -->
                        </div>
                    </div>
                </div>

                <div class="preview card">
                    <h2>プレビュー</h2>
                    <div class="metronome">
                        <div class="metronome-display">
                            <div id="metronomeBeat" class="beat">1</div>
                            <div id="metronomeBar" class="bar">| | | |</div>
                        </div>
                        <div class="metronome-controls">
                            <button id="playPause" class="btn btn-primary">
                                <i class="fas fa-play"></i> 再生
                            </button>
                            <button id="stop" class="btn btn-secondary">
                                <i class="fas fa-stop"></i> 停止
                            </button>
                        </div>
                    </div>
                    <div class="exercise-preview">
                        <h3>現在の練習: <span id="currentExercise">-</span></h3>
                        <div id="exerciseDisplay">
                            <!-- 練習内容が表示されます -->
                        </div>
                    </div>
                </div>
            </section>

            <!-- チューナータブ -->
            <section id="tuner" class="tab-content">
                <div class="content-header">
                    <h1>チューナー</h1>
                </div>
                
                <div class="tuner-container card">
                    <div class="tuner-display">
                        <div class="note-display">
                            <span id="note">--</span>
                            <span id="octave"></span>
                        </div>
                        <div class="cents-display">
                            <div id="cents">0</div>
                            <div class="cents-label">cent</div>
                        </div>
                        <div class="tuner-needle">
                            <div class="needle"></div>
                            <div class="center-line"></div>
                        </div>
                        <div class="tuner-scale">
                            <div>-50</div>
                            <div>-25</div>
                            <div class="in-tune">0</div>
                            <div>+25</div>
                            <div>+50</div>
                        </div>
                    </div>
                    
                    <div class="tuner-controls">
                        <div class="form-group">
                            <label for="baseFreq">基準周波数 (Hz):</label>
                            <input type="number" id="baseFreq" min="300" max="500" value="442" step="0.1" class="freq-input">
                        </div>
                        <div class="form-group">
                            <label for="noteSystem">音名表記:</label>
                            <select id="noteSystem">
                                <option value="en" selected>英語 (C, C#)</option>
                                <option value="solfege">ドレミ (Do, Do#)</option>
                                <option value="de">ドイツ式 (C, Cis)</option>
                                <option value="jp">日本式 (ハ, 嬰ハ)</option>
                            </select>
                        </div>
                        <button id="startTuner" class="btn btn-primary">
                            <i class="fas fa-microphone"></i> 測定開始
                        </button>
                    </div>
                </div>
            </section>

            <!-- オーディオ解析タブ -->
            <section id="analyzer" class="tab-content">
                <div class="content-header">
                    <h1>オーディオ解析</h1>
                </div>
                
                <div class="analyzer-container">
                    <div class="audio-inputs card">
                        <h2>オーディオ入力</h2>
                        <div class="audio-input-list" id="audioInputList">
                            <div class="audio-input-item">
                                <h3>入力 1</h3>
                                <div class="input-controls">
                                    <label class="file-upload">
                                        <i class="fas fa-file-audio"></i> ファイルを選択
                                        <input type="file" accept="audio/*" class="audio-file" data-index="0" hidden>
                                    </label>
                                    <button class="btn btn-secondary record-btn" data-index="0">
                                        <i class="fas fa-microphone"></i> 録音
                                    </button>
                                    <audio controls class="audio-preview" data-index="0"></audio>
                                </div>
                            </div>
                        </div>
                        <button id="addInput" class="btn btn-secondary">
                            <i class="fas fa-plus"></i> 入力を追加
                        </button>
                    </div>

                    <div class="analyzer-visualization card">
                        <h2>解析結果</h2>
                        <div class="visualization-tabs">
                            <button class="viz-tab active" data-viz="waveform">波形</button>
                            <button class="viz-tab" data-viz="spectrum">スペクトル</button>
                            <button class="viz-tab" data-viz="harmonic">倍音</button>
                        </div>
                        <div class="visualization-container">
                            <canvas id="waveform" class="active"></canvas>
                            <canvas id="spectrum"></canvas>
                            <canvas id="harmonic"></canvas>
                        </div>
                        <div class="analysis-controls">
                            <button id="analyze" class="btn btn-primary">
                                <i class="fas fa-play"></i> 解析開始
                            </button>
                            <button id="playMix" class="btn btn-secondary">
                                <i class="fas fa-play-circle"></i> ミックス再生
                            </button>
                            <button id="stopAnalyzer" class="btn btn-secondary">
                                <i class="fas fa-stop"></i> 停止
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>

    <!-- モーダル -->
    <div id="exerciseModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h3>練習項目を追加</h3>
            <div class="form-group">
                <label for="exerciseType">種目:</label>
                <select id="exerciseType">
                    <option value="scale">スケール</option>
                    <option value="arpeggio">アルペジオ</option>
                    <option value="etude">エチュード</option>
                    <option value="song">楽曲</option>
                </select>
            </div>
            <div class="form-group">
                <label for="exerciseName">名前:</label>
                <input type="text" id="exerciseName" placeholder="練習項目の名前">
            </div>
            <div class="form-group">
                <label for="exerciseDuration">時間 (分):</label>
                <input type="number" id="exerciseDuration" min="1" max="60" value="5">
            </div>
            <div class="form-group">
                <label for="exerciseTempo">テンポ (BPM):</label>
                <input type="number" id="exerciseTempo" min="30" max="300" value="120">
            </div>
            <div class="form-group">
                <label for="exerciseNotes">メモ:</label>
                <textarea id="exerciseNotes" placeholder="練習のポイントや注意点を記入"></textarea>
            </div>
            <button id="saveExercise" class="btn btn-primary">保存</button>
        </div>
    </div>

    <script src="js/app.js" type="module"></script>
</body>
</html>`

}