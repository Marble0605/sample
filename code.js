let score = 0;
let currentQuestion = 1;
const totalQuestions = 2;
let subjectStats = {
  "基礎数学": { correct: 0, total: 0 },
  "線形代数基礎": { correct: 0, total: 0 },
  "微分積分基礎": { correct: 0, total: 0 },
  "幾何学": { correct: 0, total: 0 },
  "線形代数応用": { correct: 0, total: 0 },
  "微分積分応用": { correct: 0, total: 0 },
  "画像解析": { correct: 0, total: 0 },
  "機械学習": { correct: 0, total: 0 }
};

function updateScoreRate() {
  // ここにスコアと正答率を更新する処理を追加
  console.log("Score:", score);
  console.log("Subject Stats:", subjectStats);
}

function showBasicMathUnits() {
  document.getElementById('main-content').innerHTML = `
    <h2 class="mb-4 text-center">基礎数学</h2>
    <p>学習したい単元を選んでください。</p>
    <div class="d-grid gap-3 mb-3" style="width:300px;">
      <button class="btn btn-success btn-lg w-100" id="unit-arithmetic">四則演算</button>
      <button class="btn btn-success btn-lg w-100" id="unit-fraction">分数</button>
      <button class="btn btn-success btn-lg w-100" id="unit-decimal">小数</button>
      <button class="btn btn-success btn-lg w-100" id="unit-percentage">百分率</button>
      <button class="btn btn-success btn-lg w-100" id="unit-sine-theorem">正弦定理</button>
    </div>
    <button class="btn btn-secondary mt-3" id="back-btn">戻る</button>
  `;
  document.getElementById('back-btn').addEventListener('click', function() {
    showHome();
  });
  document.getElementById('unit-arithmetic').addEventListener('click', function() {
    showArithmetic();
  });
  document.getElementById('unit-sine-theorem')?.addEventListener('click', function() {
    showSineTheorem();
  });
}

function showArithmetic() {
  currentQuestion = 1;
  document.getElementById('main-content').innerHTML = `
    <h2 class="mb-4 text-center">四則演算</h2>
    <p>下の選択肢を□にドラッグ＆ドロップしてください。</p>
    <div class="mb-3 fs-4 d-flex align-items-center justify-content-center">
      7 ＋ 
      <span id="drop-zone"
            style="display:inline-block;width:60px;height:40px;border:2px dashed #888;vertical-align:middle;margin:0 10px;text-align:center;line-height:40px;font-size:1.5rem;background:#f8f9fa;"
            ondrop="drop(event)" ondragover="allowDrop(event)">
        □
      </span>
      ＝ 10
    </div>
    <div class="d-flex gap-3 justify-content-center mb-4">
      <div class="choice btn btn-outline-primary fs-4" draggable="true" ondragstart="drag(event)" id="choice-2">2</div>
      <div class="choice btn btn-outline-primary fs-4" draggable="true" ondragstart="drag(event)" id="choice-3">3</div>
      <div class="choice btn btn-outline-primary fs-4" draggable="true" ondragstart="drag(event)" id="choice-4">4</div>
    </div>
    <button class="btn btn-primary" id="check-btn">答え合わせ</button>
    <button class="btn btn-success ms-3" id="next-btn" style="display:none;">次へ</button>
    <div id="result" class="mt-3 fs-5"></div>
    <button class="btn btn-secondary mt-3" id="back-to-units">単元選択に戻る</button>
  `;

  window.allowDrop = function(ev) { ev.preventDefault(); };
  window.drag = function(ev) { ev.dataTransfer.setData("text", ev.target.id); };
  window.drop = function(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const choice = document.getElementById(data);
    const dropZone = document.getElementById("drop-zone");
    dropZone.textContent = choice.textContent;
    dropZone.dataset.value = data;
  };

  document.getElementById('check-btn').addEventListener('click', function() {
    const dropZone = document.getElementById('drop-zone');
    const resultDiv = document.getElementById('result');
    const checkBtn = document.getElementById('check-btn');
    const nextBtn = document.getElementById('next-btn');
    if(dropZone.textContent === "3") {
      resultDiv.textContent = "正解です！";
      resultDiv.style.color = "green";
      score++;
      subjectStats["基礎数学"].correct++;
    } else {
      resultDiv.textContent = "不正解です。もう一度考えてみましょう。";
      resultDiv.style.color = "red";
    }
    if (!document.getElementById('explanation')) {
      const explanation = document.createElement('div');
      explanation.id = 'explanation';
      explanation.className = 'mt-3 alert alert-info';
      explanation.innerHTML = '【解説】<br>7 + 3 = 10 です。<br>7に3を足すと10になるので、正解は3です。';
      resultDiv.parentNode.insertBefore(explanation, resultDiv.nextSibling);
    }
    checkBtn.disabled = true;
    nextBtn.style.display = "inline-block";
    subjectStats["基礎数学"].total++;
    updateScoreRate();
  });

  document.getElementById('next-btn').addEventListener('click', function() {
    showArithmetic2();
  });

  document.getElementById('back-to-units').addEventListener('click', function() {
    showBasicMathUnits();
  });

  document.querySelectorAll('.choice').forEach(btn => {
    btn.addEventListener('click', function() {
      const dropZone = document.getElementById('drop-zone');
      dropZone.textContent = btn.textContent;
      dropZone.dataset.value = btn.id;
    });
  });
}

