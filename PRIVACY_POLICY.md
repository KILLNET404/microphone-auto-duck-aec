# Privacy Policy — Microphone Auto Duck + AEC

**Developer:** Dev Underground (KILLNET_404)  
**Applies to:** Chromium browser extension, version 0.7.5  
**Last updated:** 26 November 2026

[Русская версия](#политика-конфиденциальности--microphone-auto-duck--aec)

## Purpose

The extension automatically reduces the volume of supported HTML5 media players when a website uses the microphone and restores the original volume afterwards. It also requests disabling acoustic echo cancellation (AEC) in supported website-initiated microphone requests. It does not independently activate the microphone. The ON/OFF control disables automatic volume reduction, not the AEC request behavior.

## Information processed locally

- User preferences: remaining media volume (0–100%) and the enabled/disabled setting.
- Temporary microphone activity: randomly generated document-session identifiers and timestamps, updated while a supported microphone session is active. These are not account or device identifiers and are not associated with website URLs in the extension's storage.
- In-memory technical information: audio track and speech recognition session state, the reported AEC setting, and original volume levels of supported media players. The extension does not read audio samples or speech recognition results.

This information is used solely to provide the extension's audio-control functionality, coordinate microphone activity across tabs and frames, save preferences and restore volume. The extension does not record or transmit audio, transcripts, page text, browsing history, credentials, financial information or location data. No registration is required.

## Storage, retention and deletion

Preferences and temporary activity records are stored on the device using `chrome.storage.local`, not cloud synchronization. Active session timestamps expire for volume-control purposes after approximately 12 seconds without renewal. Records are normally removed when microphone use ends or when the reporting page closes. In case of an unexpected shutdown, old records can remain locally; records older than 24 hours are cleaned up at browser startup or extension installation/update. Preferences remain until changed or the extension is uninstalled. Uninstalling the extension removes its local extension storage.

## Sharing and external services

The extension does not send its locally processed information to the developer, analytics providers, advertisers or other third parties. It does not sell user data, use it for advertising or determine creditworthiness. There are no developer-operated data collection servers or remote executable code. Links to GitHub, Telegram and the support page open only when the user clicks them; those external services have their own privacy policies and may process information independently. Websites and browser services using the microphone have their own data practices, which this extension does not control.

The extension's use of information complies with the Chrome Web Store User Data Policy, including the Limited Use requirements.

## Contact and changes

For privacy questions, contact [KILLNET_404 on Telegram](https://t.me/KILLNET_404) or visit the [project repository](https://github.com/KILLNET404/microphone-auto-duck-aec). This policy will be updated if the extension's data practices change; material changes will be disclosed in accordance with Chrome Web Store requirements.

---

# Политика конфиденциальности — Microphone Auto Duck + AEC

**Разработчик:** Dev Underground (KILLNET_404)  
**Применяется к:** расширению для браузеров Chromium, версия 0.7.5  
**Последнее обновление:** 26 ноября 2026 г.

## Назначение

Расширение автоматически приглушает поддерживаемые HTML5-плееры при использовании микрофона веб-сайтом и затем восстанавливает исходную громкость. Также оно запрашивает отключение акустического эхоподавления (AEC) в поддерживаемых запросах микрофона, инициированных сайтом. Расширение самостоятельно не активирует микрофон. Переключатель ВКЛ/ВЫКЛ отключает автоматическое приглушение, но не запрос отключения AEC.

## Информация, обрабатываемая локально

- Пользовательские настройки: остаточная громкость (0–100%) и состояние ВКЛ/ВЫКЛ.
- Временные сведения об активности микрофона: случайные идентификаторы сессий документов и метки времени, обновляемые во время поддерживаемой сессии микрофона. Это не идентификаторы аккаунта или устройства; в хранилище расширения они не связаны с адресами сайтов.
- Техническая информация в оперативной памяти: состояние аудиодорожек и сеансов распознавания речи, сообщаемая настройка AEC и исходная громкость поддерживаемых медиаплееров. Расширение не считывает звуковые отсчёты и результаты распознавания речи.

Эта информация используется исключительно для управления звуком, согласования активности микрофона между вкладками и фреймами, сохранения настроек и восстановления громкости. Расширение не записывает и не передаёт аудио, расшифровки речи, текст страниц, историю посещений, учётные данные, финансовую информацию или сведения о местоположении. Регистрация не требуется.

## Хранение, сроки и удаление

Настройки и временные записи активности хранятся на устройстве в `chrome.storage.local`, без облачной синхронизации. Метки активной сессии перестают учитываться при управлении громкостью примерно через 12 секунд без обновления. При нормальном завершении использования микрофона или закрытии сообщающей страницы записи удаляются. При аварийном завершении работы записи могут остаться локально; записи старше 24 часов очищаются при запуске браузера либо установке/обновлении расширения. Настройки сохраняются до их изменения или удаления расширения. Удаление расширения очищает его локальное хранилище.

## Передача информации и внешние сервисы

Расширение не отправляет локально обрабатываемые сведения разработчику, аналитическим сервисам, рекламодателям или другим третьим лицам. Пользовательские данные не продаются и не используются для рекламы или оценки кредитоспособности. Серверы сбора данных разработчика и удалённый исполняемый код отсутствуют. Ссылки на GitHub, Telegram и страницу поддержки открываются только по нажатию пользователя; эти внешние сервисы имеют собственные политики конфиденциальности и могут самостоятельно обрабатывать информацию. Сайты и службы браузера, использующие микрофон, имеют собственные правила обработки данных, которые расширение не контролирует.

Использование информации расширением соответствует политике пользовательских данных Chrome Web Store, включая требования Limited Use (ограниченного использования).

## Контакты и изменения

По вопросам конфиденциальности обращайтесь к [KILLNET_404 в Telegram](https://t.me/KILLNET_404) или посетите [репозиторий проекта](https://github.com/KILLNET404/microphone-auto-duck-aec). При изменении порядка обработки данных политика будет обновлена; существенные изменения будут раскрыты в соответствии с требованиями Chrome Web Store.
