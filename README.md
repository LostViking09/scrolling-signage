# 🖥️ Scrolling Signage

An elegant Electron-based solution for displaying and auto-scrolling web content. Perfect for digital signage, information displays, and dynamic content presentation.

## ✨ Features

🔄 **Smart Scrolling**
- Automatic scrolling with configurable speed and interval
- Smooth viewport-based scroll calculations

🎯 **Display Control**
- Full-screen immersive experience
- Always-on-top window behavior
- Custom zoom levels for perfect visibility
- Hide unwanted elements using CSS selectors

🔄 **Content Management**
- Periodic page reload to ensure fresh content
- Support for any web-based content

## 🚀 Usage

```bash
scrolling-signage -- --url 'http://webpage.com/' [options]
```

> [!IMPORTANT]
> You need add a blank argument (`--`) right after the executable to pass all arguments properly to Electron.

### 🎮 Command Line Options

| Option | Alias | Description | Default |
|--------|-------|-------------|---------|
| --url | -u | The URL to display. Must use format:<br> ```--url="https://example.com"``` | https://longdogechallenge.com/ (a fun scrolling demo!) |
| --scrollpercent | -s | How much to scroll each interval, as a percentage of the viewport height | 0.25 |
| --scrollinterval | -i | How often to scroll, in milliseconds | 2000 |
| --reloadinterval | -r | How often to reload the page, in minutes | 5 |
| --zoom | -z | Zoom level for the displayed content | 1.0 |
| --hideCss | -h | CSS selector for elements to hide. Must use format: <br>```--hideCss=".selector"``` | "" |
| --help | none | Display the usage guide | n/a |

### Examples

1. Display a website with default settings:
```bash
scrolling-signage --url="https://example.com"
```

2. Custom scroll settings:
```bash
scrolling-signage -u="https://example.com" -s 0.5 -i 3000
```

3. Hide elements and set zoom:
```bash
scrolling-signage -u="https://example.com" -z 1.5 -h=".ad-banner, #cookie-notice"
```

## 📝 Important Notes

- String options (like URL and CSS selectors) require equals sign and quotes
- The application runs in fullscreen mode and stays always-on-top
- The page automatically reloads at specified intervals to ensure content freshness
- Multiple CSS selectors can be combined with commas for the hideCss option
- Built with Electron for cross-platform compatibility

## 📜 License

MIT License

Copyright (c) 2024

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
