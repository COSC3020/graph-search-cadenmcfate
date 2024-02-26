function depthFirstSearch(graph, startNode, targetNode) {
    if (graph[0].length < 1) return [];
    let adjList = graphToAdjList(graph);
    let path = [];
    let visited = [];
    for (let i = 0; i < adjList.length; i++) visited[i] = false;
    if (dfs(adjList, startNode, targetNode, path, visited)) return path;
    return [];
}

function dfs(adjList, currentNode, targetNode, path, visited) {
    visited[currentNode] = true;
    path.push(currentNode);
    if (currentNode == targetNode) return 1;
    for (let v = 0; v < adjList[currentNode].length; v++) {
        let nextNode = adjList[currentNode][v];
        if (!visited[nextNode]) {
            if (dfs(adjList, nextNode, targetNode, path, visited)) return 1;
        }
    }
    path.pop();
}

function graphToAdjList(graph) { //Complexity: |V|+|E|
    let V = graph[0];
    let E = graph[1];
    let adjList = [];
    let max = 0;
    for (let i = 0; i < E.length; i++) {
        max = Math.max(max, E[i][0], E[i][1]);
    }
    for (let i = 0; i <= max; i++) adjList[i] = [];
    for (let e = 0; e < E.length; e++) {
        adjList[E[e][0]].push(E[e][1]);
    }
    return adjList;
}