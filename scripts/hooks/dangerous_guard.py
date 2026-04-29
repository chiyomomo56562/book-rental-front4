import sys
import re

def check_dangerous_command(command):
    patterns = [
        (r'rm\s+-rf', "rm -rf (Recursive deletion)"),
        (r'git\s+push\s+.*--force', "git push --force (Overwriting history)"),
        (r'git\s+reset\s+--hard', "git reset --hard (Losing uncommitted changes)"),
        (r'DROP\s+TABLE', "SQL DROP TABLE (Data loss)"),
        (r'DELETE\s+FROM\s+\w+$', "SQL DELETE without WHERE clause"),
    ]
    
    for pattern, label in patterns:
        if re.search(pattern, command, re.IGNORECASE | re.MULTILINE):
            return label
    return None

if __name__ == "__main__":
    # If no argument is provided, read from stdin (optional but good for piped input)
    cmd_input = sys.argv[1] if len(sys.argv) > 1 else sys.stdin.read()
    
    if not cmd_input:
        sys.exit(0)
        
    reason = check_dangerous_command(cmd_input)
    
    if reason:
        print(f"BLOCKED: 위험한 명령어가 감지되었습니다: {reason}", file=sys.stderr)
        sys.exit(1)
    
    sys.exit(0)
