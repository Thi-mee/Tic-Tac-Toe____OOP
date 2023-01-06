const colorBtn = document.getElementById('color-btn')
let isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
let themeArray, accentArray;
const root = document.documentElement

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    isDarkMode = event.matches ? true : false;
});

{
    let i = 0;
    colorBtn.addEventListener('click', () => {
        if(isDarkMode) {
            themeArray = [
                "#251918",
                "#1F2933",
                "#102A43",
                "#330033",
                "#2a1010"
            ]
            accentArray = [
                "#3b3ac5",
                "#d86327",
                "#d86327",
                "#643d9a",
                "#d86327"
            ]
        }
        else{
            themeArray = [
                "#ffe6ff",
                "#ccd9ff",
                "#ffcccc",
                "#ccffcc",
                "#b3ffff"
            ]
            accentArray = [
                "#9c0097",
                "#1221c4",
                "#a9464d",
                "#FF82FF",
                "#ee4d4d"
            ]
        }
        
        root.style.setProperty('--bg-color', `${themeArray[i]}`)
        root.style.setProperty('--accent-color', `${accentArray[i]}`)
        i++;
        
        if(i == themeArray.length){ i = 0;}
    })
}




// root.addEventListener("mousemove", e => {
//   root.style.setProperty('--mouse-x', e.clientX + "px");
//   root.style.setProperty('--mouse-y', e.clientY + "px");
// });

