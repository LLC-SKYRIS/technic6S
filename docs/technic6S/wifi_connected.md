# Подключение к Wi-Fi сети

Вначале, вам нужно будет настроить роутер, к которому будут подключаться ваши дрон и ноутбук для запуска сервера 
после настройки подключите кабель-Ethernet к вашему orangepi так, чтобы загорелись желтый и зеленый светодиоды
а затем подключитесь к нему по SSH(https://docs.skyris.ru/technic6S/SSH.html)

после подключения выполните следующие команды

 1. опустите точку доступа:
 ```bash
 sudo nmcli connection down technic-ap
 ```

 2. удаляем точку доступа(если она будет нужна - пропустите):
 ```bash
 sudo nmcli connection del technic-ap
 ```

 3. выключаем сервис точки доступа:
 ```bash
 sudo systemctl stop hostapd
 ```

 4. выключаем auto-start сервиса точки доступа:
 ```bash
 sudo systemctl disable hostapd
 ```

 5. после этого опустим и поднимем wlan0:
 ```bash
 sudo ip link set wlan0 down
 sudo iw dev wlan0 set type managed
 sudo ip link set wlan0 up
 ```

 6. теперь проверьте interface: "type managed":
 ```bash
 iw dev
 ```

 7. проверьте есть ли Ваша wi-fi сеть:
 ```bash
 nmcli device wifi list
 ```

Есть ли она есть произведите подключение к вашей wifi сети
через данную комнаду
 ```bash
 sudo nmcli device wifi connect "SSID" password "PASSWORD"
 ```
