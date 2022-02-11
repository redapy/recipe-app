import "./ThemeSelector.css";
import useTheme from "../hooks/useTheme";
import modeIcon from "../assests/mode-icon.svg"
const themeColors = ["#58249c", "#249c6b", "#b70233"];


const ThemeSelector = () => {
  const { changeColor, changeMode, mode } = useTheme();

  const toggle = () => {
    changeMode(mode === "dark" ? "light" : "dark");
  };
  return (
    <div data-testid='selector-component' className="theme-selector">
      <div className="mode-toggle">
        <img
          onClick={toggle}
          src={modeIcon}
          style={{ filter: mode === "dark" ? "invert(100%)" : "invert(20%)" }}
          alt="dark/light toggle icon"
        />
      </div>
      <div className="theme-buttons">
        {themeColors.map((color) => (
          <div
            key={color}
            onClick={() => changeColor(color)}
            style={{ background: color }}
          />
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
