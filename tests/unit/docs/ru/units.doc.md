## Units

Главный модуль тестирования для каждого компонента.

Инициализирует перечень [Utils](./utils.doc.md), помогающих при написании тестов.

Инициализирует инстанс [Sturecture](./structures.doc.md),
позволяющий хранить в себе [Parts](./parts.doc.md) и поочередно запускать их.


### 1. MainUnit(abstract) [go to file](../../prototypes/main.unit.ts)

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

- Аргумент конструктора `options` представляет собой набор из 3 инстансов [Utils](./utils.doc.md) классов и 
  опционального инстанса [Sturecture](./structures.doc.md).

| Name    | Type                                         | Description                |
|---------|----------------------------------------------|----------------------------|
| options | IMainUnitConstructor<DP, P, S, UO, US, UM>   | Module utils and structure |

#### Properties

- Св-во `_options` содержит инстанс `MainOptionsUtil`. Отвечает за хранение `defaultComponentProps`
  и `defaultTestOptions`.
  Предоставляет публичный метод `getWrapperOptions`. Передается в каждый [Part](./parts.doc.md) при создании;


- Св-во `_styler` содержит инстанс `MainStylerUtil`. Отвечает за хранение `wrapperClass`.
  Предоставляет публичные методы `getChildClass` и `getChildClassName`. Передается в каждый [Part](./parts.doc.md) при создании;


- Св-во `_mounter` содержит инстанс `MainMounterUtil`. Отвечает за хранение `component`.
  Предоставляет публичные методы `mount` и `shallowMount`. Передается в каждый [Part](./parts.doc.md) при создании;


- Св-во `_unitParts` содержит инстанс `MainPartsStructure`. Отвечает за хранение `partsArray`.
  Предоставляет публичный метод `addNewPart`.

| Name        | Access Modifier | Type                                      | Description        |
|-------------|-----------------|-------------------------------------------|--------------------|
| _options    | private         | UO                                        | option utility     |
| _styler     | private         | US                                        | styler utility     |
| _mounter    | private         | UM                                        | mounter utility    |
| _unitParts  | protected       | MainPartsStructure<DP, P, S, UO, US, UM>  | keeping unit parts |


#### Methods

- Метод `addNewTestPart` принимает в себя `callback` функцию, возвращающую `MainAbstractPart`.
  С помощью вызова `callback` функции с `payload` в виде своих [Utils](./utils.doc.md) создается инстанс `MainAbstractPart`,
  который передается в `_unitParts` с помощью его публичного метода `addNewPart`.

- Метод `run` вызывает метод `run` у `unitParts` , 
  в результате чего происходит запуск тестов внутри каждого добавленного [Part](./parts.doc.md).
  Вызов этого метода подразумевается после добавления всех нужных [Part](./parts.doc.md) с помощью метода `addNewTestPart`.

| Name           | Access Modifier | Return Type  | Description                            |
|----------------|-----------------|--------------|----------------------------------------|
| addNewTestPart | public          | void         | Add new AbstractUnitPart               |
| run            | public          | void         | Run all tests in each AbstractUnitPart |
