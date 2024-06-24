
/**
 * Class representing a circular queue with navigation methods next and previous.
 */
class HistoryQueue{
    constructor(size){
        this.queue = new Array(size + 2);

        this.head = 1
        this.pointer = 0
        this.tail = 0
    }

    /**
     * add a new element to the queue.
     * it will overwrite the first element if the queue is full.
     * @param {*} element 
     */
    add(element){
        this.pointer = this.index(this.pointer + 1);
        this.head = this.index(this.pointer + 1);

        if(this.head == this.tail) {
            this.tail = (this.head + 1) % this.queue.length;
        }

        this.queue[this.pointer] = element;
    }

    /**
     * will return the next element or null if the pointer on the last element
     */
    next(){
        var i = this.index(this.pointer + 1);

        if (i == this.head){
            return null;
        }

        this.pointer = i;

        return this.queue[i];
    }

    /**
     * will return the previous element or null if the pointer on the first element
     */
    previous(){
        var i = this.index(this.pointer - 1);

        if (i == this.index(this.tail - 1)){
            return null;
        }

        this.pointer = i;

        return this.queue[i];
    }

    index(i){
        return this.mod(i, this.queue.length);
    }

    mod(x, y){
        return ((x % y) + y) % y;
    }
}