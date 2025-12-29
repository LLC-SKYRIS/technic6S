# Сборка на собственной машине

Настройка среды для симуляции с нуля требует некоторых усилий, однако это приведет к улучшению производительности и к уменьшению вероятности появления проблем с драйверами.

Требования для сборки: **Ubuntu 20.04**.

## Установка ROS

Установите ROS Noetic используя [официальную документацию по установке](http://wiki.ros.org/noetic/Installation/Ubuntu) (Desktop или Full установка).

Добавьте выполнение инициализирующего скрипта ROS `setup.bash` в ваш файл `.bashrc`:

```bash
echo "source /opt/ros/noetic/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

Установите необходимые инструменты, которые понадобятся для дальнейшей установки:

```bash
sudo apt install build-essential git python3-pip python3-rosdep
```

## Создание рабочего пространства для симулятора

Создайте рабочее пространство:

```bash
mkdir -p ~/technic_ws/src
cd ~/technic_ws
catkin_make
echo "source ~/technic_ws/devel/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

Склонируйте исходный код пакетов Technic:

```bash
cd ~/catkin_ws/src
git clone --depth 1 https://github.com/LLC-SKYRIS/technic6S
```

Установите все зависимости, используя `rosdep`:

```bash
cd ~/catkin_ws
sudo rosdep init
rosdep update
rosdep install --from-paths src --ignore-src -y
```

Установите Python-зависимости:

```bash
sudo /usr/bin/python3 -m pip install -r ~/technic_ws/src/technic/technic/requirements.txt
```

## Загрузка исходного кода PX4

Сборка PX4 будет осуществлена вместе с другими пакетами в нашем рабочем пространстве. Вы можете загрузить его прямо в рабочее пространство или поместить куда-нибудь и создать симлинк к `~/technic_ws/src`. Нам также нужно будет поместить его подмодули `sitl_gazebo` и `mavlink` в `~/technic_ws/src`.

Склонируйте исходный код PX4 и создайте необходимые симлинки:

```bash
git clone --recursive --depth 1 --branch v1.12.3 https://github.com/PX4/PX4-Autopilot.git ~/PX4-Autopilot
ln -s ~/PX4-Autopilot ~/technic_ws/src/
ln -s ~/PX4-Autopilot/Tools/sitl_gazebo ~/technic_ws/src/
ln -s ~/PX4-Autopilot/mavlink ~/technic_ws/src/
```

> **Подсказка** Симулятор пока не поддерживает более поздние версии PX4, и при их использовании могут возникнуть ошибки.


> **Заметки** Если процесс клонирования завершится с ошибкой сети (`fatal: fetch-pack: invalid index-pack output`), используйте версию HTTP 1.1 `git config --global http.version HTTP/1.1` (после клонирования верните 2 версию командой `git config --global http.version HTTP/2`). Альтернативным решением будет принудительное клонирование репозитория и субмодулей через SSH командой `git config --global url."git@github.com:".insteadOf https://github.com/` (требует генерации и установки SSH ключа в настройках профиля GitHub).

## Установка зависимостей PX4

PX4 имеет свой собственный скрипт для установки зависимостей. Воспользуемся им:

```bash
cd ~/technic_ws/src/PX4-Autopilot/Tools/setup
sudo ./ubuntu.sh
```

Он установит все, что нужно для сборки PX4 и SITL.

> **Подсказка** Также вы можете пропустить установку ARM тулчейна, если вы не планируете компилировать PX4 для вашего полетного контроллера. Для этого воспользуйтесь флагом `--no-nuttx`: `sudo ./ubuntu.sh --no-nuttx`.

Установите дополнительные необходимые Python-пакеты:

```bash
pip3 install --user toml
```

## Добавление рамы Техника

Добавьте в PX4 раму Техника с помощью следующей команды:

```bash
ln -s ~/technic_ws/src/technic/technic_simulation/airframes/* ~/PX4-Autopilot/ROMFS/px4fmu_common/init.d-posix/airframes/
```

## Установка датасетов geographiclib

Для `mavros` нужны датасеты geographiclib:

```bash
sudo /opt/ros/noetic/lib/mavros/install_geographiclib_datasets.sh
```

## Сборка симулятора

После установки всех зависимостей можно начинать сборку рабочего пространства:

```bash
cd ~/technic_ws
catkin_make -j1
```

> **Заметки** Флаг `-j1` означает, что сборка не будет использовать параллельные процессы, так как при сборке с параллельными процессами на виртуальной машине может не хватить оперативной памяти. Если у вас достаточно памяти, вы можете не использовать этот флаг.

## Запуск симулятора

Чтобы удостовериться в том, что все было собрано корректно, попробуйте запустить симулятор:

```bash
roslaunch technic_simulation simulator.launch
```

Вы можете проверить автономный полет используя скрипты в директории `~/technic_ws/src/technic/technic/examples`.

## Дополнительные шаги

Для того, чтобы возможно было запускать среду симуляции Gazebo отдельно (команда `gazebo`), добавьте в `.bashrc` вызов соответствующего скрипта инициализации:

```bash
echo "source /usr/share/gazebo/setup.sh" >> ~/.bashrc
```

Опционально вы можете установить systemd-сервис для roscore для того, чтобы roscore был постоянно запущен в фоне:

```bash
sed -i "s/pi/$USER/g" ~/technic_ws/src/technic/builder/assets/roscore.service
sudo cp ~/technic_ws/src/technic/builder/assets/roscore.service /etc/systemd/system
sudo systemctl enable roscore
sudo systemctl start roscore
```

### Конфигурация веб-инструментов

Установите любой веб-сервер, чтобы раздавать веб-инструменты Техника (директория `~/.ros/www`), например, Monkey:

```bash
wget https://github.com/LLC-SKYRIS/technic6S/technic_vm/raw/master/assets/packages/monkey_1.6.9-1_$(dpkg --print-architecture).deb -P /tmp
sudo dpkg -i /tmp/monkey_*.deb
sed "s/pi/$USER/g" ~/technic_ws/src/technic/builder/assets/monkey | sudo tee /etc/monkey/sites/default
sudo sed -i 's/SymLink Off/SymLink On/' /etc/monkey/monkey.conf
sudo cp ~/technic_ws/src/technic/builder/assets/monkey.service /etc/systemd/system/monkey.service
sudo systemctl enable monkey
sudo systemctl start monkey
```

Создайте директорию `~/.ros/www` следующей командой:

```bash
rosrun technic www
```

При обновлении набора пакетов, содержащих веб-часть (через каталог `www`), также необходимо выполнение данной команды.
