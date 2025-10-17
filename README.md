# Shadcn MCP

A Model Context Protocol (MCP) server that provides comprehensive access to [Shadcn/ui](https://ui.shadcn.com) component documentation, examples, and implementation guidance directly within Claude.

## Overview

This MCP server enables Claude to help developers discover, understand, and implement all 57+ Shadcn/ui components without leaving the conversation. It provides real-time access to component documentation, code examples, source code, and installation instructions through a clean, scalable architecture.

## Features

### 🛠️ Tools (2)
- **`list-shadcn-components`** - Discover all available Shadcn/ui components with URLs
- **`get-component-info(component, section?)`** - Get comprehensive information about any component

### 📚 Resources (4 URI Templates)
Access component data via `@` mentions:
- `shadcn://component/{component}/documentation` - Complete component documentation
- `shadcn://component/{component}/example` - Working code examples
- `shadcn://component/{component}/source` - Component source code from registry
- `shadcn://component/{component}/installation` - Installation instructions

### 💬 Prompts (4)
Trigger via `/` commands:
- `/implement-component component:"button"` - Step-by-step implementation guidance
- `/customize-component component:"dialog"` - Styling and customization help
- `/troubleshoot-component component:"accordion"` - Debug common issues
- `/component-best-practices component:"data-table"` - Best practices and patterns

## Supported Components

All 57+ Shadcn/ui components are supported:

Accordion, Alert, Alert Dialog, Aspect Ratio, Avatar, Badge, Breadcrumb, Button, Button Group, Calendar, Card, Carousel, Chart, Checkbox, Collapsible, Combobox, Command, Context Menu, Data Table, Date Picker, Dialog, Drawer, Dropdown Menu, Empty, Field, Form, Hover Card, Input, Input Group, Input OTP, Item, Kbd, Label, Menubar, Navigation Menu, Pagination, Popover, Progress, Radio Group, Resizable, Scroll Area, Select, Separator, Sheet, Sidebar, Skeleton, Slider, Sonner, Spinner, Switch, Table, Tabs, Textarea, Toast, Toggle, Toggle Group, Tooltip, Typography

New components added to Shadcn/ui are automatically supported without code changes.

## Installation

### Prerequisites
- [Bun](https://bun.sh) runtime
- [Claude Desktop](https://claude.ai/desktop) or compatible MCP client

### Setup

1. Clone the repository:
```bash
git clone https://github.com/StephenSHorton/shadcn-mcp.git
cd shadcn-mcp
```

2. Install dependencies:
```bash
bun install
```

3. Build the project:
```bash
bun run build
```

4. Configure Claude Desktop:

Edit the configuration file for your platform:
- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux:** `~/.config/Claude/claude_desktop_config.json`

Add the server configuration:
```json
{
  "mcpServers": {
    "shadcn-mcp": {
      "command": "/absolute/path/to/bun",
      "args": [
        "/absolute/path/to/shadcn-mcp/build/index.js"
      ]
    }
  }
}
```

**Important:** Replace paths with your actual absolute paths:
- **Find Bun:** Run `which bun` (macOS/Linux) or `where bun` (Windows)
- **Find Project:** Use the full path to where you cloned this repository
- Example macOS/Linux: `"/Users/yourname/.bun/bin/bun"` and `"/Users/yourname/projects/shadcn-mcp/build/index.js"`
- Example Windows: `"C:\\Users\\yourname\\.bun\\bin\\bun.exe"` and `"C:\\Users\\yourname\\projects\\shadcn-mcp\\build\\index.js"`

5. Restart Claude Desktop completely (fully quit the application, don't just close the window)

## Usage

### Using Tools (Proactive)

Claude can automatically call these tools based on context:

```
User: "What Shadcn components are available?"
Claude: [calls list-shadcn-components]

User: "How do I use the Button component?"
Claude: [calls get-component-info("button")]
```

### Using Resources (User-initiated)

Type `@` to see available resources, then select:
```
@shadcn-mcp:shadcn://component/button/documentation
@shadcn-mcp:shadcn://component/dialog/example
@shadcn-mcp:shadcn://component/data-table/source
```

### Using Prompts (User-initiated)

Type `/` to see available prompts, then select:
```
/implement-component component:"button"
/customize-component component:"dialog"
/troubleshoot-component component:"accordion"
/component-best-practices component:"data-table"
```

## Architecture

```
src/
├── api/
│   └── shadcn.ts              # Fetch utilities for ui.shadcn.com
├── resources/
│   └── component.ts           # Generic resource handlers (4 URI templates)
├── prompts/
│   └── component.ts           # Generic prompt handlers (4 prompts)
├── tools/
│   ├── component.ts           # Generic component info tool
│   └── list-components.ts     # List all components tool
├── lib/
│   ├── config.ts              # MCP server configuration
│   └── utils.ts               # Helper utilities
├── types.ts                   # TypeScript interfaces
└── index.ts                   # Server entry point
```

### Design Principles

- **Generic Architecture**: One set of handlers works for all 57+ components
- **Dynamic Fetching**: Always up-to-date data from ui.shadcn.com
- **URI Templates**: Scalable resource structure using MCP's template pattern
- **Parameter-based**: Prompts and tools accept component as parameter
- **Zero Maintenance**: New Shadcn components automatically supported

## Development

### Build
```bash
bun run build
```

### Development Mode
```bash
bun run dev
```

### Linting
```bash
bun run lint
```

## How It Works

1. **Discovery**: User asks about Shadcn components or uses `list-shadcn-components`
2. **Fetching**: MCP dynamically fetches data from ui.shadcn.com and the Shadcn registry
3. **Processing**: Parses HTML/JSON to extract documentation, examples, and source code
4. **Response**: Returns formatted information to Claude for user assistance

The server maintains no local cache, ensuring users always get the latest information from Shadcn/ui.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

MIT

## Links

- [Shadcn/ui Documentation](https://ui.shadcn.com)
- [Model Context Protocol](https://modelcontextprotocol.io)
- [Claude Desktop](https://claude.ai/desktop)

## Acknowledgments

Built with the [Model Context Protocol SDK](https://github.com/modelcontextprotocol/typescript-sdk) and powered by [Shadcn/ui](https://ui.shadcn.com).
