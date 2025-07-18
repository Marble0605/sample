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

const arithmeticStats = { correct: 0, total: 2 }; // 四則演算
const triangleStats = { correct: 0, total: 2 };   // 三角定理（正弦定理＋余弦定理）

const basicMathAnswered = [false, false, false, false]; // 四則演算1, 四則演算2, 正弦定理, 余弦定理
const basicMathTotal = 4; // 問題数（分母）

function updateScoreRate() {
  // 必要なら画面上に反映
}

// ホーム画面
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
  document.getElementById('basic-math-btn').addEventListener('click', showBasicMathUnits);
}

// 基礎数学単元選択
function showBasicMathUnits() {
  document.getElementById('main-content').innerHTML = `
    <h2 class="mb-4 text-center">基礎数学</h2>
    <p>学習したい単元を選んでください。</p>
    <div class="d-grid gap-3 mb-3" style="width:300px;">
      <button class="btn btn-success btn-lg w-100" id="unit-arithmetic">四則演算</button>
      <button class="btn btn-success btn-lg w-100" id="unit-fraction">分数</button>
      <button class="btn btn-success btn-lg w-100" id="unit-decimal">小数</button>
      <button class="btn btn-success btn-lg w-100" id="unit-percentage">百分率</button>
      <button class="btn btn-success btn-lg w-100" id="unit-sine-theorem">三角定理</button>
    </div>
    <button class="btn btn-secondary mt-3" id="back-btn">戻る</button>
  `;
  document.getElementById('back-btn').addEventListener('click', showHome);
  document.getElementById('unit-arithmetic').addEventListener('click', showArithmetic);
  document.getElementById('unit-sine-theorem')?.addEventListener('click', showSineTheorem);
}

// 四則演算1問目
function showArithmetic() {
  currentQuestion = 1;
  document.getElementById('main-content').innerHTML = `
    <h2 class="mb-4 text-center">四則演算</h2>
    <p>下の選択肢を□にドラッグ＆ドロップしてください。</p>
    <div class="mb-3 fs-4 d-flex align-items-center justify-content-center">
      7 ＋ 
      <span id="drop-zone" ondrop="drop(event)" ondragover="allowDrop(event)">□</span>
      ＝ 10
    </div>
    <div class="d-flex gap-3 justify-content-center mb-4">
      <div class="choice btn btn-outline-primary fs-4" draggable="true" ondragstart="drag(event)" id="choice-2">2</div>
      <div class="choice btn btn-outline-primary fs-4" draggable="true" ondragstart="drag(event)" id="choice-3">3</div>
      <div class="choice btn btn-outline-primary fs-4" draggable="true" ondragstart="drag(event)" id="choice-4">4</div>
    </div>
    <div class="d-flex justify-content-center gap-5 mb-3">
      <button class="btn btn-primary" id="check-btn">答え合わせ</button>
      <button class="btn btn-success" id="next-btn" style="display:none;">次へ</button>
    </div>
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
      if (!basicMathAnswered[0]) {
        arithmeticStats.correct++;
        subjectStats["基礎数学"].correct++;
        basicMathAnswered[0] = true;
      }
    }
    subjectStats["基礎数学"].total = basicMathTotal; // 分母は固定
    if (!document.getElementById('explanation')) {
      const explanation = document.createElement('div');
      explanation.id = 'explanation';
      explanation.className = 'mt-3 alert alert-info';
      explanation.innerHTML = '【解説】<br>7 + 3 = 10 です。<br>7に3を足すと10になるので、正解は3です。';
      resultDiv.parentNode.insertBefore(explanation, resultDiv.nextSibling);
    }
    checkBtn.disabled = true;
    nextBtn.style.display = "inline-block";
  });

  document.getElementById('next-btn').addEventListener('click', showArithmetic2);
  document.getElementById('back-to-units').addEventListener('click', showBasicMathUnits);

  document.querySelectorAll('.choice').forEach(btn => {
    btn.addEventListener('click', function() {
      const dropZone = document.getElementById('drop-zone');
      dropZone.textContent = btn.textContent;
      dropZone.dataset.value = btn.id;
    });
  });
}

// 四則演算2問目
function showArithmetic2() {
  currentQuestion = 2;
  document.getElementById('main-content').innerHTML = `
    <h2 class="mb-4 text-center">四則演算（2問目）</h2>
    <p>下の選択肢を□にドラッグ＆ドロップしてください。</p>
    <div class="mb-3 fs-4 d-flex align-items-center justify-content-center">
      5 − 
      <span id="drop-zone" ondrop="drop(event)" ondragover="allowDrop(event)">□</span>
      ＝ 2
    </div>
    <div class="d-flex gap-3 justify-content-center mb-4">
      <div class="choice btn btn-outline-primary fs-4" draggable="true" ondragstart="drag(event)" id="choice-1">1</div>
      <div class="choice btn btn-outline-primary fs-4" draggable="true" ondragstart="drag(event)" id="choice-2">2</div>
      <div class="choice btn btn-outline-primary fs-4" draggable="true" ondragstart="drag(event)" id="choice-3">3</div>
    </div>
    <div class="d-flex justify-content-center gap-5 mb-3">
      <button class="btn btn-primary" id="check-btn">答え合わせ</button>
      <button class="btn btn-success" id="next-btn" style="display:none;">結果を見る</button>
    </div>
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
      if (!basicMathAnswered[1]) {
        arithmeticStats.correct++;
        subjectStats["基礎数学"].correct++;
        basicMathAnswered[1] = true;
      }
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
  });

  document.getElementById('next-btn').addEventListener('click', function() {
    showResult("四則演算");
  });
  document.getElementById('back-to-units').addEventListener('click', showBasicMathUnits);

  document.querySelectorAll('.choice').forEach(btn => {
    btn.addEventListener('click', function() {
      const dropZone = document.getElementById('drop-zone');
      dropZone.textContent = btn.textContent;
      dropZone.dataset.value = btn.id;
    });
  });
}