function showArithmetic2() {
  currentQuestion = 2;
  document.getElementById('main-content').innerHTML = `
    <h2 class="mb-4 text-center">四則演算（2問目）</h2>
    <p>下の選択肢を□にドラッグ＆ドロップしてください。</p>
    <div class="mb-3 fs-4 d-flex align-items-center justify-content-center">
      5 − 
      <span id="drop-zone"
            style="display:inline-block;width:60px;height:40px;border:2px dashed #888;vertical-align:middle;margin:0 10px;text-align:center;line-height:40px;font-size:1.5rem;background:#f8f9fa;"
            ondrop="drop(event)" ondragover="allowDrop(event)">
        □
      </span>
      ＝ 2
    </div>
    <div class="d-flex gap-3 justify-content-center mb-4">
      <div class="choice btn btn-outline-primary fs-4" draggable="true" ondragstart="drag(event)" id="choice-1">1</div>
      <div class="choice btn btn-outline-primary fs-4" draggable="true" ondragstart="drag(event)" id="choice-2">2</div>
      <div class="choice btn btn-outline-primary fs-4" draggable="true" ondragstart="drag(event)" id="choice-3">3</div>
    </div>
    <button class="btn btn-primary" id="check-btn">答え合わせ</button>
    <button class="btn btn-success ms-3" id="next-btn" style="display:none;">結果を見る</button>
    <div id="result" class="mt-3 fs-5"></div>
    <button class="btn btn-secondary mt-3" id="back-to-units">単元選択に戻る</button>
  `;

  window.allowDrop = function(ev) { ev.preventDefault(); };
  window.drag = function(ev) { ev.dataTransfer.setData("text", ev.target.id); };
  window.drop = function(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const choice = document.getElementById(data);
    const dropZone = document.getElementById("drop-zone");
    dropZone.textContent = choice.textContent;
    dropZone.dataset.value = data;
  };

  document.getElementById('check-btn').addEventListener('click', function() {
    const dropZone = document.getElementById('drop-zone');
    const resultDiv = document.getElementById('result');
    const checkBtn = document.getElementById('check-btn');
    const nextBtn = document.getElementById('next-btn');
    if(dropZone.textContent === "3") {
      resultDiv.textContent = "正解です！";
      resultDiv.style.color = "green";
      score++;
      subjectStats["基礎数学"].correct++;
    } else {
      resultDiv.textContent = "不正解です。もう一度考えてみましょう。";
      resultDiv.style.color = "red";
    }
    if (!document.getElementById('explanation')) {
      const explanation = document.createElement('div');
      explanation.id = 'explanation';
      explanation.className = 'mt-3 alert alert-info';
      explanation.innerHTML = '【解説】<br>5 - 3 = 2 です。<br>5から3を引くと2になるので、正解は3です。';
      resultDiv.parentNode.insertBefore(explanation, resultDiv.nextSibling);
    }
    checkBtn.disabled = true;
    nextBtn.style.display = "inline-block";
    subjectStats["基礎数学"].total++;
    updateScoreRate();
  });

  document.getElementById('next-btn').addEventListener('click', function() {
    showResult();
  });

  document.getElementById('back-to-units').addEventListener('click', function() {
    showBasicMathUnits();
  });

  document.querySelectorAll('.choice').forEach(btn => {
    btn.addEventListener('click', function() {
      const dropZone = document.getElementById('drop-zone');
      dropZone.textContent = btn.textContent;
      dropZone.dataset.value = btn.id;
    });
  });
}

