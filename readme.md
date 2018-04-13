# Visual Josephus Problem
**_Imagine there are people sitting in N chairs arranged in a circle. Each chair is given an number starting with 1 and increasing by 1 to N, such that the chair to the right of a person sitting in chair 1 is numbered 2._**

**_You are standing in the center of this circle of chairs. You start by pointing at the person in chair number 1. You tell this person to leave and take their chair with them. The chairs always maintain their original numbering._**

**_Skipping the person sitting in chair #2, you then tell the person sitting in #3 to leave (and take their chair) -- that is, you skipped 1 person and told the next to leave. Once #3 has left, you then skip 2 people and tell #6 to leave. Continuing in this fashion, skipping one more person than you did before and telling people to leave, eventually there will be only one chair remaining. At this point, the process is completed. There are no more eliminations and the person in the remaining chair is declared the winner._**

## Challenge
Build a visualization of this process using HTML, CSS, and JavaScript. The solution must contain a form having two inputs and three buttons:

`"Chairs"` number input field - This field is where a user can type the number of chairs to use in the simulation. This correlates to the variable N in the description above. When this field is changed by the user, any running simulation should be stopped and set to an initial state with the number of
chairs provided. This field should default to 100.

`"ms"` number input field - This is the amount of time that must elapse between eliminations when running the simulation. This field may be changed during the running of a simulation. Its values can range from 0 to any positive integer. This field should default to 200 and allow all possible positive integers. As a convenience to the user, it should allow steps of 100.

`"Run Simulation"` button - When this button is clicked, the simulation will be run automatically pausing for "ms" milliseconds between eliminations. While the simulation is running, this button should change to read "Pause Simulation" and when clicked will pause the simulation. A click on "Pause Simulation" will stop all further eliminations and the button should return to reading "Run Simulation" and should behave as specified above.

`"Single Step"` button - When clicked, a single elimination will be run if there is one to be run. When this button is clicked the elimination should happen immediately with no delay. This button can be pressed during a running simulation and it will register an elimination following the standard rules. When clicked during a simulation, any timers in place should not be refreshed, and should be run "on schedule". If a user clicks the single step button while the simulation is running when there are only two chairs remaining, the simulation should be stopped after removing the second to last chair.

`"Reset" link` - When clicked, any running simulations should be stopped and all fields should be restored to their default values.


## Solution Notes
1. Developed in: Chrome, tested on iPad and iPhone. Many thanks to StackOverflow for hints and answers on some tough parts.

2. Implements a circular linked list data structure to represent the chairs object. This allows the ability to traverse in a circular pattern, delete each chair and find the next chair easily, as well as loop around.  I actually came up with the circular linked list solution on my own but found out others had used the data structure as a solution before when I was researching some information for this code. Boooo. I'm using my own personal circularLinkedList.js data structure I wrote a few months ago, although I had to write a new function for this particular assignment (`traverse`) since I needed it for this puzzle.

3. The initial Josephus algorithm wasn't difficult to solve at first, but turning it into a visual representation with the ability to influence it with a timer (through `setInterval`, pause, and step, as well as allow each of these abilities to influence each other without losing the pointer in the linked list was the major challenge). It required ripping apart the original algorithm solution and turning it into separate pieces (createLinkedList, removeChair, getNextChair).

4. Most of the complications arose from tracking the timing of setInterval and making sure there wasn't more than one timer running at a time (this happened several times before it was isolated). Other complications that came up:
    - Objects set equal to each other instead of assigned to a new variable, which only passed a reference to the original object, causing errors
    - small scoping issues that slipped through
    - visual issue with the numbers not aligning with the chairs (decided this was a small thing thing to not bother with, but could likely to be fixed by grouping the index number and chair image into one HTML tag and applying the transformation on it together instead of separately
    - getting the chairs to build into a dynamically sized circle (limited to a max size) took some searching initially but was pretty easy, there's possibly an easier way with mixins or equations in LESS but I threw the calculations into Javascript since I felt it was easier to grab the value from the input and calculate the dimensions that way