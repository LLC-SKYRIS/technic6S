# Technic Show Server

The server is a specialized Python program file that can be deployed on any operating system, whether Windows or Linux.

To install it, you will need to read the _Requirements and Launch_ section, as well as install the folder from GitHub, where the main server and its modules are located.

---

## Contents

1. Requirements and Launch
    
2. Project Structure
    
3. General Architecture
    
4. Main Window
    
5. Drone Table
    
6. Control Buttons
    
7. Menu
    
8. Typical Work Scenarios
    

---

## 1. Requirements and Launch

### What you need to run

1. Python **3.9.7**
    

> **Hint** it can be installed from the official website ([see here](https://www.python.org/downloads/))

2. A virtual environment manager (`venv` or `pyenv`):
    

bash

pip install venv

3. Cloning the server project from the GitHub repository (clone it to your PC):
    

bash

git clone https://github.com/Gromodzila/Technic-Show-Server.git

- All these commands must be entered in the terminal on your computer; if you are on Windows, then in PowerShell ([documentation](https://learn.microsoft.com/ru-ru/powershell/))
    

### How to launch the server

bash

# 1. Open the terminal (PowerShell)
cd Technic-Show-Server
# 2. Create a virtual environment with Python 3.9.7
python3.9 -m venv .venv
# 3. Activate the environment
source .venv/bin/activate       # macOS / Linux
# .\venv\Scripts\Activate.ps1   # Windows
# 4. Install the server project dependencies
pip install -r requirements.txt
# 5. Launch the server
python3 server.py

After launching, the main window with the drone table and control panel will open.

---

## 2. Project Structure

text

TehnicShowServer/
│   ├── config/                # configurator
│   │   └── spec/configspec_server.ini
│   ├── icons/                 # icons and splash images
│   └── modules/               # server modules
│       ├── server_core.py     # network core: Server, Client
│       ├── copter_table.py    # drone table widget
│       ├── copter_table_models.py  # drone data model
│       ├── config_editor_models.py # config editor
│       ├── visual_land_dialog.py   # visual landing dialog
│       └── ui/                # generated PyQt5 forms
│
├── server.py                  # entry point, GUI, interface logic
├── lib/                       # shared libraries
│   ├── __init__.py
│   ├── messaging.py           # message exchange protocol
│   ├── config.py              # configuration handling
│   └── lib.py                 # b_partial function
│
└── requirements.txt

---

## 3. General Architecture

The server consists of two parts:

- **Network core** — listens on a TCP port, accepts connections from drones, exchanges messages in JSON format, supports heartbeat and connection recovery.
    
- **Graphical interface** — operator window: drone table, command buttons, menu, dialogs.
    

On startup, the server:

1. Reads the configuration from `config/server.ini`
    
2. Opens a TCP port (`25000` by default) for drone connections
    
3. Starts a background thread for processing clients
    
4. Optionally sends a UDP broadcast so that drones can find the server automatically
    
5. Shows the main operator window
    

Each drone is a separate TCP client. The server can work with dozens of connected drones simultaneously.

---

## 4. Main Window

The window is divided into three areas:

- **Center** — the drone table (occupies most of the screen)
    
- **Right** — a vertical column of control buttons
    
- **Top** — the menu bar
    

---

## 5. Drone Table

Each row is one connected drone. The first column is a selection checkbox.

### Cell colors

The cell background color indicates the check status:

|Color|Meaning|
|---|---|
|Green|Check passed|
|Red|Check failed|
|Yellow|Data missing|
|Magenta|Outdated firmware or configuration version|

### Columns

|Column|Description|
|---|---|
|Checkbox (tick)|Drone is selected. Commands apply only to selected drones|
|copter ID|Drone name, for example `technic-0001`|
|version|Firmware git commit version|
|configuration|Configuration file version|
|animation ID|Name of the current animation and its status|
|battery|Voltage and charge percentage|
|FCU status|Flight controller state: `STANDBY`, `ACTIVE`, etc.|
|sensors|Sensor calibration status|
|mode|Flight mode|
|checks|Self-check result. Double-click opens a detailed report|
|current x y z yaw frame_id|Current drone coordinates and orientation|
|start x y z yaw action delay|Starting point for the animation|
|last task|Last completed task|
|dt|Time difference between the drone and the server|

### Working with the table

- Left-click on the checkbox (small square) — select or deselect the drone
    
- Double-click on `copter ID` — open the name editing dialog
    
- Double-click on `checks` — show the detailed self-check report
    
- Right-click on a column header — menu for configuring visible columns, their order, and width
    
- Right-click on the `configuration` cell — context menu:
    
    - **Edit config** — open the drone configuration editor
        
    - **Copy config to selected** — copy the config to other selected drones
        

---

## 6. Control Buttons

All buttons are located in the right column of the main window and are grouped by purpose.

### Launch panel

|Element|Action|
|---|---|
|Start after|Delay in seconds before the animation starts|
|Preflight check|Request telemetry from selected drones. Updates statuses in the table; most likely won't be needed|
|Start animation|Start the animation: drones take off and begin moving after the specified delay|
|Pause|Pause. When pressed again, it turns into Resume and continues the animation from the current point|

### Landing panel

|Element|Action|
|---|---|
|Land selected|Land the selected drones. Smooth descent at the current point|
|Land ALL|Land all connected drones simultaneously|
|Emergency land|Emergency landing of selected drones. Faster than normal, without smooth trajectories|

### Motor control panel

|Element|Action|
|---|---|
|Disarm ALL|Disarm motors on all drones|
|Disarm selected|Disarm motors on selected drones|
|Test leds|Test LED lighting. Helps locate a specific drone in the air|
|Takeoff|Take off selected drones immediately, without delay|
|Z|Checkbox: takeoff to the specified altitude in meters. Without the checkbox — default altitude|
|Flip|Flip selected drones. Only when FCU is active|

### Maintenance panel

|Element|Action|
|---|---|
|Reboot FCU|Reboot the flight controller. The drone must be stationary|
|Calibrate gyro|Gyroscope calibration|
|Calibrate level|Level calibration|

---

## 7. Menu

### Server menu

|Item|Action|
|---|---|
|Edit server config|Open the server configuration editor `config/server.ini`|
|Edit any config|Open the editor for any `.ini` file|
|Update server git|Update sources via `git fetch` and `git pull --rebase`|
|Restart server|Restart the server|

### Table menu

|Item|Action|
|---|---|
|Toggle select|If all are selected — deselect, otherwise — select all|
|Select all|Check all drones|
|Deselect all|Uncheck all drones|
|Remove selected drones|Remove selected drones from the table|
|Configure columns|Open the column preset editor|

### Selected drones menu

Commands apply to drones that have a checkmark.

#### Send submenu

|Item|Action|
|---|---|
|Animations|Select a folder with `.csv` or `.txt` animations. Each file is sent to the drone whose ID is in the file name|
|Camera calibrations|Select a folder with `.yaml` camera calibrations. Similar matching by ID|
|Aruco map|Send the ArUco map. After sending, the `technic`service on the drone restarts|
|Animation|Send a single animation file to all selected drones at once|
|Configuration|Send an `.ini` configuration file. Modify or Rewrite modes|
|Launch files folder|Send a folder with `.launch` and `.yaml` files|
|FCU parameters file|Send a PX4 `.params` parameters file and request loading|
|File|Send any file to any path on the drone|
|Command|Send an arbitrary command to the drone|

#### Restart service submenu

|Item|Action|
|---|---|
|chrony|Restart the time synchronization service on the drone|
|technic|Restart the ROS service `technic`|
|technic-show|Restart the `technic-show` service|

#### Start and altitude

|Item|Action|
|---|---|
|Set start X Y to current position|Record the current coordinates as the starting point|
|Reset start position|Reset the starting point to the default value|
|Set Z offset to ground|Record the current Z value as the ground offset|
|Reset Z offset|Reset the ground offset|

#### Other

|Item|Action|
|---|---|
|Reboot|Reboot the drone's operating system. Takes 30–60 seconds|

---

## 8. Typical Work Scenarios

### Preparing for a show

1. Turn on the drones and wait for them to connect. Rows will appear in the table
    
2. Check the required drones
    
3. Send files: animations, ArUco map
    

### Starting the show

1. Set the **Start after** delay (for example, 2 seconds)
    
2. Press **Start animation**
    
3. Monitor the table. If necessary — **Pause**, followed by landing in case of an emergency
    

### Emergency situations

- One drone behaves abnormally: take over control via manual control
    
- Complete failure: **Land ALL** or **Emergency land** (read up on it before use)
    

---

If you have any questions, message me @Shvaighofer; a server application will be released soon