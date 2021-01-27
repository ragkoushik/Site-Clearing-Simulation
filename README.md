# Site-Clearing-Simulation
Interactive training sessions with a simulator

## Constraints
The simulated construction site is a rectangular shape, described as a grid of square blocks each with equal size. Each square block of the site may be described in one of four different ways:
- It is plain land, and can be cleared by having the bulldozer pass through it or stop on it. There is a fixed amount of fuel consumed in the process.
- It has rocky ground, so it will consume twice as much fuel as plain land to clear unless it has been cleared already by a previous visit, in which case it will consume the same amount of fuel as visiting plain land.
- It contains a tree that can be cleared, so it will consume twice as much fuel as plain land to clear unless it has been cleared already by a previous visit, in which case it will consume the same amount of fuel as visiting plain land. If you attempt to clear a tree by passing through a square with a tree that has not yet been cleared instead of stopping exactly on it, the bulldozer’s paint will get scratched by the tree branches. There will be a financial penalty imposed to account for the time required to repair the damage to the bulldozer.
- It contains a tree that must be preserved. An attempt to visit or pass through this kind of square will end the simulation and also incur an extra cost to pay for legal expenses. The site will never have a ring of unremovable trees that surround one or more squares that could otherwise be cleared.
The trainee supervisor interacts with the simulator by giving it instructions int the UI (either using input box or “virtual control buttons”). Their goal is to clear all of the clearable parts of the construction site and to keep costs to a minimum. In the real world the instructions might be sent to a bulldozer operator by radio, or perhaps written into a plan for the bulldozer operator to follow. Therefore each command (other than quitting the simulation) incurs a cost to pay for the overhead of communicating with the bulldozer driver.

**Inputs**
- A file containing a site map. This will be asked to be uploaded when the application is started.
- Commands entered by the trainee either using “virtual controls” or commands in an input field, as described below under "Operation".

**Outputs**
- A list of all the commands that were entered by the trainee.
- A table providing itemized costs of the clearing operation and a total cost.

**Sequence of Operation**
- The application is started with the site map file name provided as a parameter to the application.
- The site map is displayed on the screen for the trainee.
- The trainee enters one command per line on the input field or using “virtual control
buttons”. Commands are executed as soon as the user presses “Enter” or pushes “virtual control button” until one of the following simulation ending events occurs:
  - there is an attempt to navigate beyond the boundaries of the site; o there is an attempt to remove a tree that is protected;
  -the  the trainee enters the quit command.
- The simulation ends and commands are no longer accepted. A list of commands entered and an itemised expense report is displayed on the screen.

**Rules**
The site map is defined by a text file with one character per square of the site. Each row must have the same number of characters. Plain land is marked with the letter ‘o’, rocky land is marked with the letter ‘r’, removable trees are marked with the letter ‘t’, and trees that must be preserved are marked with the letter ‘T’. For example, the following describes a site that is 10 squares wide and 5 squares deep:
ootooooooo oooooooToo rrrooooToo rrrroooooo rrrrrtoooo

**Components**
- Bulldozer - an instance of bulldozer
- Site - renders the site view based on the uploaded file
- Command - an interface to input commands from an input box or visual control buttons
- Simulator - is an in instence of Bulldozer, Site, Command put together 
- Dropzone - Component to drop a site map
- Upload - Component to parse a text file, validate it and create site map aka grid.
- Report - Component to view costs and breakdowns on a popup after termination

**Utils**
- constants - all business rules related data eg: costs, commands, accepted file types are configured here
- validation - all validations are done here
- reports - reporting calculations are done here 

**Store**
- reducer - adds to store
- action - all reducer actions are defined here

**Tests**
All application specific test cases are defined here

**Models**
- model - has all interfaces for the app defined

**Legend**
  <img width="100" src="https://image.flaticon.com/icons/png/512/46/46818.png">
  **Bulldozer**
  
  <img width="100" src="https://github.com/ragkoushik/Site-Clearing-Simulation/blob/main/public/o.png?raw=true">
  **Plan land (o)**
  
  <img width="100" src="https://github.com/ragkoushik/Site-Clearing-Simulation/blob/main/public/r.png?raw=true">
  **Rocky land (r)**
  
  <img width="100" src="https://github.com/ragkoushik/Site-Clearing-Simulation/blob/main/public/t.png?raw=true">
  **Tree (t)**
 
  <img width="100" src="https://github.com/ragkoushik/Site-Clearing-Simulation/blob/main/public/T.jpg?raw=true">
  **Protected Tree (T)**
  
## TODO
Out of scope but nice to do
- Replace all css files as saas files and replace hardcoded px to be computed at run time.
- Make the UI controls more user fiendly - Eg: Autofocus on the textbox for command entry, clear previously entered commands etc

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`
Launches the test runner in the interactive watch mode.
### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**
