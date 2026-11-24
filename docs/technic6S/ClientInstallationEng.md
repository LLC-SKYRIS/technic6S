# Technic-Show — Installation, Configuration, and Operation

Complete guide to installing the `technic-show` client on a drone, connecting to the server, and working with the operator interface.

Repository: [https://github.com/Gromodzila/technic-show.git](https://github.com/Gromodzila/technic-show.git)

---

## Table of Contents

1. Installation from Scratch
    
2. Configuration
    
3. client.ini Configuration Parameters
    
4. Working with the Server
    
5. Useful Commands

---

## 1. Installation from Scratch

### 1.1. Requirements

- Technic 6S drone
    

### 1.2. Cloning the Repository

bash```
```
git clone https://github.com/Gromodzila/technic-show.git
cd technic-show
```

### 1.3. Installing System Dependencies

bash
```
sudo apt-get update
sudo apt-get install -y python3-pip git chrony
sudo pip3 install -r /home/orangepi/technic-show/drone/requirements.txt --upgrade
```
### 1.4. Project Permissions

bash

```
sudo chown -R orangepi:orangepi /home/orangepi/technic-show
```
### 1.5. Copying Services

bash
```
sudo cp /home/orangepi/technic-show/builder/assets/technic-show.service /lib/systemd/system/
sudo systemctl daemon-reload
sudo cp /home/orangepi/technic-show/examples/chrony/client.conf /etc/chrony/chrony.conf
sudo systemctl restart chrony
```
---

## 2. Configuration

### 2.1. Changing the Drone Name

Each drone needs a unique name.

bash
```
sudo /home/orangepi/technic-show/builder/assets/set_hostname.sh technic-skyris
```
After changing the name, reboot the drone (can be done after the next step):

bash
```
sudo reboot
```


### 2.2. Starting the Client and Connecting to the Server

bash

```
sudo /home/orangepi/technic-show/start_technic_show.sh <IP>
```

Where `<IP>` is the IP address of the computer running the server. To find it:

- **macOS:** `ipconfig getifaddr en0`
    
- **Linux:** `ip addr | grep "inet "`
    
- **Windows:** `ipconfig` — "IPv4 Address" field

## 3. `client.ini` Configuration Parameters

File: `/home/orangepi/technic-show/drone/config/client.ini`

### 3.1. General Settings

|Parameter|Default|Meaning|
|---|---|---|
|`id`|`/hostname`|Drone name. Leave as `/hostname`.|
|`technic_dir`|`auto`|Path to the ROS package.|
|`config_name`|`client`|Config identifier.|
|`config_version`|`1.0`|Config version|

### 3.2. `[SERVER]`

|Parameter|Meaning|
|---|---|
|`host`|Server IP address. Changed via `start_technic_show.sh`.|
|`port`|Port. Default `25000`.|
|`buffer_size`|Buffer size. `1024`.|

### 3.3. `[BROADCAST]`

|Parameter|Value|Meaning|
|---|---|---|
|`use`|`False`|**Leave as `False`.** Disables automatic server discovery.|
|`port`|`8181`|Do not change.|

### 3.4. `[TELEMETRY]`

|Parameter|Value|Meaning|
|---|---|---|
|`transmit`|`True`|Send telemetry to the server.|
|`frequency`|`1.0`|Transmission frequency (once per second).|
|`log_resources`|`False`|Log CPU and memory. For debugging only.|

### 3.5. `[FLIGHT]`

|Parameter|Recommendation for Technic 6S|
|---|---|
|`frame_id`|`map` (or `aruco_map`)|
|`takeoff_height`|`1.5`|
|`takeoff_time`|`3.0`|
|`arming_time`|`0.5`|
|`land_delay`|`1.0`|
|`land_timeout`|`8.0`|

### 3.6. `[ANIMATION]`

|Parameter|Value|Meaning|
|---|---|---|
|`start_action`|`auto`|Auto-select takeoff/flight.|
|`check_ground`|`False`|**Leave as `False`.**|
|`yaw`|`animation`|Take yaw from the frame.|
|`private_offset`|`[0, 0, 0]`|Changed via the server.|

### 3.7. `[LED]`

|Parameter|Value|
|---|---|
|`use`|`True`|
|`takeoff_indication`|`True`|
|`land_indication`|`True`|

### 3.8. `[FAILSAFE]`

Leave unchanged.

### 3.9. `[NTP]`

|Parameter|Value|
|---|---|
|`use`|`False`|

---

## 4. Working with the Server

### Main Buttons

|Button|Action|
|---|---|
|**Check selected**|Request telemetry from selected drones.|
|**Start**|Start animation with delay.|
|**Pause**|Pause / resume.|
|**Takeoff**|Take off selected drones.|
|**Land**|Land.|
|**Disarm**|Stop motors.|
|**Flip**|Flip (in air).|
|**LED Test**|Test LEDs (white).|
|**LED Fill**|Fill the strip with color.|
|**Emergency Land**|Emergency landing.|
|**Reboot FCU**|Reboot the flight controller.|
|**Calibrate Gyro**|Gyroscope calibration.|
|**Calibrate Level**|Accelerometer calibration.|

### Menu

**File** — sending animations, calibrations, ArUco maps, launch files, PX4 parameters, any files and commands.

**Service** — restart `technic`, `technic-show`, `chrony`, reboot the drone, update the git repository.

**Animation** — bind animation start to the current position, reset offsets.

**Table** — edit configs, copy configurations, manage columns.

### Drone Status in the Table

- Green — everything is fine
    
- Yellow — requires attention
    
- Red — critical error, takeoff prohibited
    

## 5. Useful Commands

|Command|What it does|
|---|---|
|`journalctl -u technic-show.service -f`|Client logs in real time|
|`systemctl status technic-show.service`|Client status|
|`sudo systemctl restart technic-show.service`|Restart the client|
|`sudo systemctl restart technic`|Restart ROS packages|
|`ip a show wlan0`|Drone IP|
|`chronyc sources`|Check synchronization|
|`iw dev wlan0 info`|Wi-Fi mode|

If you have any questions, message me @Shvaighofer