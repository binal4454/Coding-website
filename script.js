// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll to tutorials section
function scrollToTutorials() {
    document.getElementById('tutorials').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Tutorial selection handler
function selectTutorial(language) {
    const tutorials = {
        html: `<!-- Welcome to HTML! -->
<!DOCTYPE html>
<html>
<head>
    <title>My First Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is my first HTML page.</p>
</body>
</html>`,
        css: `/* Welcome to CSS! */
body {
    background-color: #f0f0f0;
    font-family: Arial, sans-serif;
}

h1 {
    color: #667eea;
    text-align: center;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}`,
        javascript: `// Welcome to JavaScript!
console.log("Hello, World!");

// Variables
let name = "Coder";
let age = 25;

// Functions
function greet(person) {
    return "Hello, " + person + "!";
}

console.log(greet(name));

// Arrays
let languages = ["HTML", "CSS", "JavaScript"];
console.log("Learning:", languages.join(", "));`,
        python: `# Welcome to Python!
print("Hello, World!")

# Variables
name = "Coder"
age = 25

# Functions
def greet(person):
    return f"Hello, {person}!"

print(greet(name))

# Lists
languages = ["Python", "JavaScript", "Java"]
print("Learning:", ", ".join(languages))`
    };

    const codeInput = document.getElementById('codeInput');
    if (tutorials[language]) {
        codeInput.value = tutorials[language];
        document.getElementById('practice').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Show notification
        showNotification(`${language.toUpperCase()} tutorial loaded! Try running the code.`);
    }
}

// Run code function
function runCode() {
    const code = document.getElementById('codeInput').value;
    const output = document.getElementById('output');
    
    // Clear previous output
    output.textContent = '';
    
    // Override console.log to capture output
    const logs = [];
    const originalLog = console.log;
    console.log = function(...args) {
        logs.push(args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' '));
        originalLog.apply(console, args);
    };
    
    try {
        // Execute the code
        eval(code);
        
        // Display output
        if (logs.length > 0) {
            output.textContent = logs.join('\n');
        } else {
            output.textContent = 'Code executed successfully! (No console output)';
        }
        output.style.color = '#4caf50';
    } catch (error) {
        output.textContent = `Error: ${error.message}`;
        output.style.color = '#f44336';
    } finally {
        // Restore original console.log
        console.log = originalLog;
    }
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: #667eea;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add keyboard shortcut for running code (Ctrl/Cmd + Enter)
document.getElementById('codeInput').addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        runCode();
    }
});

// Welcome message on load
window.addEventListener('load', function() {
    setTimeout(() => {
        showNotification('Welcome! Select a tutorial to start learning.');
    }, 500);
});
