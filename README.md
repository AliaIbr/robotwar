

# RobotWar
  
to start the program: 
- npm install
- npm start


upon starting the program, you will be asked to insert the following data:
- arrena coordinate (upper right corner)
- number of robots
- for each robot, its location and movment 

to insert the robot location, data is seprated by space, but that is not the case for the movment, and also movment is a string of capital letters of the letters (L,R,M)

example of the input:

insert arrena coordinates separated by space  5 5
insert number of robots  2
insert robot 1 location  1 2 N
insert robot 1 movment  LMLMLMLMM
insert robot 2 location  3 3 E
insert robot 2 movment  MMRMMRMRRM

the output is a list of JSON objects which has the new locations for each of the robots in the form 

[ { x: 1, y: 3, compass: 'N' }, { x: 5, y: 1, compass: 'E' } ]

where { x: 1, y: 3, compass: 'N' } is the new location of the Robot 1

{ x: 5, y: 1, compass: 'E' } is the new location of Robot 2 in the input example


If I had more time, I would have added:
- input validation 
- tests with Mocha/Chai