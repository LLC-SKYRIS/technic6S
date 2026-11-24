# Connecting to a Wi-Fi Network

To connect the Technic6S, you need to perform a couple of simple steps.

- First, you will need to configure the router to which your drone and laptop will connect to run the server. If your router is already configured, then you can...
    

After configuring the router, choose a connection option:

1. Via an Ethernet cable.
    
2. Via the Technic6S access point.
    

---

## Method 1

Connect the Technic6S to the router, having first checked which port you are plugging the cable into. The port must be labeled "LAN", not "WAN"; after connecting the Technic6S to the router, the green and yellow LEDs should light up on the Orange Pi 5 Pro (Ethernet port). Once the LEDs light up, log in to the router and find your drone in the client list.

After that, connect to the Technic6S via SSH ([see here](https://ssh/))

Then, in the **terminal** itself, enter the following installation commands:

1. bring down the Technic6S access point:
    

bash

sudo nmcli connection down technic-ap

> **Hint** if you later need to access the drone via the access point, skip step 2 of Method 1

2. delete the access point:
    

bash

sudo nmcli connection del technic-ap

3. stop the access point service:
    

bash

sudo systemctl stop hostapd

4. disable the auto-start of the access point service:
    

bash

sudo systemctl disable hostapd

5. now you need to change the interface mode:
    

bash

sudo ip link set wlan0 down
sudo iw dev wlan0 set type managed
sudo ip link set wlan0 up

6. verify that the changes have taken effect:
    

bash

iw dev

- The phrase `type managed` should be present there
    

7. after that, check the list of Wi-Fi networks:
    

bash

nmcli device wifi list

- If you see the network broadcast by your configured router, proceed further
    

8. Connecting to the Wi-Fi network:
    

bash

sudo nmcli device wifi connect "SSID" password "PASSWORD"

- `SSID` - this is the name of your network
    
- `PASSWORD` - this is the password of your network  
    after that you will see that the connection is successful; Your drone is ready to proceed to the next stages!
    

---

## Method 2

This method works via the system utility `nmtui` and subsequent reconnection using the drone's new IP address.

1. Connect to the drone via the access point and open the terminal either through the [web interface](https://webinterface/) or [SSH connection](https://ssh/)
    
2. In the terminal itself, activate the `nmtui` utility by simply typing it into the terminal:
    

bash

nmtui

3. A menu will open where you need to select `Activate a connection`
    

> **Hint** all navigation is done using the arrow keys on the keyboard, and to select something you need to press _enter_ or _return_

- After connecting, exit this menu and check our status relative to the router
    

4. Enter the following command in the terminal:
    

bash

ip a

- after this command, find the following line:
    

text

4. wlan0-sta: <BROADCAST, MULTICAST, UP, LOWER_UP> ... etc.

`192.168.x.x` - will be your IP, and you will need to connect via SSH using it

5. After finding the new IP address, reconnect to it via SSH and follow steps 1 through 4 of Method 1.
    

---

If you have any questions, message me @Shvaighofer