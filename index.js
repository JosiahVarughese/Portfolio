let themePreference = "";
const defaultTheme = "system";
const pathToStyles = "css/";
const stylesheetElem = document.getElementById("stylesheet");
const themeToggleElem = document.getElementById("theme-toggle-button");
const themeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

const changeStyleSheet = stylesheetName => stylesheetElem.setAttribute("href", `${pathToStyles}${stylesheetName}.css`);
const handleChangeStylesheet = event => changeStyleSheet(event.matches ? "style-dark" : "style-light");

function setThemeButtonStyle (newThemePreference) {
    themeToggleElem.classList.remove("toggle-dark", "toggle-light", "toggle-system");
    themeToggleElem.classList.add("toggle-" + newThemePreference);
}

function changeThemePreference(newThemePreference) {
    if (newThemePreference !== "system") {   
        changeStyleSheet(newThemePreference === "dark" ? "style-dark" : "style-light");
        
        if (themePreference === "system")
            themeMediaQuery.removeEventListener("change", handleChangeStylesheet);
    } else {
        handleChangeStylesheet(themeMediaQuery);
        themeMediaQuery.addEventListener("change", handleChangeStylesheet);
    }
    
    setThemeButtonStyle(newThemePreference);
    themePreference = newThemePreference;
}

function toggleColorTheme(theme) {
    if (theme) {
        changeThemePreference(theme);
    } else {
        switch(themePreference) {
            case "system":
                changeThemePreference("dark");
                break;
            case "dark":
                changeThemePreference("light");
                break;
            default:
                changeThemePreference("system");
                break;
        }
    }
}

toggleColorTheme(defaultTheme);

