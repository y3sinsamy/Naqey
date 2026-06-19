const fs = require('fs');

const files = [
  'src/app/index.tsx',
  'src/app/login.tsx',
  'src/app/onboarding/wizard.tsx',
  'src/app/(tabs)/index.tsx',
  'src/app/(tabs)/_layout.tsx',
  'src/components/onboarding/CategorySelectionStep.tsx',
  'src/components/onboarding/HowItWorksStep.tsx',
  'src/components/onboarding/PrivacyAssuranceStep.tsx',
  'src/components/ui/Button.tsx',
  'src/components/ui/Card.tsx'
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');

  if (!content.includes('Colors.light')) continue;

  console.log('Processing ' + file);

  content = content.replace(/const styles = StyleSheet\.create\(\{/g, 'const createStyles = (colors: any) => StyleSheet.create({');

  if (!content.includes('useThemeContext')) {
    content = content.replace(/import .* from '@\/constants\/theme';/, (match) => match + '\nimport { useThemeContext } from \'@/hooks/use-theme\';');
  }

  const hookInjection = '\n  const { colors } = useThemeContext();\n  const styles = React.useMemo(() => createStyles(colors), [colors]);\n';
  
  content = content.replace(/(export default function [A-Za-z0-9_]+\([^)]*\)(?:[:A-Za-z0-9_<>\s]*)?\s*\{)/g, '$1' + hookInjection);
  content = content.replace(/(export function [A-Za-z0-9_]+\([^)]*\)(?:[:A-Za-z0-9_<>\s]*)?\s*\{)/g, '$1' + hookInjection);
  
  content = content.replace(/Colors\.light/g, 'colors');

  if (!content.includes('import React')) {
    content = 'import React from \'react\';\n' + content;
  }

  fs.writeFileSync(file, content, 'utf8');
}
console.log('Done refactoring basic components');
