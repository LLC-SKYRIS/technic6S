# Установка механического захвата тип 1

### Шаг 1: Крепление захвата к маунту камеры

Используется:
- Собранный механический захват;
- Маунт камеры - 1шт;
- Саморез M2x10 - 4шт.

Установите собранный механический захват на маунт камеры, как показано на рисунке 1, используйте 4 самореза M2x10.

<div class="img-figure" style="display:flex;justify-content:center;align-items:flex-start;gap:12px;">
  <img src="assets/gripper1_01.png" style="width:57%;height:auto;">
  <img src="assets/gripper1_02.png" style="width:48%;height:auto;">
</div>
<p class="img-caption">Рис. 1</p>

Должна получиться конструкция, как на рисунке 2

<div class="img-figure">
  <img src="assets/gripper1_03.png" width=450>
</div>
<p class="img-caption">Рис. 2</p>

### Шаг 2: Установка на дрон

Используется:
- Маунт с захватом, собранный на шаге 1;
- Винт M3x8 - 4шт.

Маунт с захватом следует установить на дрон, соблюдая ориентацию.

<div class="img-figure">
  <img src="assets/gripper1_04.png" width=500>
</div>
<p class="img-caption">Рис. 3</p>

Зафиксируйте готовую конструкцию, используя 4 винта M3x8

<div class="img-figure">
  <img src="assets/gripper1_05.png" width=401>
</div>
<p class="img-caption">Рис. 4</p>

### Шаг 3: Подключение к полетному контроллеру

Аккуратно проведите кабель от сервопривода к полётному контроллеру так, чтобы он не пересекался с пропеллерами. Подключите провод к гребёнке сзади сигнальным пином вверх (жёлтым проводом). Для подключения можно использовать 2 крайних столбца пинов, это AUX1 и AUX2, соответственно.

<div class="img-figure">
  <img src="assets/servo_fc_connect.png" width=500>
</div>
<p class="img-caption">Рис. 5</p>

Допускается подключение сервоприводов к шилду OrangePi. Для этого провод нужно соединить с пинами над разъёмами USB, как показано на рисунке 6.

<div class="img-figure" style="display:flex;justify-content:center;align-items:flex-start;gap:12px;">
  <img src="assets/servo_opi_shield_2.png" style="width:57%;height:auto;">
  <img src="assets/servo_opi_shield_1.png" style="width:48%;height:auto;">
</div>
<p class="img-caption">Рис. 6</p>

Подробнее о подключении сервоприводов к OrangePi написано в [данной статье](gpio.md).
