import { useEffect, useState } from "react";
import { styled } from "styled-components";

const ColorPickerWrapper = styled.div`
  --toggle-size: 3;
  --gap: 1.5;
  --radius: calc(var(--toggle-size) * .5 + var(--gap));
  --spacing: .75;

  user-select: none;
  touch-action: none;
  display: grid;
  place-items: center;
  position: fixed;
  bottom: var(--space-3);
  left: var(--space-3);
  z-index: 1;
  transition: all .5s var(--ease-out-elastic);
  
  &[data-open="true"] label {
    scale: 1;
    transition-delay: calc(var(--idx) * .05s);
    transition-duration: .5s;
    transition-timing-function: var(--ease-out-elastic);
    translate: var(--translateX) var(--translateY);
    }
    `;

const Button = styled.button`
  user-select: none;
  box-shadow: 0 0 0 1px var(--color-onPrimary);
  transition: all 0.2s ease-in-out;
  transform: scale(1);
  border: none;
  background: var(--color-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

const PaletteIcon = styled.svg`
  width: 24px;
  height: 24px;
  fill: var(--color-onPrimary);
  transform: rotate(90deg);
`;

const Label = styled.label`
    cursor: pointer;
    grid-area: 1 / 1;
    height: 2rem;
    position: absolute;
    z-index: -1;
    width: 2rem;
    --translateY: calc(cos(var(--idx) * var(--spacing) + 1.25) * var(--radius) * 1rem);
    --translateX: calc(sin(var(--idx) * var(--spacing) + 1.25) * var(--radius) * 1rem);
    scale: .5;
    transition-duration: .15s;
    transition-property: translate, scale;
    transition-timing-function: var(--ease-in-cubic);
`;

const Input = styled.input`
  appearance: none;
  background-color: var(--color-primary);
  border: 1px solid rgba(0, 0, 0, .1);
  border-radius: 50%;
  cursor: pointer;
  height: inherit;
  margin: 0;
  padding: 0;
  width: inherit;
`;

const A11yText = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

type Colors = {
  "--color-primary": string;
  "--color-onPrimary": string;
  "--color-secondary": string;
}

type ColorSet = {
  id: number
  colors: string[]
}

type ColorMap = Map<number, Colors>

const colorMap: ColorMap = new Map([
  [1, {
    "--color-primary": "#FFFFFF",
    "--color-onPrimary": "#363636",
    "--color-secondary": "#D2D2D2"
  }],
  [2, {
    "--color-primary": "#3C0350",
    "--color-onPrimary": "#D3B1C0",
    "--color-secondary": "#E7437F"
  }],
  [3, {
    "--color-primary": "#37AF5D",
    "--color-onPrimary": "#C6FF00",
    "--color-secondary": "#005319"
  }],
  [4, {
    "--color-primary": "#0779FF",
    "--color-onPrimary": "#4ACDFC",
    "--color-secondary": "#002180"
  }],
  [5, {
    "--color-primary": "#8CA1F4",
    "--color-onPrimary": "#5345EF",
    "--color-secondary": "#132890"
  }],
]);


export default function ColorPicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColorMapId, setSelectedColorMapId] = useState(1);
  const [availableColors, setAvailableColors] = useState([] as ColorSet[]);

  function pushColorMapValuesToArray(value: Colors, key: number, map: ColorMap) {
    if (key === selectedColorMapId) return;
    setAvailableColors((availableColors) => [...availableColors, { id: key, colors: Object.values(value) }]);
  }

  useEffect(() => {
    colorMap.forEach(pushColorMapValuesToArray);
  }, [])

  useEffect(() => {
    const colors = colorMap.get(selectedColorMapId);
    if (colors) {
      document.documentElement.style.setProperty('--color-primary', colors['--color-primary']);
      document.documentElement.style.setProperty('--color-onPrimary', colors['--color-onPrimary']);
      document.documentElement.style.setProperty('--color-secondary', colors['--color-secondary']);
    }
  }, [selectedColorMapId]);

  const handlePaletteButtonClick = () => {
    setIsOpen(!isOpen);
  }

  const handleColorClick = (id: number) => {
    const previousSelectedId = selectedColorMapId;
    setSelectedColorMapId(id);
    setIsOpen(false);

    // remove currently selected scheme from availableColors
    const tempArray = [...availableColors];
    const filteredArray = tempArray.filter((c) => c.id !== id);

    // add previously selected scheme to availableColors
    const colorValues: Colors | undefined = colorMap.get(previousSelectedId);
    if (colorValues) {
      filteredArray.push({ id: previousSelectedId, colors: Object.values(colorValues) })
    }
    setAvailableColors(filteredArray);
  }

  return (
    <ColorPickerWrapper data-open={isOpen}>
      <Button onClick={handlePaletteButtonClick} title="Pick color">
        <PaletteIcon xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M12.433 10.07C14.133 10.585 16 11.15 16 8a8 8 0 1 0-8 8c1.996 0 1.826-1.504 1.649-3.08-.124-1.101-.252-2.237.351-2.92.465-.527 1.42-.237 2.433.07M8 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m4.5 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3M5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
        </PaletteIcon>
      </Button>

      {availableColors.map((colorSet, idx) => {
        return (
          <Label key={colorSet.id} htmlFor={colorSet.id.toString()} style={{ "--idx": idx } as React.CSSProperties} onClick={() => handleColorClick(colorSet.id)}>
            <Input type="radio" value={colorSet.id.toString()} id={colorSet.id.toString()} name={colorSet.id.toString()} style={{ "--color-primary": colorSet.colors[0] } as React.CSSProperties} />
            <A11yText>Color {colorSet.colors[0]}</A11yText>
          </Label>
        )
      })}
    </ColorPickerWrapper >
  )
}
