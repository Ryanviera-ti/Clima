document.querySelector(".busca").addEventListener("submit", async (e) => {
  e.preventDefault();
  let search = document.querySelector("#searchInput").value;

  if (search !== "") {
    cleanScreen();
    warning("Carregando...");

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
      search
    )}&appid=60fc4988fd5faaf4d089fe20c8447acd&units=metric&lang=pt_br}`;
    let req = await fetch(url);
    let json = await req.json();

    if (json.cod === 200) {
      warning("");
      assembleObject({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        windAgle: json.wind.deg,
      });
    } else {
      cleanScreen();
      warning("Não encontramos essa localidade....");
    }
  } else {
    cleanScreen();
  }

  function warning(msg) {
    document.querySelector(".aviso").innerHTML = msg;
  }

  function assembleObject(json) {
    document.querySelector(".resultado").style.display = "block";
    document.querySelector(
      ".titulo"
    ).innerHTML = `${json.name}, ${json.country}`;
    document.querySelector(
      ".tempInfo"
    ).innerHTML = `${json.temp} <sup>ºC</sup>`;
    document
      .querySelector(".imgTemp")
      .setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`
      );
    document.querySelector(
      ".ventoInfo"
    ).innerHTML = `${json.windSpeed} <span>km/h</span>`;
    document.querySelector(".ventoPonto").style.transform = `rotate(${
      json.windAgle - 90
    }deg)`;
  }

  function cleanScreen() {
    warning("");
    document.querySelector(".resultado").style.display = "none";
  }
});
