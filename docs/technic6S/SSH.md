# SSH-подключение

Для использования терминала, редактирования файлов и работы с директивами можно подключиться по SSH. Для этого необходимо [подключиться к Orangepi 5 pro по Wi-Fi](wifi.md) (также возможно подключение через Ethernet-кабель).

> **Hint** Для доступа по SSH из Windows можно использовать [PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html) или веб-доступ (см. далее). Также можно получить доступ по SSH со смартфона с помощью приложения [Termius](https://www.termius.com).

В GNU/Linux или macOS необходимо запустить Терминал и выполнить команду:

```bash
ssh orangepi@10.42.0.1
```

Пароль: `orangepi`.

> **Hint** Для того, чтобы не вводить пароль при каждом подключении по SSH, см. [статью об использовании SSH-ключей](ssh_keys.md).

Подробнее: [http://nskhuman.ru/allwinner/orange/orangeman.php?np=13](http://nskhuman.ru/allwinner/orange/orangeman.php?np=13).