function showSineTheorem() {
  currentQuestion = 1;
  document.getElementById('main-content').innerHTML = `
    <h2 class="mb-4 text-center">正弦定理</h2>
    <p>下の選択肢を□にドラッグ＆ドロップしてください。</p>
    <div class="mb-3 fs-4 text-center">
      <span style="font-size:1.5rem;">三角形ABCにおいて</span><br>
      <span style="font-size:2rem;">
        <span style="color:#1976d2;">a</span> / sinA ＝ 
        <span id="drop-zone" 
          style="display:inline-block;width:60px;height:40px;border:2px dashed #888;vertical-align:middle;margin:0 10px;text-align:center;line-height:40px;font-size:1.5rem;background:#f8f9fa;"
          ondrop="drop(event)" ondragover="allowDrop(event)">
          □
        </span>
        / sinB
      </span>
    </div>
    <div class="d-flex gap-3 justify-content-center mb-4">
      <div class="choice btn btn-outline-primary fs-4" draggable="true" ondragstart="drag(event)" id="choice-b">b</div>
      <div class="choice btn btn-outline-primary fs-4" draggable="true" ondragstart="drag(event)" id="choice-c">c</div>
      <div class="choice btn btn-outline-primary fs-4" draggable="true" ondragstart="drag(event)" id="choice-a">a</div>
    </div>
    <button class="btn btn-primary" id="check-btn">答え合わせ</button>
    <button class="btn btn-success ms-3" id="next-btn" style="display:none;">次へ</button>
    <div id="result" class="mt-3 fs-5"></div>
    <button class="btn btn-secondary mt-3" id="back-to-units">単元選択に戻る</button>
  `;

  window.allowDrop = function(ev) { ev.preventDefault(); };
  window.drag = function(ev) { ev.dataTransfer.setData("text", ev.target.id); };
  window.drop = function(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const choice = document.getElementById(data);
    const dropZone = document.getElementById("drop-zone");
    dropZone.textContent = choice.textContent;
    dropZone.dataset.value = data;
  };

  document.getElementById('check-btn').addEventListener('click', function() {
    const dropZone = document.getElementById('drop-zone');
    const resultDiv = document.getElementById('result');
    const checkBtn = document.getElementById('check-btn');
    const nextBtn = document.getElementById('next-btn');
    if(dropZone.textContent === "b") {
      resultDiv.textContent = "正解です！";
      resultDiv.style.color = "green";
      score++;
      subjectStats["基礎数学"].correct++;
    } else {
      resultDiv.textContent = "不正解です。もう一度考えてみましょう。";
      resultDiv.style.color = "red";
    }
    subjectStats["基礎数学"].total++; // どちらでも必ず加算
    updateScoreRate();
    if (!document.getElementById('explanation')) {
      const explanation = document.createElement('div');
      explanation.id = 'explanation';
      explanation.className = 'mt-3 alert alert-info';
      explanation.innerHTML = '【解説】<br>正弦定理は <b>a/sinA = b/sinB = c/sinC</b> です。<br>よって、a/sinA = <b>b</b>/sinB となります。';
      resultDiv.parentNode.insertBefore(explanation, resultDiv.nextSibling);
    }
    checkBtn.disabled = true;
    nextBtn.style.display = "inline-block";
  });

  document.getElementById('next-btn').addEventListener('click', function() {
    showCosineTheorem2();
  });

  document.getElementById('back-to-units').addEventListener('click', function() {
    showBasicMathUnits();
  });

  document.querySelectorAll('.choice').forEach(btn => {
    btn.addEventListener('click', function() {
      const dropZone = document.getElementById('drop-zone');
      dropZone.textContent = btn.textContent;
      dropZone.dataset.value = btn.id;
    });
  });
}

