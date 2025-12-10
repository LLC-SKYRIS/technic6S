# Подключение к PX4

Для программирования [автономных полетов](simple_offboard.md), [работы с Pixhawk (Pixracer) по Wi-Fi](gcs_bridge.md), использования [телефонного пульта](rc.md) и других функций необходимо соединение OPi и полетного контроллера.

## Подключение по UART

Основным способом подключения является подключение по интерфейсу UART0.

Если обозначенный пин GND занят, можно использовать другой UART7-M2, используя [распиновку](https://pinout.xyz).

1. Убедитесь в работоспособности подключения:

    ```bash
    rostopic echo -n1 /mavros/state
    ```

    Поле `connected` должно содержать значение `True`.

Дополнительная информация: https://docs.px4.io/main/en/peripherals/serial_configuration.html.

## Подключение по USB

Дополнительным способом подключения является подключение по интерфейсу USB.

1. Соедините OPi и полетный контроллер micro-USB to USB кабелем.
2. Отключите соединение по uart 
3. [Подключитесь в Orangepi 5 pro по SSH](ssh.md).
4. Поменяйте в launch-файле Technic (`~/catkin_ws/src/clover/clover/launch/clover.launch`) тип подключения с `uart` на `usb` ``:

    ```xml
    <arg name="fcu_conn" default="usb"/>
    ```

    При изменении launch-файла необходимо перезапустить сервис `technic`:

    ```bash
    sudo systemctl restart technic
    ```

5. Убедитесь в работоспособности подключения, [выполнив команду на Orangepi 5 pro](cli.md):

    ```bash
    rostopic echo /mavros/state
    ```

    Поле `connected` должно содержать значение `True`.

> **Hint** Для корректной работы подключения OPi и Pixhawk по USB необходимо установить значение [параметра](parameters.md) `CBRK_USB_CHK` на 197848.

