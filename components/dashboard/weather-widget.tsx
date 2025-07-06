"use client"

import { useState } from "react"
import { Cloud, CloudRain, Sun, Thermometer } from "lucide-react"

export function WeatherWidget() {
  const [currentDay, setCurrentDay] = useState(0)

  const weatherData = [
    {
      day: "Today",
      temp: 32,
      condition: "Sunny",
      humidity: 45,
      wind: 12,
      icon: <Sun className="h-8 w-8 text-yellow-500" />,
    },
    {
      day: "Tomorrow",
      temp: 30,
      condition: "Partly Cloudy",
      humidity: 50,
      wind: 10,
      icon: <Cloud className="h-8 w-8 text-gray-400" />,
    },
    {
      day: "Wednesday",
      temp: 28,
      condition: "Rain",
      humidity: 75,
      wind: 15,
      icon: <CloudRain className="h-8 w-8 text-blue-500" />,
    },
    {
      day: "Thursday",
      temp: 29,
      condition: "Cloudy",
      humidity: 60,
      wind: 8,
      icon: <Cloud className="h-8 w-8 text-gray-400" />,
    },
    {
      day: "Friday",
      temp: 31,
      condition: "Sunny",
      humidity: 40,
      wind: 5,
      icon: <Sun className="h-8 w-8 text-yellow-500" />,
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {weatherData[currentDay].icon}
          <div>
            <h3 className="text-2xl font-bold">{weatherData[currentDay].temp}°C</h3>
            <p className="text-sm text-muted-foreground">{weatherData[currentDay].condition}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">Pune, Maharashtra</p>
          <p className="text-xs text-muted-foreground">Updated 10 mins ago</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center gap-2">
          <Thermometer className="h-4 w-4 text-muted-foreground" />
          <span>Humidity: {weatherData[currentDay].humidity}%</span>
        </div>
        <div className="flex items-center gap-2">
          <Cloud className="h-4 w-4 text-muted-foreground" />
          <span>Wind: {weatherData[currentDay].wind} km/h</span>
        </div>
      </div>

      <div className="flex justify-between pt-4 border-t">
        {weatherData.map((day, index) => (
          <button
            key={index}
            className={`flex flex-col items-center gap-1 p-2 rounded-md transition-colors ${
              currentDay === index ? "bg-green-50 text-green-700" : ""
            }`}
            onClick={() => setCurrentDay(index)}
          >
            <span className="text-xs font-medium">{day.day}</span>
            {day.icon}
            <span className="text-xs">{day.temp}°</span>
          </button>
        ))}
      </div>
    </div>
  )
}