function showCosineTheorem2() {
  currentQuestion = 2;
  document.getElementById('main-content').innerHTML = `
    <h2 class="mb-4 text-center">余弦定理</h2>
    <p>下の選択肢を□にドラッグ＆ドロップしてください。</p>
    <div class="mb-3 fs-4 text-center">
      <span style="font-size:1.5rem;">三角形ABCにおいて</span><br>
      <span style="font-size:2rem;">
        <span style="color:#1976d2;">c<sup>2</sup></span> ＝ a<sup>2</sup> ＋ b<sup>2</sup> − 2ab × 
        <span id="drop-zone"
          style="display:inline-block;width:60px;height:40px;border:2px dashed #888;vertical-align:middle;margin:0 10px;text-align:center;line-height:40px;font-size:1.5rem;background:#f8f9fa;"
          ondrop="drop(event)" ondragover="allowDrop(event)">
          □
        </span>
      </span>
    </div>
    <div class="d-flex gap-3 justify-content-center mb-4">
      <div class="choice btn btn-outline-primary fs-4" draggable="true" ondragstart="drag(event)" id="choice-sinA">sinA</div>
      <div class="choice btn btn-outline-primary fs-4" draggable="true" ondragstart="drag(event)" id="choice-cosC">cosC</div>
      <div class="choice btn btn-outline-primary fs-4" draggable="true" ondragstart="drag(event)" id="choice-cosA">cosA</div>
    </div>
    <button class="btn btn-primary" id="check-btn">答え合わせ</button>
    <button class="btn btn-success ms-3" id="next-btn" style="display:none;">結果を見る</button>
    <div id="result" class="mt-3 fs-5"></div>
    <button class="btn btn-secondary mt-3" id="back-to-units">単元選択に戻る</button>
  `;

  window.allowDrop = function(ev) { ev.preventDefault(); };
  window.drag = function(ev) { ev.dataTransfer.setData("text", ev.target.id); };
  window.drop = function(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const choice = document.getElementById(data);
    const dropZone = document.getElementById("drop-zone");
    dropZone.textContent = choice.textContent;
    dropZone.dataset.value = data;
  };

  document.getElementById('check-btn').addEventListener('click', function() {
    const dropZone = document.getElementById('drop-zone');
    const resultDiv = document.getElementById('result');
    const checkBtn = document.getElementById('check-btn');
    const nextBtn = document.getElementById('next-btn');
    if(dropZone.textContent === "cosC") {
      resultDiv.textContent = "正解です！";
      resultDiv.style.color = "green";
      score++;
      subjectStats["基礎数学"].correct++;
    } else {
      resultDiv.textContent = "不正解です。もう一度考えてみましょう。";
      resultDiv.style.color = "red";
    }
    subjectStats["基礎数学"].total++; // どちらでも必ず加算
    updateScoreRate();
    if (!document.getElementById('explanation')) {
      const explanation = document.createElement('div');
      explanation.id = 'explanation';
      explanation.className = 'mt-3 alert alert-info';
      explanation.innerHTML = '【解説】<br>余弦定理は <b>c² = a² + b² − 2ab cosC</b> です。<br>したがって、□には <b>cosC</b> が入ります。';
      resultDiv.parentNode.insertBefore(explanation, resultDiv.nextSibling);
    }
    checkBtn.disabled = true;
    nextBtn.style.display = "inline-block";
  });

  // ★「結果を見る」ボタンで結果発表画面へ
  document.getElementById('next-btn').addEventListener('click', function() {
    showResult();
  });

  document.getElementById('back-to-units').addEventListener('click', function() {
    showBasicMathUnits();
  });

  document.querySelectorAll('.choice').forEach(btn => {
    btn.addEventListener('click', function() {
      const dropZone = document.getElementById('drop-zone');
      dropZone.textContent = btn.textContent;
      dropZone.dataset.value = btn.id;
    });
  });
}

