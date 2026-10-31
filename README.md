# 醫師回覆 APP

PDF 表單醫師回填系統的醫師端 APP（網頁 APP／PWA）。
醫師用手機開啟 → 登錄 → 承辦人核准 → 加到主畫面 → 開啟通知。
有新表單時，APP 關著也會收到推播通知。

- 網址：https://ycchen16chen.github.io/pdf-doctor-app/
- 這裡只有 APP 畫面，沒有任何病患資料或金鑰；資料都在承辦人的 Google Apps Script。
- 推播：Web Push（VAPID），由 Apps Script 直接發送，不需 Firebase。
