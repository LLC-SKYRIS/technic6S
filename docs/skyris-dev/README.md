# Разработки SKYRIS

В этом разделе — open-source проекты, библиотеки и утилиты, которые
команда SKYRIS разрабатывает и поддерживает для внутренних задач и
для сообщества.

Все проекты распространяются под свободными лицензиями, доступны на
GitHub и открыты для вклада извне.

## Проекты

### [pyskyrc — SkyRC Q200neo / T1000 на Python](pyskyrc.md)

Библиотека на чистом Python для управления и телеметрии зарядных
устройств **SkyRC Q200neo** и **T1000** через **USB HID** и
**Bluetooth Low Energy**. Протокол восстановлен обратной разработкой
из официального Charge Master — работа возможна **без оригинального
ПО и без SkyRC app**.

- Поддержка всех 4 портов (A / B / C / D)
- 7 типов аккумуляторов: LiPo, LiIo, LiFe, LiHV, NiMH, NiCd, Pb
- Все режимы: BAL.CHG, CHARGE, DISCHARGE, STORAGE, RE-PEAK, CYCLE, NORMAL, AGM, COLD CHARGE
- CLI + Python API + интерактивная оболочка
- Опубликован на PyPI: `pip install "pyskyrc[ble]"`

Репозиторий: [github.com/Arlequin-AI/pyskyrc](https://github.com/Arlequin-AI/pyskyrc)

## Как предложить свой проект

Если у вас есть open-source проект, связанный с нашей тематикой —
аккумуляторы, зарядка, телеметрия, дроны, робототехника — создайте
issue в [репозитории документации](https://github.com/LLC-SKYRIS/technic6S/issues)
с кратким описанием.