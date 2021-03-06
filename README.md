# CodeClub Programme - Winter 2019

The purpose of these interactive examples is to give 7-10 year olds an easy introduction to programming
concepts using Javascript. There are a number of great resources out there already, but I found that most 
of these were either entirely graphical (Scratch), or paid.

Schools teaching IT in their curriculum may have already introduced the kids to Scratch, and some parents may have 
already done some coding with them outside of the classroom- so these exercises try to start off slow enough to be
 widely inclusive, whilst still offering routes to explore, create, and h4ck. I've found that kids are more excited by 
 these exercises than scratch; there is something cool about **writing** code.

Importantly, we reuse components between weeks, providing an approachable framework for future projects in this style.

## Week 1 - Traffic Lights

In the first class, we want to introduce the interface that the kids will be working with, getting them to engage
with the idea of editing their code on the left, and pressing 'play' to run it on the right. We achieve this through
an interactive traffic light, which we aim to get the kids to complete.

### Outcomes
* Introduce GUI, get used to editing and playing
* Code execution order, sequential instructions
* Concept of functions, strings, and properties in JS (high level)

### Exercises
* Finish the sequence (red.on, yellow.on, red.off yellow.off, green.on, green.off, yellow.on, yellow.off, red.on)
* Reverse the traffic light

![Week One](static/week1.png)

### Going Further
* Each of the colours is a HTML hex code, or colour string, teach about RGBA/Hex
* setColour is one method on that object, we can also setSize(), shuffle() etc.
* How do we execute two commands at once? **(hard)**

## Week 2 - Turtle

In the second class, we want to start drilling the ideas of code execution order, and logical progression. We do this with Turtle. 
Commands are implemented as a set of inline functions, removing the functional context idea we used in
week 1 when operating our lights.

In our pre-loaded example, show how we can use penup() and pendown(), along with movement commands to navigate the canvas
and draw out a word or image.

### Outcomes
* Introduce inline functions, and for loops.
* Get comfortable with directions, angles, movements in 2D space.
* Show how we might programatically draw more complex shapes.

### Exercises
* Make simple shapes - triangle, square etc.
* How would we make more complicated patterns? eg. a spiral, or figure-of-8?
* Look and see how we've written 'CODe' in the example, can you write your name?

![Week Two](static/week2.png)

### Going Further
* We define a function circle() in our example - can kids implement their own?
* Turtle isn't only white, we can set colour with colour(r 0-255, g 0-255, b 0-255, a 0-1)

## Week 3 - Painting by Pixels

For the third exercise we're going to try to draw pixel art using a 20x20 grid. So far my experience has been that in Scratch
programs, kids are fairly confident with coordinates by year 4 and 5, but patchy before that - moving a sprite left or right
has taken them a few questions about whether movement should be positive or negative in each plane. For loops and functions
have proven complex to get the kids using confidently, so we can explore that further here.

This exercise allows them to see the co-ordiantes by hovering over the square, and gives them an easy way to reinforce that 
learning. Hopefully, free painting here
 will give some funny / interesting results. 

### Outcomes
* Solidify understanding of the cartesian co-ordinate system
* Continue to explore functions and loops


![Week Three](static/week3.png)

### Going Further
* This has been built with the intention of them being able to make animations - how can they achieve that using functions
and the wait(100) method?

## Week 4 - Whack-a-Mole

In the fourth week we're recreating the arcade 'Whack-a-mole' game, and trying to get comfortable using if conditions to check
the state of the board and hit() the appropriate holes. Your points increase for correct answers, and decrease for incorrect 
answers. It should only take several lines to implement the conditions necessary to satisfy the rules, but there are test cases
for each of them - so they must all be implemented correctly!

### Outcomes
* Introduce conditional statements & synatx for 'if'

![Week Four](static/week4.png)

### Going Further
* Unfortunately, there isn't a lot of planned expansion here. I might come back to this and explore how easy it would
be for the kids to add their own animals in etc.

## Week 5 - Circle Clicker

It's week 5, we've introduced a number of core concepts - now we want to start getting comfortable with tying them together
to produce visible results. In this exercise the kids are going to be given a framework to program their own game rules to
make a 'Click the circle' game. They can increase points, change the size and speed of circles, and make them disappear. 

### Outcomes

* Get more comfortable with function call parameters, manipulating variables
* Have fun playing their creations

![Week Five](static/week5.png)

### Going Further
* It's easy to hide the circle once clicked and to increase points by 1 - can they make it so the points increase by a number
based on how small and quick they're going? (circle.getSpeed() and circle.getSize())
* What would happen if each time one circle popped, two sprung up in it's place?
* Can circles appear and disappear at random moments even if they haven't been clicked?