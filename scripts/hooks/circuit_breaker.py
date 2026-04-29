import sys
import os
import json
import time

STATE_FILE = os.path.join(".gemini", "hooks_state.json")

def get_state():
    if os.path.exists(STATE_FILE):
        try:
            with open(STATE_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except:
            pass
    return {"errors": []}

def save_state(state):
    os.makedirs(os.path.dirname(STATE_FILE), exist_ok=True)
    try:
        with open(STATE_FILE, 'w', encoding='utf-8') as f:
            json.dump(state, f, indent=2, ensure_ascii=False)
    except Exception as e:
        print(f"DEBUG: Failed to save state: {e}", file=sys.stderr)

def clean_old_errors(errors, window=60):
    now = time.time()
    return [e for e in errors if now - e['timestamp'] < window]

if __name__ == "__main__":
    # Expecting exit code (GEMINI_TOOL_EXIT_CODE)
    exit_code_str = sys.argv[1] if len(sys.argv) > 1 else "0"
    try:
        exit_code = int(exit_code_str)
    except ValueError:
        exit_code = 0
        
    # Expecting error output (GEMINI_TOOL_ERROR)
    error_msg = sys.argv[2] if len(sys.argv) > 2 else ""
    
    # If successful, we don't need to do anything (or we could clear history)
    if exit_code == 0:
        sys.exit(0)
        
    state = get_state()
    state['errors'] = clean_old_errors(state['errors'])
    
    # Signature of the error (first 100 chars and tool name if available)
    norm_error = error_msg.strip()[:100]
    
    if not norm_error:
        norm_error = f"Unknown error (code {exit_code})"
    
    state['errors'].append({
        "timestamp": time.time(),
        "error": norm_error
    })
    
    # Count occurrences of this specific error signature in the last 60s
    recent_count = sum(1 for e in state['errors'] if e['error'] == norm_error)
    
    save_state(state)
    
    if recent_count >= 5:
        print("\n" + "!"*60, file=sys.stderr)
        print("  [CIRCUIT BREAKER TRIGGERED]", file=sys.stderr)
        print(f"  동일한 에러가 60초 내에 {recent_count}번 반복되었습니다.", file=sys.stderr)
        print("  무한 루프 방지를 위해 작업을 중단합니다. 전략을 변경하세요.", file=sys.stderr)
        print("!"*60 + "\n", file=sys.stderr)
        sys.exit(1)
        
    sys.exit(0)
