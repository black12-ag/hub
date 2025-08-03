#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Simple syntax validation for key files
const filesToCheck = [
  'App.tsx',
  'src/components/WebViewScreen.tsx',
  'src/components/LoadingScreen.tsx',
  'src/components/ErrorScreen.tsx',
  'src/utils/networkUtils.ts',
];

console.log('🔍 Checking React Native code syntax...\n');

let hasErrors = false;

filesToCheck.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ File not found: ${file}`);
    hasErrors = true;
    return;
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Basic syntax checks
    const openBraces = (content.match(/{/g) || []).length;
    const closeBraces = (content.match(/}/g) || []).length;
    const openParens = (content.match(/\(/g) || []).length;
    const closeParens = (content.match(/\)/g) || []).length;
    const openBrackets = (content.match(/\[/g) || []).length;
    const closeBrackets = (content.match(/\]/g) || []).length;
    
    if (openBraces !== closeBraces) {
      console.log(`❌ ${file}: Mismatched braces (${openBraces} open, ${closeBraces} close)`);
      hasErrors = true;
    } else if (openParens !== closeParens) {
      console.log(`❌ ${file}: Mismatched parentheses (${openParens} open, ${closeParens} close)`);
      hasErrors = true;
    } else if (openBrackets !== closeBrackets) {
      console.log(`❌ ${file}: Mismatched brackets (${openBrackets} open, ${closeBrackets} close)`);
      hasErrors = true;
    } else {
      console.log(`✅ ${file}: Basic syntax checks passed`);
    }
    
  } catch (error) {
    console.log(`❌ ${file}: Error reading file - ${error.message}`);
    hasErrors = true;
  }
});

console.log('\n📋 Summary:');
if (hasErrors) {
  console.log('❌ Some issues found. Please review the errors above.');
  process.exit(1);
} else {
  console.log('✅ All basic syntax checks passed!');
  console.log('🚀 The React Native code appears to be ready for compilation.');
}