// 正弦定理
function showSineTheorem() {
  currentQuestion = 1;
  document.getElementById('main-content').innerHTML = `
    <h2 class="mb-4 text-center">正弦定理</h2>
    <p>下の選択肢を□にドラッグ＆ドロップしてください。</p>
    <div class="mb-3 fs-4 text-center">
      <span style="font-size:1.5rem;">三角形ABCにおいて</span><br>
      <span style="font-size:2rem;">
        <span style="color:#1976d2;">a</span> / sinA ＝ 
        <span id="drop-zone" ondrop="drop(event)" ondragover="allowDrop(event)">□</span>
        / sinB
      </span>
    </div>
    <div class="d-flex gap-3 justify-content-center mb-4">
      <div class="choice btn btn-outline-primary fs-4" draggable="true" ondragstart="drag(event)" id="choice-b">b</div>
      <div class="choice btn btn-outline-primary fs-4" draggable="true" ondragstart="drag(event)" id="choice-c">c</div>
      <div class="choice btn btn-outline-primary fs-4" draggable="true" ondragstart="drag(event)" id="choice-a">a</div>
    </div>
    <div class="d-flex justify-content-center gap-5 mb-3">
      <button class="btn btn-primary" id="check-btn">答え合わせ</button>
      <button class="btn btn-success" id="next-btn" style="display:none;">次へ</button>
    </div>
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
      triangleStats.correct++;
      if (!basicMathAnswered[2]) {
        subjectStats["基礎数学"].correct++;
        basicMathAnswered[2] = true;
      }
    }
    subjectStats["基礎数学"].total = basicMathTotal;
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
    showCosineTheorem2(); // ← 余弦定理の問題へ進む
  });
  document.getElementById('back-to-units').addEventListener('click', showBasicMathUnits);

  document.querySelectorAll('.choice').forEach(btn => {
    btn.addEventListener('click', function() {
      const dropZone = document.getElementById('drop-zone');
      dropZone.textContent = btn.textContent;
      dropZone.dataset.value = btn.id;
    });
  });
}

// 余弦定理
function showCosineTheorem2() {
  currentQuestion = 2;
  document.getElementById('main-content').innerHTML = `
    <h2 class="mb-4 text-center">余弦定理</h2>
    <p>下の選択肢を□にドラッグ＆ドロップしてください。</p>
    <div class="mb-3 fs-4 text-center">
      <span style="font-size:1.5rem;">三角形ABCにおいて</span><br>
      <span style="font-size:2rem;">
        <span style="color:#1976d2;">c<sup>2</sup></span> ＝ a<sup>2</sup> ＋ b<sup>2</sup> − 2ab × 
        <span id="drop-zone" ondrop="drop(event)" ondragover="allowDrop(event)">□</span>
      </span>
    </div>
    <div class="d-flex gap-3 justify-content-center mb-4">
      <div class="choice btn btn-outline-primary fs-4" draggable="true" ondragstart="drag(event)" id="choice-sinA">sinA</div>
      <div class="choice btn btn-outline-primary fs-4" draggable="true" ondragstart="drag(event)" id="choice-cosC">cosC</div>
      <div class="choice btn btn-outline-primary fs-4" draggable="true" ondragstart="drag(event)" id="choice-cosA">cosA</div>
    </div>
    <div class="d-flex justify-content-center gap-5 mb-3">
      <button class="btn btn-primary" id="check-btn">答え合わせ</button>
      <button class="btn btn-success ms-3" id="next-btn" style="display:none;">結果を見る</button>
    </div>
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
      triangleStats.correct++;
      if (!basicMathAnswered[3]) {
        subjectStats["基礎数学"].correct++;
        basicMathAnswered[3] = true;
      }
    }
    subjectStats["基礎数学"].total = basicMathTotal;
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

  document.getElementById('next-btn').addEventListener('click', function() {
    showTriangleQ3(); // ← ここで結果発表
  });
  document.getElementById('back-to-units').addEventListener('click', showBasicMathUnits);

  document.querySelectorAll('.choice').forEach(btn => {
    btn.addEventListener('click', function() {
      const dropZone = document.getElementById('drop-zone');
      dropZone.textContent = btn.textContent;
      dropZone.dataset.value = btn.id;
    });
  });
}