function showResult() {
  document.getElementById('main-content').innerHTML = `
    <h2 class="mb-4 text-center">結果発表</h2>
    <div class="alert alert-success fs-1 text-center py-5 border border-3 border-primary" style="font-weight:bold;">
      あなたの得点は<br>
      <span style="color:#1976d2; font-size:4rem;">${score} / ${totalQuestions}</span><br>点です！
    </div>
    <button class="btn btn-primary btn-lg" id="retry-btn">もう一度挑戦する</button>
    <button class="btn btn-secondary btn-lg ms-3" id="back-to-units">単元選択に戻る</button>
  `;
  document.getElementById('retry-btn').addEventListener('click', function() {
    score = 0;
    showArithmetic();
  });
  document.getElementById('back-to-units').addEventListener('click', function() {
    score = 0;
    showBasicMathUnits();
  });
}

function showScore() {
  let html = `
    <h2 class="mb-4 text-center">成績</h2>
    <div class="list-group">
  `;
  for (const subject in subjectStats) {
    const stat = subjectStats[subject];
    const percent = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
    html += `
      <div class="list-group-item d-flex justify-content-between align-items-center">
        <span>${subject}</span>
        <span class="badge bg-primary fs-5">${percent}%（${stat.correct} / ${stat.total}）</span>
      </div>
    `;
  }
  html += `</div>
    <button class="btn btn-secondary mt-4" id="back-btn">戻る</button>
  `;
  document.getElementById('main-content').innerHTML = html;
  document.getElementById('back-btn').addEventListener('click', function() {
    showHome();
  });
}

function showHome() {
  document.getElementById('main-content').innerHTML = `
    <h2 class="mb-4 text-center">教科を選択してください</h2>
    <div class="row w-100 justify-content-center">
      <div class="col-md-5 mb-4">
        <h3 class="text-center">1年生用</h3>
        <div class="scroll-box d-grid gap-3">
          <button id="basic-math-btn" class="btn btn-primary btn-lg w-100 fs-2">基礎数学</button>
          <button class="btn btn-primary btn-lg w-100 fs-2">線形代数基礎</button>
          <button class="btn btn-primary btn-lg w-100 fs-2">微分積分基礎</button>
        </div>
      </div>
      <div class="col-md-5 mb-4">
        <h3 class="text-center">2年生用</h3>
        <div class="scroll-box d-grid gap-3">
          <button class="btn btn-primary btn-lg w-100 fs-2">幾何学</button>
          <button class="btn btn-primary btn-lg w-100 fs-2">線形代数応用</button>
          <button class="btn btn-primary btn-lg w-100 fs-2">微分積分応用</button>
          <button class="btn btn-primary btn-lg w-100 fs-2">画像解析</button>
          <button class="btn btn-primary btn-lg w-100 fs-2">機械学習</button>
        </div>
      </div>
    </div>
  `;
  document.getElementById('basic-math-btn').addEventListener('click', function() {
    showBasicMathUnits();
  });
}

window.addEventListener('DOMContentLoaded', function() {
  showHome();
});

document.getElementById('nav-score').addEventListener('click', function(e) {
  e.preventDefault();
  showScore();
});