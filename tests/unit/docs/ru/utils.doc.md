## Utils

Классы, содержащие в себе функцонал, помогающий в тестировании компонентов.

Создаются в конструкторе подклассов `MainUnit` и передаются в `super` в виде инстансов.

Все `Utils` доступны внутри [Parts](./parts.doc.md), относящихся к модулю, в котором они созданы.


### 1. MainOptionsUtil [go to file](../../prototypes/utils/main.options.util.ts)

Модуль, реализующий базовый функционал взаимодействия с опциями.

Может быть использован для расширения через создание подклассов.

#### Generic types

Модуль принимает в себе `generic type` `<DP>`, который отвечает за типизацию `Props`, имеющих `default` значения.

Модуль принимает в себе `generic type` `<P>`, который отвечает за типизацию `required props`.
Этот тип должны наследоваться от `Partial<DP>`.

Модуль принимает в себе `generic type` `<S>`, который отвечает за типизацию `slots`.
Этот тип должен наследоваться от `ISlots`.

#### Constructor

- Аргумент конструктора `options` содержит `defaultComponentProps` и `defaultTestOptions`.


| Name    | Type                                      | Description          |
|---------|-------------------------------------------|----------------------|
| options | IMainOptionsUtilConstructor<DP, P, S>     | Default util options |

#### Properties

- Св-во `_defaultComponentProps` содержит в себе дефолтные значения `props`, заданные внутри компонента `Vue`.

- Св-во `_defaultTestOptions` содержит в себе дефолтные значения `options`,
  которые будут передаваться при каждом монтировании компонента

| Name                   | Access Modifier | Type                    | Description                            |
|------------------------|-----------------|-------------------------|----------------------------------------|
| _defaultComponentProps | protected       | DP                      | default component props                |
| _defaultTestOptions    | protected       | IWrapperOptions<P, S>   | default options for component mounting |


#### Methods

- Метод `getWrapperOptions` принимает опции для монтирования `VueWrapper` 
  и объединяет их с дефолтными значениями `options` из св-ва `_defaultTestOptions`.
  Для объединения используется библиотека `lodash.merge`.
  Если опции не были переданы, то сразу возвращает значение `_defaultTestOptions`.


| Name                 | Access Modifier | Return Type              | Description                         |
|----------------------|-----------------|--------------------------|-------------------------------------|
| getWrapperOptions    | public          | IWrapperOptions<P, S>    | create options for wrapper mounting |


### 2. MainStylerUtil [go to file](../../prototypes/utils/main.styler.util.ts)

Модуль, реализующий базовый функционал взаимодействия со стилями компонента.

Может быть использован для расширения через создание подклассов.

В базовой реализации подразумевает использование на проекте методологии `BEM` при написании стилей. 

Например, если компонент содержит стили, определяемые с помощью `computed` св-ва,
то можно создать подкласс `ExamplemStylerUtil`, наследующийся от `MainStylerUtil` и
реализовать подобную логику там в виде метода. 
Таким образом будет удобно вызывать этот метод внутри любого `test case` и
сравнивать возвращаемое значение с текущими стилями смонтированного компонента или его части. 

#### Constructor

- Аргумент конструктора `options` содержит `wrapperClass`.


| Name    | Type                       | Description          |
|---------|----------------------------|----------------------|
| options | MainStylerUtilConstructor  | Default util options |

#### Properties

- Св-во `_wrapperClass` содержит в себе строку с названием класса главного блока по `BEM`.

| Name                | Access Modifier | Type                      | Description                |
|---------------------|-----------------|---------------------------|----------------------------|
| _wrapperClass       | protected       | string                    | main block className (BEM) |


#### Methods

- Метод `getChildClassName` принимает аргументом объект, содержащий в себе опциональные св-ва `element` и `modifier` в виде строк.
  Возвращает строку в виде класса по `BEM` без символа `.` в начале. 
  Соединяет `_wrapperClass` с `element` и `modifier` из аргумента.
  Реализована гибкая логика, учитывающая возможность отсутствия `element` или `modifier`.


- Метод `getChildClass` принимает аргументом объект, содержащий в себе опциональные св-ва `element` и `modifier` в виде строк.
  Возвращает строку в виде класса по `BEM` с символом `.` в начале.
  Использует внутри метод `getChildClassName`.


| Name              | Access Modifier | Return Type | Description                               |
|-------------------|-----------------|-------------|-------------------------------------------|
| getChildClassName | public          | string      | returns BEM className without dot symbol  |
| getChildClass     | public          | string      | returns BEM className with dot symbol     |


### 3. MainMounterUtil [go to file](../../prototypes/utils/main.mounter.util.ts)

Модуль, реализующий базовый функционал монтирования компонентов в виде `VueWrapper`.

Может быть использован для расширения через создание подклассов.

#### Generic types

Модуль принимает в себе `generic type` `<DP>`, который отвечает за типизацию `Props`, имеющих `default` значения.

Модуль принимает в себе `generic type` `<P>`, который отвечает за типизацию `required props`.
Этот тип должны наследоваться от `Partial<DP>`.

Модуль принимает в себе `generic type` `<S>`, который отвечает за типизацию `slots`.
Этот тип должен наследоваться от `ISlots`.

#### Constructor

- Аргумент конструктора `options` содержит `defaultTestOptions`, `component` и `wrapperClass`.


| Name    | Type                           | Description          |
|---------|--------------------------------|----------------------|
| options | IMounterConstructor<DP, P, S>  | Default util options |

#### Properties

- Св-во `_defaultTestOptions` содержит в себе дефолтные значения `options`,
  которые будут передаваться для монтирования компонента.


- Св-во `_component` содержит в себе компонент, который будет тестироваться модулем.


- Св-во `_wrapperClass` содержит в себе строку с названием класса главного блока по `BEM`.

| Name                | Access Modifier | Type                         | Description                            |
|---------------------|-----------------|------------------------------|----------------------------------------|
| _defaultTestOptions | protected       | IWrapperOptions<P, S>        | default options for component mounting |
| _component          | protected       | DefineComponent<{}, {}, any> | component                              |
| _wrapperClass       | protected       | string                       | main block className (BEM)             |


#### Methods

- Метод `mount` принимает опции для монтирования `VueWrapper`
  Если опции не были переданы, то монтирует компонент, используя `_defaultTestOptions`.
  Использует внутри себя `mount` из `@vue/test-utils`


- Метод `shallowMount` принимает опции для монтирования `VueWrapper`
  Если опции не были переданы, то монтирует компонент, используя `_defaultTestOptions`.
  Использует внутри себя `shallowMount` из `@vue/test-utils`

Подробнее об отличии этих методов можете прочитать в официальной документации https://test-utils.vuejs.org

| Name          | Access Modifier | Return Type   | Description        |
|---------------|-----------------|---------------|--------------------|
| mount         | public          | VueWrapper    | create VueWrapper  |
| shallowMount  | public          | VueWrapper    | create VueWrapper  |