// 三角定理3問目
function showTriangleQ3() {
  document.getElementById('main-content').innerHTML = `
    <h2 class="mb-4 text-center">三角定理（3問目）</h2>
    <p>下の選択肢を□にドラッグ＆ドロップしてください。</p>
    <div class="mb-3 fs-4 text-center">
      <span style="font-size:1.5rem;">三角形ABCにおいて</span><br>
      <span style="font-size:2rem;">
        <span style="color:#1976d2;">b<sup>2</sup></span> ＝ a<sup>2</sup> ＋ c<sup>2</sup> − 2ac × 
        <span id="drop-zone" ondrop="drop(event)" ondragover="allowDrop(event)">□</span>
      </span>
    </div>
    <div class="d-flex gap-3 justify-content-center mb-4">
      <div class="choice btn btn-outline-primary fs-4" draggable="true" ondragstart="drag(event)" id="choice-cosB">cosB</div>
      <div class="choice btn btn-outline-primary fs-4" draggable="true" ondragstart="drag(event)" id="choice-sinB">sinB</div>
      <div class="choice btn btn-outline-primary fs-4" draggable="true" ondragstart="drag(event)" id="choice-cosA">cosA</div>
    </div>
    <div class="d-flex justify-content-center gap-5 mb-3">
      <button class="btn btn-primary" id="check-btn">答え合わせ</button>
      <button class="btn btn-success ms-3" id="next-btn" style="display:none;">次へ</button>
    </div>
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
    if(dropZone.textContent === "cosB") {
      resultDiv.textContent = "正解です！";
      resultDiv.style.color = "green";
      triangleStats.correct++;
      if (!basicMathAnswered[4]) {
        subjectStats["基礎数学"].correct++;
        basicMathAnswered[4] = true;
      }
    } else {
      resultDiv.textContent = "不正解です。もう一度考えてみましょう。";
      resultDiv.style.color = "red";
    }
    subjectStats["基礎数学"].total = basicMathTotal;
    if (!document.getElementById('explanation')) {
      const explanation = document.createElement('div');
      explanation.id = 'explanation';
      explanation.className = 'mt-3 alert alert-info';
      explanation.innerHTML = '【解説】<br>余弦定理は <b>b² = a² + c² − 2ac cosB</b> です。<br>したがって、□には <b>cosB</b> が入ります。';
      resultDiv.parentNode.insertBefore(explanation, resultDiv.nextSibling);
    }
    checkBtn.disabled = true;
    nextBtn.style.display = "inline-block";
  });

  document.getElementById('next-btn').addEventListener('click', showTriangleQ4);
  document.getElementById('back-to-units').addEventListener('click', showBasicMathUnits);

  document.querySelectorAll('.choice').forEach(btn => {
    btn.addEventListener('click', function() {
      const dropZone = document.getElementById('drop-zone');
      dropZone.textContent = btn.textContent;
      dropZone.dataset.value = btn.id;
    });
  });
}

// 三角定理4問目
function showTriangleQ4() {
  document.getElementById('main-content').innerHTML = `
    <h2 class="mb-4 text-center">三角定理（4問目）</h2>
    <p>下の選択肢を□にドラッグ＆ドロップしてください。</p>
    <div class="mb-3 fs-4 text-center">
      <span style="font-size:1.5rem;">三角形ABCにおいて</span><br>
      <span style="font-size:2rem;">
        <span style="color:#1976d2;">a / sinA</span> ＝ 
        <span id="drop-zone" ondrop="drop(event)" ondragover="allowDrop(event)">□</span>
        / sinC
      </span>
    </div>
    <div class="d-flex gap-3 justify-content-center mb-4">
      <div class="choice btn btn-outline-primary fs-4" draggable="true" ondragstart="drag(event)" id="choice-c">c</div>
      <div class="choice btn btn-outline-primary fs-4" draggable="true" ondragstart="drag(event)" id="choice-b">b</div>
      <div class="choice btn btn-outline-primary fs-4" draggable="true" ondragstart="drag(event)" id="choice-a">a</div>
    </div>
    <div class="d-flex justify-content-center gap-5 mb-3">
      <button class="btn btn-primary" id="check-btn">答え合わせ</button>
      <button class="btn btn-success ms-3" id="next-btn" style="display:none;">次へ</button>
    </div>
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
    if(dropZone.textContent === "c") {
      resultDiv.textContent = "正解です！";
      resultDiv.style.color = "green";
      triangleStats.correct++;
      if (!basicMathAnswered[5]) {
        subjectStats["基礎数学"].correct++;
        basicMathAnswered[5] = true;
      }
    } else {
      resultDiv.textContent = "不正解です。もう一度考えてみましょう。";
      resultDiv.style.color = "red";
    }
    subjectStats["基礎数学"].total = basicMathTotal;
    if (!document.getElementById('explanation')) {
      const explanation = document.createElement('div');
      explanation.id = 'explanation';
      explanation.className = 'mt-3 alert alert-info';
      explanation.innerHTML = '【解説】<br>正弦定理は <b>a/sinA = b/sinB = c/sinC</b> です。<br>よって、a/sinA = <b>c</b>/sinC となります。';
      resultDiv.parentNode.insertBefore(explanation, resultDiv.nextSibling);
    }
    checkBtn.disabled = true;
    nextBtn.style.display = "inline-block";
  });

  document.getElementById('next-btn').addEventListener('click', showTriangleQ5);
  document.getElementById('back-to-units').addEventListener('click', showBasicMathUnits);

  document.querySelectorAll('.choice').forEach(btn => {
    btn.addEventListener('click', function() {
      const dropZone = document.getElementById('drop-zone');
      dropZone.textContent = btn.textContent;
      dropZone.dataset.value = btn.id;
    });
  });
}

