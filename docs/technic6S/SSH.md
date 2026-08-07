# SSH-подключение

Для использования терминала, редактирования файлов и работы с директивами можно подключиться по SSH. Для этого необходимо [подключиться к Orangepi 5 pro по Wi-Fi](ConnectingToWi-Fi.md) (также возможно подключение через Ethernet-кабель).

> **Подсказка** Для доступа по SSH из Windows можно использовать [PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html) или веб-доступ (см. далее). Также можно получить доступ по SSH со смартфона с помощью приложения [Termius](https://www.termius.com).

В GNU/Linux или macOS необходимо запустить Терминал и выполнить команду

```bash
ssh orangepi@10.42.0.1
```

Пароль: 
```bash
orangepi
```

Если вы столкнулись с ситуацией, когда ssh подключение недоступно и в терминале высвечивается 

```bash
port 22 connection refused
```

то необходимо заново сгенерировать ключи ssh

Зайдите в [терминал в веб-интерфейсе](Butterfly.md) и введите команду 

```bash
ssh-keygen -A
```

затем можно сделать restart ssh сервиса

```bash
sudo systemctl restart ssh
```

затем уже в терминале на компьютере подключитесь по ssh, ошибок возникать не будет

> **Подсказка** Для того, чтобы не вводить пароль при каждом подключении по SSH. См. [статью об использовании SSH-ключей](ssh_keys.md).


> **Подсказка** Некоторые ссылки на ресурсы не работают без vpn.

Подробнее: [https://help.sprecord.ru/ru/m-mt/additional_settings/ssh](https://help.sprecord.ru/ru/m-mt/additional_settings/ssh).
