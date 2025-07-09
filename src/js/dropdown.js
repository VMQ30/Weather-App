export function setDropDown(){
    const settings = document.querySelector('.settings');
    const settingDroppdown = document.querySelector('.settings-box');

    settings.addEventListener("mouseenter", () => {
        settingDroppdown.classList.add('visible')
    })

    settings.addEventListener('mouseleave', () => {
        settingDroppdown.classList.remove('visible')
    })

    settingDroppdown.addEventListener("mouseenter", () => {
        settingDroppdown.classList.add('visible')
    })

    settingDroppdown.addEventListener('mouseleave', () => {
        settingDroppdown.classList.remove('visible')
    })
}