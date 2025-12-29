# Программирование автономного полета

Наиболее часто для задач автономного полета применяется язык **Python**, который позволяет считывать [телеметрию](AutonomousFlightOffboard.md)(положение, ориентацию, скорость, заряд батареи) и отправлять команды управления, такие как [полет к заданной точке](AutonomousFlightOffboard.md), [изменение ориентации](AutonomousFlightOffboard) или [задание угловых скоростей](AutonomousFlightOffboard).

> 💡 **Hint** Если вы начинаете изучение Python, можно воспользоваться [самоучителем](https://pythonworld.ru/samouchitel-python).

После настройки позиционирования можно переходить к созданию собственных сценариев автономных полетов.  

Для этого подключитесь к OrangePi 5 Pro через веб-интерфейс и откройте терминал

Запуск программ выполняется стандартной командой Python:

`python3 flight.py`

Пример простого полета (взлет → движение вперед → посадка):

```python
import rospy
from technic import srv
from std_srvs.srv import Trigger

rospy.init_node('flight')

get_telemetry = rospy.ServiceProxy('get_telemetry', srv.GetTelemetry)
navigate = rospy.ServiceProxy('navigate', srv.Navigate)
navigate_global = rospy.ServiceProxy('navigate_global', srv.NavigateGlobal)
set_position = rospy.ServiceProxy('set_position', srv.SetPosition)
set_velocity = rospy.ServiceProxy('set_velocity', srv.SetVelocity)
set_attitude = rospy.ServiceProxy('set_attitude', srv.SetAttitude)
set_rates = rospy.ServiceProxy('set_rates', srv.SetRates)
land = rospy.ServiceProxy('land', Trigger)

# Взлет на высоту 1 м
navigate(x=0, y=0, z=1, frame_id='body', auto_arm=True)

# Ожидание 3 секунды
rospy.sleep(3)

# Пролет вперед 1 метр
navigate(x=1, y=0, z=0, frame_id='body')

# Ожидание 3 секунды
rospy.sleep(3)

# Посадка
land()
```

> ℹ️ Функция `navigate` выполняется асинхронно: скрипт продолжает работу, не дожидаясь достижения точки. Для блокирующей версии используйте [`navigate_wait`](CodeExamples.md#navigate_wait).

Обратите внимание: параметр `auto_arm=True` указывается только при первом вызове `navigate`. Он отвечает за автоматическую постановку дрона на охрану и перевод его в режим OFFBOARD.

С помощью параметра `frame_id` задается система координат, относительно которой рассчитываются движения:

- `body` — координаты относительно корпуса дрона;
    
- `navigate_target` — относительно последней целевой точки;
    
- `map` — локальная система координат;
    
- `aruco_map` — карта ArUco-маркеров;
    
- `aruco_N` — маркер с ID=N.

> **Подсказка** В Technic также доступен режим [блочного программирования](Blocky.md), позволяющий создавать сценарии без кода.

