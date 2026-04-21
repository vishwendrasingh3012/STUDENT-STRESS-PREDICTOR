// LIVE VALUE UPDATE
function updateValue(id) {
    document.getElementById(id + "Val").innerText =
        document.getElementById(id).value;
}

// MAIN PREDICT FUNCTION
function predict() {
    let study = parseInt(document.getElementById("study").value);
    let sleep = parseInt(document.getElementById("sleep").value);
    let social = parseInt(document.getElementById("social").value);
    let screen = parseInt(document.getElementById("screen").value);
    let exam = parseInt(document.getElementById("exam").value);

    // SAME LOGIC AS C++
    let score = study*2 + screen*2 + exam*3 - sleep*2 - social;

    let result = "";
    let emoji = "";

    if (score < 10) {
        result = "Low Stress";
        emoji = "😊";
    } 
    else if (score < 20) {
        result = "Medium Stress";
        emoji = "😐";
    } 
    else {
        result = "High Stress";
        emoji = "😰";
    }

    let resultBox = document.getElementById("result");

    // SET RESULT + STYLE + ANIMATION
    resultBox.innerText = `Stress: ${result} ${emoji}`;
    resultBox.className = result.toLowerCase().split(" ")[0] + " fade";

    let box = document.getElementById("suggestionBox");

    if (result === "High Stress") {
        showBFS();
        showDFS();
        box.style.display = "block"; // show container
    } else {
        document.getElementById("bfs").innerText = "";
        document.getElementById("dfs").innerText = "";
        box.style.display = "none"; // hide container
    }
}

// BFS
function showBFS() {
    let graph = [
        [1, 2],
        [4],
        [3],
        [4],
        []
    ];

    let names = ["📘 Study", "😴 Sleep", "👥 Social", "🏃 Exercise", "🧘 Relax"];

    let queue = [0];
    let output = [];

    while (queue.length > 0) {
        let node = queue.shift();
        output.push(names[node]);

        for (let next of graph[node]) {
            queue.push(next);
        }
    }

    document.getElementById("bfs").innerText =
        "🔵 BFS Suggestion: " + output.join(" → ") + " → END";
}

// DFS 
function dfs(node, graph, names, result) {
    result.push(names[node]);

    for (let next of graph[node]) {
        dfs(next, graph, names, result);
    }
}

function showDFS() {
    let graph = [
        [1, 2],
        [4],
        [3],
        [4],
        []
    ];

    let names = ["📘 Study", "😴 Sleep", "👥 Social", "🏃 Exercise", "🧘 Relax"];

    let result = [];
    dfs(0, graph, names, result);

    document.getElementById("dfs").innerText =
        "🟣 DFS Suggestion: " + result.join(" → ") + " → END";
}