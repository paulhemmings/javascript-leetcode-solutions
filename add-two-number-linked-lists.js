/*
 * https://leetcode.com/problems/add-two-numbers/
 * Add two numbers defined in descending order as linked list
 * I hate this solution, but it passed
 */


function ListNode(val) {
   this.val = val;
   this.next = null;
}

function randValue() {
  return Math.floor((Math.random() * 10) + 1);
}

var lisl1 = new ListNode(randValue()),
    lisl2 = new ListNode(randValue());


function buildOriginalList(l1, nodeCount) {
  for(var node = 0; node < nodeCount; node ++) {
      l1.next = new ListNode(randValue());
      l1 = l1.next;
  }
}

function displayList(name,l1) {
  console.log(name);
  while(l1) {
    console.log(l1.val);
    l1 = l1.next;
  }
}

function sumAndRemainder(value) {
  var unitDigit = value % 10; //is 3
  var remainder = (value - unitDigit)/10; //is 53-3=50 /10 =5
  return [unitDigit, remainder];
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  var sar = sumAndRemainder(l1.val + l2.val);
  var sum = new ListNode(sar[0]);
  sum.remainder = sar[1];
  var s1 = sum;

  while (l1 || l2) {

    l1 = (l1 == null ? null : l1.next);
    l2 = (l2 == null ? null : l2.next);

    sar = sumAndRemainder(
      ((l1==null) ? 0 : l1.val)
      +
      ((l2==null) ? 0 : l2.val)
      + s1.remainder || 0);

    if (sar[0] || sar[1] || l1 || l2) {
      s1.next = new ListNode(sar[0]);
      s1.next.remainder = sar[1];
      s1 = s1.next;
    }
  }
  // if (s1.remainder && s1.remainder>0) {
  //     s1.next = new ListNode(s1.remainder);
  // }
  return sum;
};

buildOriginalList(lisl1, 1);
buildOriginalList(lisl2, 1);
var sum = addTwoNumbers(lisl1, lisl2);
displayList('lisl1', lisl1);
displayList('lisl2', lisl2);
displayList('sum', sum);
