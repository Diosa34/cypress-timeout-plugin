# cypress-timeout-plugin
Данный плагин для Cypress служит сокращению среднего времени выполнения тестов с нестабильными UI-элементами и API-запросами путем внедрения плагина, использующего спецификацию требований ко времени ожидания.

## Использование
С плагином предлагается внедрить со стороны фронтенд-разработчиков формальное определение времени ожидания для нестабильных UI-элементов и API-запросов в соответствующем файле спецификации директории cypress/spec. Важно, что фронтенд-разработчикам нет необходимости создавать заново структуру спецификации, достаточно использовать имеющеюся структуру локаторов и заменить определния локаторов на значения соответствующих таймаутов. Файл спецификации анализируется посредством плагина, затем уведомляет специалиста по тестированию о неактуальности времени ожидания, прописанного в коде тестов, формируя отчёт о несоответствиях в output.txt.
