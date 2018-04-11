$(document).ready(function() {

    // default values
    const defaultChairs = 100;
    const defaultMS = 200;

    //initial load of default size
    josephus.loadChairs(defaultChairs);


    $('#btn_chairsCount').click(function () {
        $('.output_block').html('');

        var count = $('#chairsCount').val();
        if (count < 1 || count > 1000 ) {
            $('.output_block').html('Chairs count out of range (must be between 1 and 1000)');
        } else {
            josephus.loadChairs(count);
        }
    });

    $('#btn_runSimulation').click(function () {
        var count = $('#chairsCount').val();
        var milliseconds = $('#milliseconds').val();

        //change button behaviour to have pause functionality
        $(this).toggleClass('pause');
        josephus(count, milliseconds);
    });

    $('#btn_reset').click(function () {
        $('#chairsCount').val(defaultChairs);
        $('#milliseconds').val(defaultMS);
        $('.output_block').html('');
        loadChairs(defaultChairs);
    });

});


var josephus = (function(){

    function _loadChairs(n) {
        var chairImg = '<div><img class="chair" src="assets/chair.png"/></div>';
        var itemCount = n;
        var angle = 360 / itemCount;
        var translate = 2.8 * n;                // translate size is 2.8px times the number of items, this allows it to grow per items
        var rotation = 0;

        if (translate > 400) {
            translate = 400;                    // set translate to max size to keep the circle on the screen (this will be crowded for chairs > 300)
        }

        //clear chair container from previous elements
        $('.circle-container').empty();

        //create the graphical circle of chairs
        for (var i = 1; i <= itemCount; i++) {
            $('.circle-container').append(chairImg);
            $('.circle-container div:last').attr('id', 'chair-' + i).append(i);
            $('.circle-container div#chair-' + i).css('transform', 'rotate(' + rotation + 'deg) translate(' + translate + 'px) rotate(-' + rotation + 'deg');
            rotation = rotation + angle;
        }
    }


    function josephus(n, ms) {
        // create a circular linked list to represent the chairs
        // data in each node will be the number of the node since we need to know the "number" of who survives
        // this way we can circle around
        // n is the number of nodes (elements / chairs)

        // this isn't a true josephus algorithm so need to tweak it a bit
        // 1) first person to leave is HEAD
        // 2) counter for people to leave is n+1 from the round before (so just counter++ each time)
        // to test, manually calculated if n=10, final result is 7

        var jCLL = new circularLinkedList();
        var counter = 1;                                // start at node to remove
        var node;
        var intervalID;
        var lastMan;

        //create and populate a circular linked list with data
        for (var i = 0; i < n; i++) {
            jCLL.add(i + 1);
        }

        node = jCLL.head;

        intervalID = setInterval(function(){
            if (jCLL.size > 1) {
                jCLL.deleteNode(node.data);
                $('.circle-container div#chair-' + node.data).remove();
                counter++;
                node = jCLL.traverse(counter, node);
            } else {
                clearInterval(intervalID);

                console.log('last person alive: ' + node.data);
                $('.output_block').html('Final survivor for a count of ' + n + ' chairs is ' + node.data);
            }
        }, ms);
    }

    return {
        loadChairs:     _loadChairs

    }
})();

