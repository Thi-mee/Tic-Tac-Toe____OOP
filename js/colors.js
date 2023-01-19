const colorBtn = document.getElementById('color-btn')
let isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
let themeArray, accentArray, darkThemeArray, darkThemeAccentArray;
const root = document.documentElement;

themeArray = [
    "#fbfff0",
    "#ffe6ff",
    "#ccd9ff",
    "#ffcccc",
    "#ccffcc",
    "#b3ffff"
]
accentArray = [
    "#2e217b",
    "#9c0097",
    "#1221c4",
    "#a9464d",
    "#FF82FF",
    "#ee4d4d"
]
darkThemeArray = [
    "#232334",
    "#251918",
    "#1F2933",
    "#102A43",
    "#330033",
    "#2a1010"
]
darkThemeAccentArray = [
    "#ff5e00",
    "#3b3ac5",
    "#d86327",
    "#d86327",
    "#643d9a",
    "#d86327"
]

if (isDarkMode) {
    root.style.setProperty('--bg-color', `${darkThemeArray[0]}`)
    root.style.setProperty('--accent-color', `${darkThemeAccentArray[0]}`)
}
else {
    root.style.setProperty('--bg-color', `${themeArray[0]}`)
    root.style.setProperty('--accent-color', `${accentArray[0]}`)
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    isDarkMode = event.matches ? true : false;
    if (isDarkMode) {
        root.style.setProperty('--bg-color', `${darkThemeArray[0]}`)
        root.style.setProperty('--accent-color', `${darkThemeAccentArray[0]}`)
    }
    else {
        root.style.setProperty('--bg-color', `${themeArray[1]}`)
        root.style.setProperty('--accent-color', `${accentArray[1]}`)
    }
});


var i = 1;
colorBtn.addEventListener('click', () => {
    if (isDarkMode) {
        root.style.setProperty('--bg-color', `${darkThemeArray[i]}`)
        root.style.setProperty('--accent-color', `${darkThemeAccentArray[i]}`)
    }
    else {
        root.style.setProperty('--bg-color', `${themeArray[i]}`)
        root.style.setProperty('--accent-color', `${accentArray[i]}`)
    }

    i++;
    if (i == themeArray.length) { i = 0; }
})

