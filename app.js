const tg = window.Telegram.WebApp;
tg.expand();

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

  tg.sendData(JSON.stringify({
    action: "create_story",
    genre,
    lang
  }));

  tg.close();
};
