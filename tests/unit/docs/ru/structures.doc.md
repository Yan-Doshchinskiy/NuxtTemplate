## Structures

Класс, хранящий в себе [Parts](./parts.doc.md).
Может запускать тесты внутри [Parts](./parts.doc.md) c помощью метода `run`.

### 1. MainPartsStructure(abstract) [go to file](../../prototypes/structures/main.parts.structure.ts)

Модуль, реализующий базовый функционал. Может быть использован для наследования.
При необходимости можно создавать подкласс и переопределить методы `run` и `addNewPart`,
чтобы изменить базовое поведение. Например, если необходимо изменить структуру хранения,
либо порядок запуска тестов.

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

В базовой имплементации не принимает никаких аргументов и не проводит никакой работы.

#### Properties

- Св-во `_partsArray` содержит массив инстансов [Parts](./parts.doc.md).

| Name           | Access Modifier | Type                                           | Description                 |
|----------------|-----------------|------------------------------------------------|-----------------------------|
| _partsArray    | protected       | Array<MainAbstractPart<DP, P, S, UO, US, UM>>  | Array of  MainAbstractPart  |



#### Methods

- Метод `addNewPart` принимает аргументом инстанс `MainAbstractPart` и добавляет его в массив, 
  хранящийся в св-ве `partsArray`;


- Метод `run` итерируется по `_partsArray` и запускает метод `run` у каждого инстанса, хранящегося внутри. 

| Name        | Access Modifier | Return Type  | Description                            |
|-------------|-----------------|--------------|----------------------------------------|
| addNewPart  | public          | void         | Add new AbstractUnitPart               |
| run         | public          | void         | Run all tests in each AbstractUnitPart |

