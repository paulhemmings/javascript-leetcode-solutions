/*
 * http://www.programcreek.com/2012/12/leetcode-word-ladder/
 *
 * Given a start and end word, and a dictionary, produce the shortest
 * solution where the word can change by one letter at ta time.
 *
 * Solution notes:
 * Implemented a solution that did not use a tree, but rather built a collection
 * of solutions.
 * 
 * This usese more memory than a tree, but the solution is more readable.
 */

function Solution(wordList) {
    this.store = wordList;
    this.array = function() { return this.store.split(','); };
    this.end = function() { return this.array()[this.array().length-1]; };
    this.contains = function(word) { return this.store.indexOf(word) != -1; };
    this.add = function(word) { this.store += (this.store.length == 0 ? '' : ',') + word; return this; };
    this.length = function() { return this.array().length; };
    this.previous = function() { return this.array().splice(0, this.length()-1).join(','); }
}

function isNeighbor(lhs, rhs) {
    if (lhs === rhs) return false;
    for (var count = 0,i=0; i<lhs.length; i++) {
        if (lhs[i]!==rhs[i]) count++;
        if (count>1) return false;
    }
    return true;
}

// create the start, end and dictionary.
var start = 'hit', end = 'cog', dict = ["hot","dot","dog","lot","log"];
console.log(start, end, dict);

// add end word to dictionary
dict.push(end);

// create a starter solution with the start word
var solutions = [];
solutions.push(new Solution(start));


// loop until all possible solutions generated
// (this is when there are no words that can be added to any existing solution)
var stop = false;
while(!stop) {
    stop = true;

    // for each solution (that has not completed)
    solutions.filter(function(solution) {
        return solution.end() !== end;
    }).forEach(function(solution) {

        // find all possible next words
        var neighbors = dict.filter(function(word) {
            return !solution.contains(word) && isNeighbor(word, solution.end());
        });

        // add word to solution (if more than one, add to new solution)
        neighbors.forEach(function(neighbor) {
            if (neighbor === neighbors[0]) {
              stop = false;
              solution.add(neighbors[0]);
            } else {
              solutions.push(new Solution(solution.previous()).add(neighbor));
            }
        });
    });
}

// print out all (completed) solutions (sort by shortest)
solutions
  .filter(function(solution) {
      return solution.end() === end;
  })
  .sort(function(lhs,rhs) {
      return lhs.length() - rhs.length();
  })
  .forEach(function(solution) {
      console.log(solution.store, solution.length());
  });
