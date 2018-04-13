$(document).ready(function() {
    // default values
    const defaultChairs = 100;
    const defaultMS = 200;

    var chairLL, lastDeletedNode, node, milliseconds, intervalID;
    var counter = 1;

    //initial load of default size
    josephus.loadChairs(defaultChairs);
    chairLL = josephus.createLinkedList(defaultChairs);

    $('#btn_chairsCount').click(function () {
        var chairCounter = $('#input_chairsCount').val();
        milliseconds = $('#input_milliseconds').val();

        //clear chairs block
        $('.output_block').html('');
        $('#btn_runSimulation').html('Run Simulation').addClass('pause');

        if (chairCounter < 1 || chairCounter > 1000 ) {
            $('.output_block').html('Chairs count out of range (must be between 1 and 1000)');
        } else {
            counter = 1;
            intervalID = '';
            lastDeletedNode = Object.assign({});
            josephus.loadChairs(chairCounter);
            chairLL = josephus.createLinkedList(chairCounter);
        }
    });


    $('#btn_runSimulation').click(function (e) {
        var chairCounter = $('#input_chairsCount').val();
        milliseconds = $('#input_milliseconds').val();

        //change button behaviour to have pause functionality and capture last node
        $(this).toggleClass('pause');

        if ($('#btn_runSimulation').hasClass('pause')) {
            // we're in pause state
            $('#btn_runSimulation').html('Run Simulation');

        } else {
            // we're not in pause state
            $('#btn_runSimulation').html('Pause Simulation');

            if (counter == 1) {
                // this is initial start state, set head node
                node = Object.assign(chairLL.head);
            } else {
                // we're not starting on the head because we picked up from a partially run simulation
                node = Object.assign(josephus.getNextChair(chairLL, counter, lastDeletedNode));
            }
        }

        // run delete simulation
        intervalID = setInterval(function() {

            if($('#btn_runSimulation').hasClass('pause')) {
                // we're in pause state
                // we're still running the interval timer, just not doing anything

            } else {

                //only run the deletion if the button isn't set to pause
                // this doesn't technically pause the interval timer

                //if list size > 1 delete node
                if (chairLL.size > 1) {
                    chairLL = josephus.removeChair(chairLL, node);
                    counter++;

                    //track last deleted node
                    lastDeletedNode = Object.assign(node);
                    node = Object.assign(josephus.getNextChair(chairLL, counter, lastDeletedNode));
                } else {
                    clearInterval(intervalID);
                    josephus.displayResults(chairCounter, node.data);
                }
            }
        }, milliseconds);
    });


    $('#btn_singleStep').click(function () {
        var chairCounter = $('#input_chairsCount').val();

        // run single step delete simulation

        //get start node
        if (counter == 1) {
            node = Object.assign(chairLL.head);
        } else {
            node = Object.assign(josephus.getNextChair(chairLL, counter, lastDeletedNode));
        }

        //if list size > 1 delete node
        if (chairLL.size != 1) {
            chairLL = josephus.removeChair(chairLL, node);
            counter++;

            //track the deleted node
            lastDeletedNode = Object.assign(node);
        } else {
            josephus.displayResults(chairCounter, node.data);
        }
    });


    $('#btn_reset').click(function () {
        $('#input_chairsCount').val(defaultChairs);
        $('#input_milliseconds').val(defaultMS);
        $('#btn_runSimulation').html('Run Simulation').addClass('pause');
        $('.output_block').html('');

        counter = 1;
        intervalID = '';
        lastDeletedNode = Object.assign({});
        josephus.loadChairs(defaultChairs);
        chairLL = josephus.createLinkedList(defaultChairs);
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


    function _createLinkedList(n) {
        // create a circular linked list to represent the chairs
        // data in each node will be the number of the node since we need to know the "number" of who survives
        // this way we can circle around
        // n is the number of nodes (elements / chairs)

        var jCLL = new circularLinkedList();

        //create and populate a circular linked list with data
        for (var i = 0; i < n; i++) {
            jCLL.add(i + 1);
        }
        return jCLL;
    }


    function _removeChair(cll, chair) {
        // this isn't a true josephus algorithm so need to tweak it a bit
        // 1) first person to leave is HEAD
        // 2) counter for people to leave is n+1 from the round before (so just counter++ each time)
        // to test, manually calculated if n=10, final result is 7

        cll.deleteNode(chair.data);
        $('.circle-container div#chair-' + chair.data).remove();
        return cll;
    }


    function _getNextChair(cll, index, chair) {
        //return node of next chair to delete
        return cll.traverse(index, chair);
    }

    function _displayResults(count, data) {
        // single data is the last survivor
        console.log('last person alive: ' + data);
        $('#btn_runSimulation').html('Run Simulation').addClass('pause');
        $('.output_block').html('Final survivor for a count of ' + count + ' chairs is ' + data);
    }

    return {
        loadChairs:         _loadChairs,
        createLinkedList:   _createLinkedList,
        removeChair:        _removeChair,
        getNextChair:       _getNextChair,
        displayResults:     _displayResults
    }
})();

