#!/usr/bin/env python3
import json
import re
import sys
from pathlib import Path

SCRIPT_NAME = "full_stack_hook_guard.py"

SESSION_MESSAGE = """
Follow the repository’s full-stack hook standards before editing or validating code:
- Type every React hook contract explicitly in TypeScript.
- Keep each custom hook focused on a single responsibility.
- For all data-fetching hooks, expose data, isLoading, isError, error, and refetch.
- Always include cleanup in useEffect for timers, listeners, and abortable requests.
- Keep backend code layered as Routes -> Controllers -> Business Services -> Data Access / Repositories.
- Validate payloads and sanitize incoming inputs.
- Use a standard API envelope with success, data, and error fields.
- Prefer small, auditable, deterministic changes and avoid destructive commands when a safer editor-based workflow exists.
""".strip()

DESTRUCTIVE_PATTERNS = [
    r"\brm\s+-rf\b",
    r"\bgit\s+reset\s+--hard\b",
    r"\bgit\s+clean\s+-fdx\b",
    r"\bgit\s+checkout\s+--\s+\.\b",
    r"\bdel\s+/[sq]\b",
    r"\bremove-item\s+-recurse\s+-force\b",
    r"\bformat\s+/q\b",
    r"\bmv\s+.*\s+\/(dev\/null|tmp|trash)\b",
]


def flatten(value):
    values = []

    def walk(node):
        if isinstance(node, dict):
            for key, item in node.items():
                values.append(str(key).lower())
                walk(item)
        elif isinstance(node, list):
            for item in node:
                walk(item)
        elif node is not None:
            values.append(str(node).lower())

    walk(value)
    return values


def detect_dangerous_action(payload):
    text = "\n".join(flatten(payload))
    for pattern in DESTRUCTIVE_PATTERNS:
        if re.search(pattern, text):
            return pattern
    return None


def dump_json(obj):
    print(json.dumps(obj, separators=(",", ":")))


def main():
    event_name = "SessionStart"
    payload = {}

    if len(sys.argv) >= 3 and sys.argv[1] == "--event":
        event_name = sys.argv[2]
    elif len(sys.argv) >= 2 and sys.argv[1] == "--event":
        event_name = "SessionStart"

    stdin_raw = sys.stdin.read().strip()
    if stdin_raw:
        try:
            payload = json.loads(stdin_raw)
        except json.JSONDecodeError:
            payload = {"raw": stdin_raw}

    if event_name == "SessionStart":
        dump_json({
            "continue": True,
            "systemMessage": SESSION_MESSAGE,
        })
        return 0

    if event_name == "PreToolUse":
        pattern = detect_dangerous_action(payload)
        if pattern:
            dump_json({
                "hookSpecificOutput": {
                    "hookEventName": "PreToolUse",
                    "permissionDecision": "deny",
                    "permissionDecisionReason": "This destructive command is blocked. Prefer editor-based changes and reversible Git operations instead.",
                }
            })
            return 2

        dump_json({
            "hookSpecificOutput": {
                "hookEventName": "PreToolUse",
                "permissionDecision": "allow",
            }
        })
        return 0

    dump_json({
        "continue": True,
        "systemMessage": SESSION_MESSAGE,
    })
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
