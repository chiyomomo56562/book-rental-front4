import sys
import os
import re
import json
from pathlib import Path

def extract_path(input_str):
    # Try to parse as JSON first
    try:
        data = json.loads(input_str)
        if isinstance(data, dict):
            return data.get("TargetFile") or data.get("path") or data.get("filepath")
    except:
        pass
    
    # Fallback to regex for "TargetFile": "path"
    match = re.search(r'"TargetFile":\s*"([^"]+)"', input_str)
    if match:
        return match.group(1)
    
    # Simple fallback for raw path strings
    if os.path.exists(input_str.strip()):
        return input_str.strip()
        
    return None

def is_test_file(path_str):
    p = Path(path_str)
    test_indicators = ['.test.', '.spec.', '_test', '_spec', 'test_', 'spec_']
    return any(ind in p.name.lower() for ind in test_indicators) or 'tests/' in str(p).replace('\\', '/')

def has_matching_test(path_str):
    p = Path(path_str)
    name = p.stem
    ext = p.suffix
    
    # Look for common test naming patterns
    search_patterns = [
        p.with_name(f"{name}.test{ext}"),
        p.with_name(f"{name}.spec{ext}"),
        p.parent / "tests" / f"{name}.test{ext}",
        p.parent / "tests" / f"test_{name}{ext}",
        Path("tests") / f"{name}.test{ext}",
    ]
    
    for pt in search_patterns:
        if pt.exists():
            return True
            
    # Also check if the file content itself looks like a test (though we already checked name)
    return False

if __name__ == "__main__":
    raw_input = sys.argv[1] if len(sys.argv) > 1 else sys.stdin.read()
    if not raw_input:
        sys.exit(0)
        
    target_path = extract_path(raw_input)
    
    if not target_path:
        sys.exit(0)
        
    # Check for file extension (ignore non-code files)
    ext = Path(target_path).suffix.lower()
    if ext not in ['.ts', '.tsx', '.js', '.jsx', '.py', '.java', '.go', '.rs', '.php', '.cs']:
        sys.exit(0)

    if is_test_file(target_path):
        sys.exit(0)
        
    if not has_matching_test(target_path):
        print(f"BLOCKED: TDD 위반 - '{target_path}'에 대응하는 테스트 파일이 존재하지 않습니다.", file=sys.stderr)
        print("먼저 테스트 코드를 작성하거나 구현과 함께 생성하세요.", file=sys.stderr)
        sys.exit(1)
        
    sys.exit(0)
