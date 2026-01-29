const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

// Проверка, что открыто из Telegram
if (!tg.initDataUnsafe || !tg.initDataUnsafe.user) {
  alert("Open this app from Telegram");
  throw new Error("Not opened from Telegram");
}

// language from URL
const params = new URLSearchParams(window.location.search);
const lang = params.get('lang') || 'en';

const i18n = {
  ru: {
    title: "Создай сказку",
    button: "Готово"
  },
  en: {
    title: "Create a story",
    button: "Done"
  }
};

document.getElementById("title").innerText = i18n[lang].title;
document.getElementById("createBtn").innerText = i18n[lang].button;

document.getElementById("createBtn").onclick = () => {
  const genre = document.getElementById("genre").value;

  const payload = {
    action: "create_story",
    genre,
    lang,
    user_id: tg.initDataUnsafe.user.id
  };

  console.log("Sending to bot:", payload);

  fetch("https://lisovaia.app.n8n.cloud/webhook-test/telegram-dl-miniapp", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    action: "create_story",
    genre,
    lang,
    user_id: tg.initDataUnsafe.user.id,
    initData: tg.initData
  })
});
  tg.close();
};
