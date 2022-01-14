

export const MP = ak => new Promise((resolve, reject) => {
    window.onload = function () {
      resolve(BMap)
    }
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `http://api.map.baidu.com/api?v=3.0&ak=${ak}&callback=init`;
    script.onerror = reject;
    document.head.appendChild(script);
  })  