const fs = require('fs');
const jsc = require('jsverify');
const path = require('path');
const { start } = require('repl');

eval(fs.readFileSync('code.js')+'');

const test =
    jsc.forall("array (pair nat nat)", function(edges) {
        // Initializing the set of Vectors based on the random set of Edges
        var V = [];
        for (var i = 0; i < edges.length; i++) {
            for (var j = 0; j < 2; j++) {
                if (!V.includes(edges[i][j])) V.push(edges[i][j]);
            }
        }
        var graph = [V, edges];
        var adjList = graphToAdjList(graph);
        var startNode = V[0];
        var targetNode = V[V.length-1];
        var path = depthFirstSearch(graph, startNode, targetNode);
        // Navigating the path to determine its validity:
        for (var i = 0; i < path.length-1; i++) {
            if (!adjList[path[i]].includes(path[i+1])) return false; // Test fails when the path doesnt exist
        }
        return ((path[0] == startNode && path[path.length-1] == targetNode) || path.length < 1); // Test fails when the path doesn't start and end at the correct spots.
    });
jsc.assert(test, { tests: 1000});