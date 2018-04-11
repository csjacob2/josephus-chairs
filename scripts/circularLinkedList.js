// circular linked list
class circularLinkedList {
    constructor() {
        this.size = 0;
        this.head = null;
        this.tail = null;
    }

    add(value) {
        var node = {
            'data': value,
            'next': null,
            'previous': null
        };

        if (this.size == 0) {
            // first node, point head to it
            this.head = node;
            this.tail = node;
        } else {
            // link to last node in the chain
            node.next = this.head;
            this.tail.next = node;
            node.previous = this.tail;
            this.tail = node;

            this.head.previous = this.tail;
            this.tail.next = this.head;
        }

        this.size++;
    }

    get(value) {
        //linear search for the value, need to start at the head
        var node = this.head;
        var count = 0;

        while (node.data != value && count != this.size) {
            if (node.next == null) {
                return null
            }
            node = node.next;
            count++;
        }

        if (count >= this.size) {
            //didn't find a match
            return null;
        } else {
            return node.data;
        }
    }

    traverse(n, i) {
        //traverse the LL for a count value, return the node at that count
        // start at last node where left off
        var node = i;
        var count = 0;

        while (count != n) {
            if (node.next == null) {
                return null
            }
            node = node.next;
            count++;
        }

        return node;
    }

    deleteNode(value) {
        var node = this.head;
        var prevNode, afterNode; //node to track before deleted node
        var count = 0;

        while (this.get(node.data) != value && count != this.size) {
            if (node.next == null || this.size == 0) {
                return null;
            }
            prevNode = node;
            node = node.next;
            count++;
        }

        if (count >= this.size) {
            //didn't find a match
            return null;
        } else {
            if (node == this.head) {
                // delete first node, reset head
                this.head = node.next;
                if (this.head) {
                    // second node, link back to new head
                    this.head.previous = this.tail;
                    this.tail.next = node.next;
                } else {
                    // no second node, down to LL of size 1
                    this.tail = null;

                }
            } else if (node == this.tail) {
                // delete last node, reset tail
                this.tail = this.tail.previous;
                this.tail.next = this.head;
            } else {
                // delete middle node
                prevNode = node.previous;
                afterNode = node.next;

                prevNode.next = afterNode;
                afterNode.previous = prevNode;
            }

            this.size--;
            return value;
        }
    }
}
