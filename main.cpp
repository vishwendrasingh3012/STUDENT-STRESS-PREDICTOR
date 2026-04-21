#include <iostream>
#include <fstream>
#include <vector>
#include <queue>
#include <string>

using namespace std;

// STRESS PREDICTION 
string predictStress(int study, int sleep, int social, int screen, int exam) {
    int score = study*2 + screen*2 + exam*3 - sleep*2 - social;

    if (score < 10) return "Low Stress";
    else if (score < 20) return "Medium Stress";
    else return "High Stress";
}

//  BFS 
void suggestWithBFS() {
    vector<vector<int>> graph = {
        {1, 2}, // Study → Sleep, Social
        {4},    // Sleep → Relax
        {3},    // Social → Exercise
        {4},    // Exercise → Relax
        {}      // Relax
    };

    vector<string> names = {
        "Study", "Sleep", "Social", "Exercise", "Relax"
    };

    queue<int> q;
    q.push(0);

    cout << "\nBFS Suggestion:\n";

    while (!q.empty()) {
        int node = q.front();
        q.pop();

        cout << names[node] << " -> ";

        for (int next : graph[node]) {
            q.push(next);
        }
    }

    cout << "END\n";
}

// DFS
void dfs(int node, vector<vector<int>>& graph, vector<string>& names) {
    cout << names[node] << " -> ";

    for (int next : graph[node]) {
        dfs(next, graph, names);
    }
}

void suggestWithDFS() {
    vector<vector<int>> graph = {
        {1, 2},
        {4},
        {3},
        {4},
        {}
    };

    vector<string> names = {
        "Study", "Sleep", "Social", "Exercise", "Relax"
    };

    cout << "\nDFS Suggestion:\n";
    dfs(0, graph, names);
    cout << "END\n";
}

// MAIN FUNCTION
int main() {
    ifstream in("input.txt");
    ofstream out("output.txt");

    int study, sleep, social, screen, exam;
    in >> study >> sleep >> social >> screen >> exam;

    string result = predictStress(study, sleep, social, screen, exam);

    // Save result
    out << result;

    cout << "Stress: " << result << endl;

    // Show suggestions if high stress
    if (result == "High Stress") {
        suggestWithBFS();
        suggestWithDFS();
    }

    return 0;
}