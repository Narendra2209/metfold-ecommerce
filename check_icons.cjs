
const fs = require('fs');
const path = require('path');
const lucide = require('lucide-react');

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, "/", file));
        }
    });

    return arrayOfFiles.filter(f => f.endsWith('.jsx') || f.endsWith('.js'));
}

const files = getAllFiles('./src');
const usedIcons = new Set();
const fileMap = {}; // Map icon to file(s)

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const lucideImports = content.match(/import\s+{([^}]+)}\s+from\s+['"]lucide-react['"]/g);

    if (lucideImports) {
        lucideImports.forEach(importStmt => {
            const match = importStmt.match(/import\s+{([^}]+)}\s+from/);
            if (match && match[1]) {
                const icons = match[1].split(',').map(i => i.trim());
                icons.forEach(iconRaw => {
                    // Handle 'Grid as GridIcon' -> 'Grid'
                    const parts = iconRaw.split(/\s+as\s+/);
                    const iconName = parts[0];
                    usedIcons.add(iconName);
                    if (!fileMap[iconName]) fileMap[iconName] = [];
                    fileMap[iconName].push(file);
                });
            }
        });
    }
});

console.log('Checking icons:', Array.from(usedIcons));

let hasError = false;
usedIcons.forEach(icon => {
    if (!lucide[icon]) {
        console.error(`ERROR: Icon "${icon}" not found in lucide-react! Used in: ${fileMap[icon].join(', ')}`);
        hasError = true;
    }
});

if (!hasError) {
    console.log('All icons found.');
}
