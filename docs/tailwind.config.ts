import { TailwindPreset } from "@newsware/ui"
import { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
		"./node_modules/@newsware/ui/dist/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [TailwindPreset],
  safelist: ["pl-1", "pl-2", "pl-3", "pl-3", "pl-4", "pl-5", "pl-6"],
}

export default config