// 三角定理5問目
function showTriangleQ5() {
  document.getElementById('main-content').innerHTML = `
    <h2 class="mb-4 text-center">三角定理（5問目）</h2>
    <p>下の選択肢を□にドラッグ＆ドロップしてください。</p>
    <div class="mb-3 fs-4 text-center">
      <span style="font-size:1.5rem;">三角形ABCにおいて</span><br>
      <span style="font-size:2rem;">
        <span style="color:#1976d2;">c / sinC</span> ＝ 
        <span id="drop-zone" ondrop="drop(event)" ondragover="allowDrop(event)">□</span>
        / sinA
      </span>
    </div>
    <div class="d-flex gap-3 justify-content-center mb-4">
      <div class="choice btn btn-outline-primary fs-4" draggable="true" ondragstart="drag(event)" id="choice-a">a</div>
      <div class="choice btn btn-outline-primary fs-4" draggable="true" ondragstart="drag(event)" id="choice-b">b</div>
      <div class="choice btn btn-outline-primary fs-4" draggable="true" ondragstart="drag(event)" id="choice-c">c</div>
    </div>
    <div class="d-flex justify-content-center gap-5 mb-3">
      <button class="btn btn-primary" id="check-btn">答え合わせ</button>
      <button class="btn btn-success ms-3" id="next-btn" style="display:none;">結果を見る</button>
    </div>
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
    if(dropZone.textContent === "a") {
      resultDiv.textContent = "正解です！";
      resultDiv.style.color = "green";
      triangleStats.correct++;
      if (!basicMathAnswered[6]) {
        subjectStats["基礎数学"].correct++;
        basicMathAnswered[6] = true;
      }
    } else {
      resultDiv.textContent = "不正解です。もう一度考えてみましょう。";
      resultDiv.style.color = "red";
    }
    subjectStats["基礎数学"].total = basicMathTotal;
    if (!document.getElementById('explanation')) {
      const explanation = document.createElement('div');
      explanation.id = 'explanation';
      explanation.className = 'mt-3 alert alert-info';
      explanation.innerHTML = '【解説】<br>正弦定理は <b>a/sinA = b/sinB = c/sinC</b> です。<br>よって、c/sinC = <b>a</b>/sinA となります。';
      resultDiv.parentNode.insertBefore(explanation, resultDiv.nextSibling);
    }
    checkBtn.disabled = true;
    nextBtn.style.display = "inline-block";
  });

  document.getElementById('next-btn').addEventListener('click', function() {
    showResult("三角定理");
  });
  document.getElementById('back-to-units').addEventListener('click', showBasicMathUnits);

  document.querySelectorAll('.choice').forEach(btn => {
    btn.addEventListener('click', function() {
      const dropZone = document.getElementById('drop-zone');
      dropZone.textContent = btn.textContent;
      dropZone.dataset.value = btn.id;
    });
  });
}

// 結果発表
function showResult(category) {
  let stats;
  if (category === "四則演算") stats = arithmeticStats;
  else if (category === "三角定理") stats = triangleStats;
  document.getElementById('main-content').innerHTML = `
    <h2 class="mb-4 text-center">結果発表</h2>
    <div class="alert alert-success fs-1 text-center py-5 border border-3 border-primary" style="font-weight:bold;">
      ${category}の得点は<br>
      <span style="color:#1976d2; font-size:4rem;">${stats.correct} / ${stats.total}</span><br>点です！
    </div>
    <button class="btn btn-primary btn-lg" id="retry-btn">もう一度挑戦する</button>
    <button class="btn btn-secondary btn-lg ms-3" id="back-to-units">単元選択に戻る</button>
  `;
  document.getElementById('retry-btn').addEventListener('click', function() {
    if (category === "四則演算") {
      arithmeticStats.correct = 0; // 四則演算だけリセット
      showArithmetic();
    } else {
      triangleStats.correct = 0; // 三角定理だけリセット
      showSineTheorem();
    }
  });
  document.getElementById('back-to-units').addEventListener('click', function() {
    if (category === "四則演算") {
      arithmeticStats.correct = 0; // 四則演算だけリセット
    } else {
      triangleStats.correct = 0; // 三角定理だけリセット
    }
    showBasicMathUnits();
  });
}

// 成績画面
function showScore() {
  let html = `
    <h2 class="mb-4 text-center">成績</h2>
    <div class="list-group">
  `;
  for (const subject in subjectStats) {
    const stat = subjectStats[subject];
    // 基礎数学だけ分母を固定
    const total = subject === "基礎数学" ? basicMathTotal : stat.total;
    const percent = total > 0 ? Math.round((stat.correct / total) * 100) : 0;
    html += `
      <div class="list-group-item d-flex justify-content-between align-items-center">
        <span>${subject}</span>
        <span class="badge bg-primary fs-5">${percent}%（${stat.correct} / ${total}）</span>
      </div>
    `;
  }
  html += `</div>
    <button class="btn btn-secondary mt-4" id="back-btn">戻る</button>
  `;
  document.getElementById('main-content').innerHTML = html;
  document.getElementById('back-btn').addEventListener('click', showHome);
}

// 初期化
window.addEventListener('DOMContentLoaded', showHome);

// 成績ボタン
document.getElementById('nav-score').addEventListener('click', function(e) {
  e.preventDefault();
  showScore();
});