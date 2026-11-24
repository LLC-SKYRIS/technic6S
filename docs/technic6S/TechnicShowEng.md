# Technic Show

**Technic Show** is an open software platform for organizing drone swarm shows. It is suitable for working with flight controllers running PX4 firmware, installed on Technic6S-series drones with an **Orange Pi 5 Pro** compute module.

The system consists of two parts:

- **Client (Technic6S)** — the `technic-show.service`, which runs on the Orange Pi, receives commands from the server, and controls the flight controller via MAVROS.
    
- **Server (Personal Computer)** — an application on the operator's computer (macOS, Windows, or Linux) that displays the status of all drones, sends flight missions, distributes animations, and allows controlling the show in real time.
    

Features:

- Swarm control of up to hundreds of drones simultaneously.
    
- Uploading flight animations in CSV format (created via a Blender add-on).
    
- Control of the LED strip (WS281x) directly from the animation.
    
- Time synchronization between drones via a proprietary NTP server.
    
- Support for local positioning (ArUco markers, UWB, Optical Flow).
    

---

## Quick Start

For a quick start, please read the instructions below. You should also read the entire manual if you have no prior experience with clever-show.

### 1. Download the ready-made image

An image has been prepared for the Technic6S, which already includes:

- Python dependencies for the `technic-show` client.
    
- chrony, nmcli, and other basic interfaces.
    
- Auxiliary scripts.
    

**Link to the image:** _(it is currently in the testing phase, so please use the manual client setup instructions [see here](https://clientinstallation.md/))_

After downloading, flash the **eMMC** using **Balena Etcher**, insert it into the **Orange Pi**, and apply power to the drone. ([see here](https://imageopi/))

### 2. Connect to the drone via the access point

After connecting to the drone, see the instructions on connecting it to your Wi-Fi network. ([see here](https://wificonnected.md/))

### 3. Start technic-show

Navigate to the installation folder:

bash

cd /home/orangepi/technic-show/builder/assets

Then grant permissions to the auxiliary script for changing the name:

bash

chmod +x set_hostname.sh

Then navigate to the project root:

bash

cd /home/orangepi/technic-show

And assign the startup programs:

bash

chmod +x set_host.py start_technic_show.sh

After all installations, synchronize the image with the working directory:

bash

sync

Now you can connect to the server:

bash

sudo ./start_technic_show.sh IP

`IP` — replace this with your PC's IP address; you can find it in the network settings.

### 4. Installing the server

The server is an application that can be deployed on any OS; to install it, follow the detailed instructions [here](https://server/).

Navigate to the directory where your _server.py_ file is located and run it through a virtual environment:

bash

source .venv/bin/activate       # macOS / Linux
# .venv\Scripts\activate        # Windows

install the dependencies:

bash

pip install -r requirements.txt

run it via python

bash

python3 server.py

---

If you have any questions, message me @Shvaighofer