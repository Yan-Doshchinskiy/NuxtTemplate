## Parts

Модуль, непосредственно содержащий в себе тесты.

Предназначен для реализации тестирования одной из частей компонента.

Например, можно тестировать `props`, `emmits` и `attributes` в отдельных инстансах.

### 1. MainAbstractPart(abstract) [go to file](../../prototypes/parts/main.abstract.part.ts)

Абстрактный модуль для создания подклассов.

#### Generic types

Модуль принимает в себе `generic type` `<DP>`, который отвечает за типизацию `Props`, имеющих `default` значения.

Модуль принимает в себе `generic type` `<P>`, который отвечает за типизацию `required props`.
Этот тип должны наследоваться от `Partial<DP>`.

Модуль принимает в себе `generic type` `<S>`, который отвечает за типизацию `slots`.
Этот тип должен наследоваться от `ISlots`.

Модуль принимает в себе `generic type` `<UO>`, который отвечает за типизацию `OptionUtil`.
Этот тип должен наследоваться от `MainOptionsUtil<DP, P, S>`.

Модуль принимает в себе `generic type` `<US>`, который отвечает за типизацию `StylerUtil`.
Этот тип должен наследоваться от `MainStylerUtil`.

Модуль принимает в себе `generic type` `<UM>`, который отвечает за типизацию `MounterUtil`.
Этот тип должен наследоваться от `MainMounterUtil<DP, P, S>`.

#### Constructor

- Аргумент конструктора `utils` представляет собой набор из 3 инстансов [Utils](./utils.doc.md).

| Name  | Type                           | Description               |
|-------|--------------------------------|---------------------------|
| utils | IPartUnitUtils <UO, US, UM>    | Module utils              |

#### Properties

- Св-во `_utils` содержит инстансы [Utils](./utils.doc.md) модуля.


- Св-во `get options` выдаёт инстанс `MainOptionsUtil`, хранящийся в `utils`.


- Св-во `get styler` выдаёт инстанс `MainStylerUtil`, хранящийся в `utils`.


- Св-во `get mounter` выдаёт инстанс `MainMounterUtil`, хранящийся в `utils`.

| Name        | Access Modifier | Type                        | Description     |
|-------------|-----------------|-----------------------------|-----------------|
| _utils      | private         | IPartUnitUtils<UO, US, UM>  | utils map       |
| options     | public get      | UO                          | option utility  |
| styler      | public get      | US                          | styler utility  |
| mounter     | public get      | UM                          | mounter utility |


#### Methods

- Абстрактный метод `run` предназначен для реализации внутри подклассов.
  Правильное использование предполагает написание тестов внутри этого метода с помощью `jest` и `@vue/test-utils`,
  а также функционала вынесенного в [Utils](./utils.doc.md).


| Name | Access Modifier | Return Type  | Description                                |
|------|-----------------|--------------|--------------------------------------------|
| run  | abstract public | void         | Empty method for test cases implementation |

### 2. MainCommonPart [go to file](../../prototypes/parts/main.common.part.ts)

Является подклассом `MainAbstractPart`.

Реализует метод `run`. Включает в себ тесты, которые включаются тестирование каждого компонента.

В данный момент реализует всего 1 test case на проверку статуса монтирования компонента.

Добавляется во все MainUnit внутри конструктора.
