# Автозапуск ПО
## systemd

> 💡 **Подсказка** Основная документация: https://wiki.archlinux.org/index.php/Systemd_(Русский)

Все автоматически стартуемое ПО Technic запускается в виде systemd-сервиса `technic.service`.

Сервис может быть перезапущен командой `systemctl`:

```bash
sudo systemctl restart technic
```

Текстовый вывод ПО можно просмотреть с помощью команды `journalctl`:

```bash
journalctl -u technic
```

Для того чтобы запустить ПО Technic непосредственно в текущей консольной сессии, вы можете использовать `roslaunch`:

```bash
sudo systemctl stop technic
roslaunch technic technic.launch
```

Вы можете выключить автозапуск ПО Technic с помощью команды `disable`:

```bash
sudo systemctl disable technic
```

## roslaunch

> **Подсказка** Основная документация: http://wiki.ros.org/roslaunch.

Список объявленных для запуска нод / программ указывается в файле `/home/orangepi/technic_ws/src/technic/technic/launch/technic.launch`

Вы можете добавить собственную ноду в список автозапускаемых. Для этого разместите ваш запускаемый файл (например, `my_program.py`) в каталог `/home/orangepi/technic_ws/src/technic/technic`. Затем добавьте запуск вашей ноды в `clover.launch`, например:

```xml
<node name="my_program" pkg="technic" type="my_program.py" output="screen"/>
```

Запускаемый файл должен иметь *permission* на запуск:

```bash
chmod +x my_program.py
```

При использовании скриптовых языков вначале файла должен стоять <a href="https://ru.wikipedia.org/wiki/Шебанг_(Unix)">shebang</a>, например:

```bash
#!/usr/bin/env python3
```

