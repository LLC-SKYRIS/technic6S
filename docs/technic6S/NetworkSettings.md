# Настройка сети

По умолчанию имя точки: technic-xxxx, пароль: technicwifi

Если вы хотите поменять имя wifi или пароль введите в терминал:

```bash
sudo nmcli connection modify technic-ap 802-11-wireless.ssid ""
sudo nmcli connection modify technic-ap wifi-sec.psk "новый_пароль"
```

1. Введите в терминал чтобы увидеть настройки сети

```bash
sudo nano /etc/hostapd/hostapd.conf
```

2. Для изменения имени Wi-Fi точки доступа поменяйте значение параметра **ssid**
3. Для изменения пароля Wi-Fi поменяйте значение параметра **wpa_passphrase**

> **Подсказка** 

4.  После внесенных изменений, нажмите Ctrl+X, затем Y и Enter
5. Перезапустите OrangePi 5 Pro

```bash
sudo reboot
```