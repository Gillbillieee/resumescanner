function scanResume() {
  const resume = document.getElementById('resume').value.trim();
  const jobDesc = document.getElementById('jobDesc').value.trim();
  
  if (!resume) { alert('Please paste your resume'); return; }
  
  let score = 50; // Base score
  const issues = [];
  
  // Check for common ATS requirements
  if (resume.includes('email') || resume.includes('@')) {
    score += 10;
    issues.push({ type: 'good', text: '✅ Contact information found' });
  } else {
    issues.push({ type: 'bad', text: '❌ Missing contact information (email, phone)' });
  }
  
  if (resume.match(/[0-9]+%/) || resume.match(/\$\d+/)) {
    score += 15;
    issues.push({ type: 'good', text: '✅ Quantifiable achievements included' });
  } else {
    issues.push({ type: 'warn', text: '⚠️ Add numbers/percentages to show impact' });
  }
  
  if (resume.split('\n').filter(l => l.trim().length > 0).length > 10) {
    score += 5;
    issues.push({ type: 'good', text: '✅ Good length and structure' });
  } else {
    issues.push({ type: 'warn', text: '⚠️ Resume may be too short. Add more details.' });
  }
  
  // Check for action verbs
  const actionVerbs = ['led', 'managed', 'created', 'developed', 'implemented', 'increased', 'reduced'];
  const foundVerbs = actionVerbs.filter(v => resume.toLowerCase().includes(v));
  if (foundVerbs.length >= 3) {
    score += 10;
    issues.push({ type: 'good', text: `✅ Strong action verbs used (${foundVerbs.slice(0,3).join(', ')})` });
  } else {
    issues.push({ type: 'warn', text: '⚠️ Use more action verbs (led, managed, created, etc.)' });
  }
  
  // Check for keywords matching job description
  if (jobDesc) {
    const jobWords = jobDesc.toLowerCase().split(/\s+/).filter(w => w.length > 4);
    const resumeWords = resume.toLowerCase().split(/\s+/);
    const matches = jobWords.filter(w => resumeWords.includes(w));
    const matchRate = matches.length / Math.max(jobWords.length, 1);
    
    if (matchRate > 0.3) {
      score += 15;
      issues.push({ type: 'good', text: `✅ Good keyword match (${Math.round(matchRate*100)}%)` });
    } else {
      issues.push({ type: 'bad', text: `❌ Low keyword match. Add more relevant terms.` });
    }
  }
  
  // Check for skills section
  if (resume.toLowerCase().includes('skills') || resume.toLowerCase().includes('technologies')) {
    score += 10;
    issues.push({ type: 'good', text: '✅ Skills section found' });
  } else {
    issues.push({ type: 'warn', text: '⚠️ Add a dedicated skills section' });
  }
  
  // Cap score at 100
  score = Math.min(100, Math.max(0, score));
  
  // Display results
  document.getElementById('scoreNumber').textContent = score;
  document.getElementById('scoreNumber').style.color = score >= 70 ? '#16a34a' : score >= 50 ? '#d97706' : '#dc2626';
  
  const issuesContainer = document.getElementById('issues');
  issuesContainer.innerHTML = '';
  issues.forEach(issue => {
    const div = document.createElement('div');
    div.className = `issue ${issue.type}`;
    div.textContent = issue.text;
    issuesContainer.appendChild(div);
  });
  
  document.getElementById('result').style.display = 'block';
}
