# Top 5 Copilot Agents Guide

## Quick Reference

### 1. **Explore Agent** ⚡ (Priority 1)
**When to use:** Codebase exploration and research
- Multiple independent research threads
- Cross-cutting investigations
- Finding symbols, understanding components
- Fast, lightweight model for quick discovery

**Example:** *"Find all files that reference the UserAuth class and explore how it's used"*

---

### 2. **Task Agent** 🔨 (Priority 2)
**When to use:** Running commands with output tracking
- Build, test, lint commands
- Dependency installation
- CI/CD operations
- Returns brief success summary, full output on failure

**Example:** *"Run the test suite and show me any failures"*

---

### 3. **General Purpose Agent** 🧠 (Priority 3)
**When to use:** Complex multi-step workflows
- Large refactoring tasks
- Multi-file changes with dependencies
- Detailed reasoning and problem-solving
- Full toolset availability

**Example:** *"Refactor the authentication module to use OAuth 2.0 instead of JWT"*

---

### 4. **Code Review Agent** 🔍 (Priority 4)
**When to use:** Reviewing code changes
- Analyze staged/unstaged diffs
- Find bugs and logic errors
- Security vulnerability detection
- High-confidence findings only (ignores style issues)

**Example:** *"Review my pull request for potential security issues"*

---

### 5. **Security Review Agent** 🔒 (Priority 5)
**When to use:** Security-focused investigations
- Exploit vulnerability detection
- Security audit of code
- Finding attack vectors
- **Use ONLY when explicitly requested for security**

**Example:** *"Find all security vulnerabilities in the payment processing code"*

---

## Best Practices

✅ **DO:**
- Use explore for independent research threads
- Launch multiple agents in parallel when they have separate concerns
- Wait for background agents to complete before acting on their results
- Provide complete context to agents in your instructions

❌ **DON'T:**
- Use explore for simple single lookups (use grep/glob/view directly)
- Delegate small 2-5 tool call tasks to agents
- Use security-review unless explicitly asked for security vulnerabilities
- Relaunch agents immediately after failure (do the work yourself instead)

## Configuration Location
```
.vscode/settings.json → copilot.agents.*
```

All agents are **enabled by default** and configured for optimal performance with your VS Code setup.
