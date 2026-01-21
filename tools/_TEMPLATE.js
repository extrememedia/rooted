/*
ROOTED TOOLS - SHARED STYLES & SCRIPTS
======================================
Each tool should include these base styles and the back button.
Copy this template when creating new tools.

SECURITY NOTES:
- All user input is sanitized before display
- Data stored in localStorage is validated on read
- No eval() or innerHTML with unsanitized content
- External links use rel="noopener noreferrer"
*/

/* Base Tool Styles */
const TOOL_STYLES = `
* { margin: 0; padding: 0; box-sizing: border-box; }
body { 
    min-height: 100vh; 
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%); 
    font-family: 'Segoe UI', system-ui, sans-serif; 
    color: #f8fafc; 
    line-height: 1.6;
}
.tool-container { max-width: 800px; margin: 0 auto; padding: 20px; }
.back-btn { 
    display: inline-flex; align-items: center; gap: 8px; 
    color: #7cb083; font-size: 0.9rem; padding: 10px 16px; 
    border-radius: 10px; cursor: pointer; transition: all 0.2s; 
    text-decoration: none; background: rgba(45, 90, 71, 0.2); 
    border: 1px solid rgba(45, 90, 71, 0.4); margin-bottom: 20px; 
}
.back-btn:hover { background: rgba(45, 90, 71, 0.4); color: #a8d4af; border-color: #7cb083; }
.tool-header { text-align: center; margin-bottom: 30px; }
.tool-icon { font-size: 3rem; margin-bottom: 10px; }
.tool-title { font-size: 1.8rem; color: #7cb083; margin-bottom: 5px; }
.tool-subtitle { color: #94a3b8; font-size: 0.95rem; }
.card { 
    background: rgba(30, 41, 59, 0.9); border-radius: 16px; 
    border: 1px solid rgba(124, 176, 131, 0.2); padding: 24px; margin-bottom: 20px; 
}
.btn { 
    background: linear-gradient(135deg, #2d5a47, #3d7a5f); color: white; 
    border: none; padding: 12px 24px; border-radius: 10px; 
    font-size: 1rem; cursor: pointer; transition: all 0.2s; 
}
.btn:hover { transform: translateY(-2px); box-shadow: 0 4px 20px rgba(45, 90, 71, 0.4); }
.btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
.btn-secondary { background: transparent; border: 1px solid #7cb083; color: #7cb083; }
.btn-secondary:hover { background: rgba(45, 90, 71, 0.2); }
.input-field { 
    width: 100%; padding: 12px 16px; background: rgba(15, 23, 42, 0.6); 
    border: 1px solid rgba(148, 163, 184, 0.3); border-radius: 10px; 
    color: #f8fafc; font-size: 1rem; 
}
.input-field:focus { outline: none; border-color: #7cb083; }
.progress-bar { height: 8px; background: rgba(148, 163, 184, 0.2); border-radius: 4px; overflow: hidden; }
.progress-fill { height: 100%; background: linear-gradient(90deg, #2d5a47, #7cb083); transition: width 0.3s; }
.tag { 
    display: inline-block; padding: 4px 12px; border-radius: 20px; 
    font-size: 0.8rem; margin: 4px; 
}
.tag-green { background: rgba(45, 90, 71, 0.3); color: #7cb083; }
.tag-gold { background: rgba(251, 191, 36, 0.2); color: #fbbf24; }
.empty-state { text-align: center; padding: 40px; color: #64748b; }
.list-item { 
    display: flex; align-items: center; gap: 12px; padding: 16px; 
    background: rgba(15, 23, 42, 0.4); border-radius: 10px; 
    margin-bottom: 10px; cursor: pointer; transition: all 0.2s;
    border: 1px solid transparent;
}
.list-item:hover { border-color: rgba(124, 176, 131, 0.3); background: rgba(15, 23, 42, 0.6); }
`;

/* Security: Sanitize HTML to prevent XSS */
function sanitizeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

/* Security: Validate and parse JSON safely */
function safeJSONParse(str, fallback = null) {
    try {
        return JSON.parse(str);
    } catch (e) {
        console.warn('Invalid JSON:', e);
        return fallback;
    }
}

/* Storage with validation */
function saveToolData(toolId, data) {
    try {
        const validated = JSON.stringify(data);
        localStorage.setItem(`rooted_tool_${toolId}`, validated);
        return true;
    } catch (e) {
        console.error('Save failed:', e);
        return false;
    }
}

function loadToolData(toolId, fallback = {}) {
    const data = localStorage.getItem(`rooted_tool_${toolId}`);
    return safeJSONParse(data, fallback);
}

/* Back to Rooted navigation */
function goBackToRooted() {
    localStorage.setItem('rooted_nav', 'tools');
    window.location.href = '../index.html';
}
