import PptxGenJS from 'pptxgenjs';

const prs = new PptxGenJS();
prs.defineLayout({ name: 'LAYOUT1', width: 10, height: 5.625 });
prs.defineLayout({ name: 'LAYOUT2', width: 10, height: 7.5 });

const colors = {
  dark: '#0f172a',
  surface: '#111d35',
  cyan: '#0ea5e9',
  purple: '#8b5cf6',
  pink: '#ec4899',
  text: '#e8eff6',
  muted: '#8b95b0',
  border: '#1e2a45'
};

// Slide 1: Title/Cover
let slide = prs.addSlide();
slide.background = { color: colors.dark };
slide.addText('VitaTwin AI', {
  x: 0.5, y: 1.8, w: 9, h: 1,
  fontSize: 66, bold: true, color: colors.text,
  align: 'center', fontFace: 'Calibri'
});
slide.addText('Advanced Health Monitoring Platform', {
  x: 0.5, y: 2.9, w: 9, h: 0.6,
  fontSize: 28, color: colors.cyan,
  align: 'center', fontFace: 'Calibri'
});
slide.addText('Complete Walkthrough: Login to Features', {
  x: 0.5, y: 3.8, w: 9, h: 0.5,
  fontSize: 18, color: colors.muted,
  align: 'center', fontFace: 'Calibri'
});

// Slide 2: Login/SignUp
slide = prs.addSlide();
slide.background = { color: colors.dark };
slide.addText('Step 1: Authentication', {
  x: 0.5, y: 0.3, w: 9, h: 0.5,
  fontSize: 32, bold: true, color: colors.text, fontFace: 'Calibri'
});
slide.addShape(prs.ShapeType.rect, {
  x: 0.5, y: 1, w: 9, h: 4.2,
  fill: { color: colors.surface },
  line: { color: colors.border, width: 1 }
});
slide.addText('Login & Sign Up Page', {
  x: 1, y: 1.3, w: 8, h: 0.4,
  fontSize: 20, bold: true, color: colors.cyan, fontFace: 'Calibri'
});
slide.addText('✓ Sign In tab - Login with email & password\n✓ Sign Up tab - Create new account\n✓ Email validation & password requirements\n✓ Error handling with clear messages\n✓ Demo mode - Use any email/password (min 6 chars)', {
  x: 1, y: 1.9, w: 8, h: 2.8,
  fontSize: 14, color: colors.text, fontFace: 'Calibri',
  valign: 'top', bullet: true
});

// Slide 3: User Profile
slide = prs.addSlide();
slide.background = { color: colors.dark };
slide.addText('Step 2: User Profile Dashboard', {
  x: 0.5, y: 0.3, w: 9, h: 0.5,
  fontSize: 32, bold: true, color: colors.text, fontFace: 'Calibri'
});
slide.addShape(prs.ShapeType.rect, {
  x: 0.5, y: 1, w: 4.3, h: 4.2,
  fill: { color: colors.surface },
  line: { color: colors.border, width: 1 }
});
slide.addText('Profile Card', {
  x: 0.7, y: 1.2, w: 3.9, h: 0.3,
  fontSize: 14, bold: true, color: colors.cyan, fontFace: 'Calibri'
});
slide.addText('• Avatar with name\n• Email address\n• Premium status\n• Member since date\n• Logout button', {
  x: 0.7, y: 1.6, w: 3.9, h: 2.3,
  fontSize: 12, color: colors.text, fontFace: 'Calibri'
});

slide.addShape(prs.ShapeType.rect, {
  x: 5.2, y: 1, w: 4.3, h: 4.2,
  fill: { color: colors.surface },
  line: { color: colors.border, width: 1 }
});
slide.addText('Health Stats & Info', {
  x: 5.4, y: 1.2, w: 3.9, h: 0.3,
  fontSize: 14, bold: true, color: colors.cyan, fontFace: 'Calibri'
});
slide.addText('Health Score: 87\nRisk Level: Low\nAge: 24 years\nHeight: 5\'10"\nWeight: 72 kg\nBlood Type: O+', {
  x: 5.4, y: 1.6, w: 3.9, h: 2.3,
  fontSize: 12, color: colors.text, fontFace: 'Calibri'
});

// Slide 4: Dashboard
slide = prs.addSlide();
slide.background = { color: colors.dark };
slide.addText('Step 3: Health Dashboard', {
  x: 0.5, y: 0.3, w: 9, h: 0.5,
  fontSize: 32, bold: true, color: colors.text, fontFace: 'Calibri'
});
slide.addShape(prs.ShapeType.rect, {
  x: 0.5, y: 1, w: 9, h: 4.2,
  fill: { color: colors.surface },
  line: { color: colors.border, width: 1 }
});
slide.addText('Main Dashboard Overview', {
  x: 1, y: 1.3, w: 8, h: 0.3,
  fontSize: 16, bold: true, color: colors.cyan, fontFace: 'Calibri'
});
slide.addText('• 4 Key Metrics: Health Score, Age Estimate, Risk Level, Conditions\n• Digital Twin Status: Visual representation with organ health status\n• Organ Details: Heart (98%), Brain (96%), Lungs (94%), Immune (90%)\n• Today\'s Activity: Steps, Calories, Sleep, Stress tracking\n• Weekly Health Trend: Line chart showing heart rate & sleep patterns', {
  x: 1, y: 1.8, w: 8, h: 3,
  fontSize: 13, color: colors.text, fontFace: 'Calibri'
});

// Slide 5: Vitals Tracker
slide = prs.addSlide();
slide.background = { color: colors.dark };
slide.addText('Step 4: Vitals Tracker', {
  x: 0.5, y: 0.3, w: 9, h: 0.5,
  fontSize: 32, bold: true, color: colors.text, fontFace: 'Calibri'
});
slide.addShape(prs.ShapeType.rect, {
  x: 0.5, y: 1, w: 9, h: 4.2,
  fill: { color: colors.surface },
  line: { color: colors.border, width: 1 }
});
slide.addText('Track Your Health Metrics', {
  x: 1, y: 1.3, w: 8, h: 0.3,
  fontSize: 16, bold: true, color: colors.cyan, fontFace: 'Calibri'
});
slide.addText('Log & Monitor:', {
  x: 1, y: 1.8, w: 4, h: 0.25,
  fontSize: 13, bold: true, color: colors.cyan, fontFace: 'Calibri'
});
slide.addText('✓ Weight\n✓ Blood Pressure\n✓ Heart Rate\n✓ Mood (1-10 scale)', {
  x: 1, y: 2.1, w: 4, h: 2.5,
  fontSize: 12, color: colors.text, fontFace: 'Calibri'
});
slide.addText('Data Display:', {
  x: 5.5, y: 1.8, w: 3.5, h: 0.25,
  fontSize: 13, bold: true, color: colors.cyan, fontFace: 'Calibri'
});
slide.addText('✓ Historical tracking\n✓ Trend visualization\n✓ Health insights\n✓ Progress over time', {
  x: 5.5, y: 2.1, w: 3.5, h: 2.5,
  fontSize: 12, color: colors.text, fontFace: 'Calibri'
});

// Slide 6: Progress Dashboard
slide = prs.addSlide();
slide.background = { color: colors.dark };
slide.addText('Step 5: Progress Dashboard', {
  x: 0.5, y: 0.3, w: 9, h: 0.5,
  fontSize: 32, bold: true, color: colors.text, fontFace: 'Calibri'
});
slide.addShape(prs.ShapeType.rect, {
  x: 0.5, y: 1, w: 9, h: 4.2,
  fill: { color: colors.surface },
  line: { color: colors.border, width: 1 }
});
slide.addText('7-Day Health Trends Analysis', {
  x: 1, y: 1.3, w: 8, h: 0.3,
  fontSize: 16, bold: true, color: colors.cyan, fontFace: 'Calibri'
});
slide.addText('Track weekly progress:', {
  x: 1, y: 1.8, w: 8, h: 0.25,
  fontSize: 13, bold: true, color: colors.muted, fontFace: 'Calibri'
});
slide.addText('✓ Weight trend (line chart)\n✓ Blood pressure trends (systolic & diastolic)\n✓ Heart rate patterns\n✓ Mood tracking over 7 days\n✓ Average metrics calculation\n✓ Week-over-week comparison', {
  x: 1, y: 2.2, w: 8, h: 2.7,
  fontSize: 12, color: colors.text, fontFace: 'Calibri'
});

// Slide 7: Doctor Appointments
slide = prs.addSlide();
slide.background = { color: colors.dark };
slide.addText('Step 6: Doctor Appointments Calendar', {
  x: 0.5, y: 0.3, w: 9, h: 0.5,
  fontSize: 32, bold: true, color: colors.text, fontFace: 'Calibri'
});
slide.addShape(prs.ShapeType.rect, {
  x: 0.5, y: 1, w: 9, h: 4.2,
  fill: { color: colors.surface },
  line: { color: colors.border, width: 1 }
});
slide.addText('Schedule & Manage Appointments', {
  x: 1, y: 1.3, w: 8, h: 0.3,
  fontSize: 16, bold: true, color: colors.cyan, fontFace: 'Calibri'
});
slide.addText('Features:', {
  x: 1, y: 1.8, w: 8, h: 0.25,
  fontSize: 13, bold: true, color: colors.muted, fontFace: 'Calibri'
});
slide.addText('✓ Add new appointments\n✓ Doctor name & specialty selection\n✓ Date & time scheduling\n✓ Location & notes\n✓ Upcoming appointments list\n✓ Delete/edit appointments\n✓ Calendar view', {
  x: 1, y: 2.2, w: 8, h: 2.7,
  fontSize: 12, color: colors.text, fontFace: 'Calibri'
});

// Slide 8: Treatment Simulator
slide = prs.addSlide();
slide.background = { color: colors.dark };
slide.addText('Step 7: Treatment Simulator', {
  x: 0.5, y: 0.3, w: 9, h: 0.5,
  fontSize: 32, bold: true, color: colors.text, fontFace: 'Calibri'
});
slide.addShape(prs.ShapeType.rect, {
  x: 0.5, y: 1, w: 9, h: 4.2,
  fill: { color: colors.surface },
  line: { color: colors.border, width: 1 }
});
slide.addText('AI-Powered Treatment Prediction', {
  x: 1, y: 1.3, w: 8, h: 0.3,
  fontSize: 16, bold: true, color: colors.cyan, fontFace: 'Calibri'
});
slide.addText('Select treatment & get:', {
  x: 1, y: 1.8, w: 8, h: 0.25,
  fontSize: 13, bold: true, color: colors.muted, fontFace: 'Calibri'
});
slide.addText('✓ Effectiveness prediction (0-100%)\n✓ Likely side effects list\n✓ Drug interaction severity assessment\n✓ Estimated onset time\n✓ Cost analysis (generic vs brand)\n✓ Dosage calculator\n✓ Personalized recommendations', {
  x: 1, y: 2.2, w: 8, h: 2.7,
  fontSize: 12, color: colors.text, fontFace: 'Calibri'
});

// Slide 9: Symptom Tracker
slide = prs.addSlide();
slide.background = { color: colors.dark };
slide.addText('Step 8: Symptom Tracker', {
  x: 0.5, y: 0.3, w: 9, h: 0.5,
  fontSize: 32, bold: true, color: colors.text, fontFace: 'Calibri'
});
slide.addShape(prs.ShapeType.rect, {
  x: 0.5, y: 1, w: 9, h: 4.2,
  fill: { color: colors.surface },
  line: { color: colors.border, width: 1 }
});
slide.addText('Log & Monitor Your Symptoms', {
  x: 1, y: 1.3, w: 8, h: 0.3,
  fontSize: 16, bold: true, color: colors.cyan, fontFace: 'Calibri'
});
slide.addText('Track symptoms with:', {
  x: 1, y: 1.8, w: 8, h: 0.25,
  fontSize: 13, bold: true, color: colors.muted, fontFace: 'Calibri'
});
slide.addText('✓ Symptom name & description\n✓ Duration tracking (days, hours)\n✓ Severity rating (1-10 scale)\n✓ Associated conditions\n✓ When to see doctor alert\n✓ Symptom history\n✓ Pattern detection', {
  x: 1, y: 2.2, w: 8, h: 2.7,
  fontSize: 12, color: colors.text, fontFace: 'Calibri'
});

// Slide 10: Drug Interaction Checker
slide = prs.addSlide();
slide.background = { color: colors.dark };
slide.addText('Step 9: Drug Interaction Checker', {
  x: 0.5, y: 0.3, w: 9, h: 0.5,
  fontSize: 32, bold: true, color: colors.text, fontFace: 'Calibri'
});
slide.addShape(prs.ShapeType.rect, {
  x: 0.5, y: 1, w: 9, h: 4.2,
  fill: { color: colors.surface },
  line: { color: colors.border, width: 1 }
});
slide.addText('Check Drug Safety & Interactions', {
  x: 1, y: 1.3, w: 8, h: 0.3,
  fontSize: 16, bold: true, color: colors.cyan, fontFace: 'Calibri'
});
slide.addText('Comprehensive analysis includes:', {
  x: 1, y: 1.8, w: 8, h: 0.25,
  fontSize: 13, bold: true, color: colors.muted, fontFace: 'Calibri'
});
slide.addText('✓ Check drug interactions\n✓ Contraindication alerts\n✓ Allergy detection\n✓ Interaction severity (None, Mild, Moderate, Severe)\n✓ Alternative medication suggestions\n✓ Detailed explanation of risks\n✓ When to contact doctor', {
  x: 1, y: 2.2, w: 8, h: 2.7,
  fontSize: 12, color: colors.text, fontFace: 'Calibri'
});

// Slide 11: Digital Twin
slide = prs.addSlide();
slide.background = { color: colors.dark };
slide.addText('Step 10: Digital Twin Simulator', {
  x: 0.5, y: 0.3, w: 9, h: 0.5,
  fontSize: 32, bold: true, color: colors.text, fontFace: 'Calibri'
});
slide.addShape(prs.ShapeType.rect, {
  x: 0.5, y: 1, w: 9, h: 4.2,
  fill: { color: colors.surface },
  line: { color: colors.border, width: 1 }
});
slide.addText('Simulate Health Scenarios', {
  x: 1, y: 1.3, w: 8, h: 0.3,
  fontSize: 16, bold: true, color: colors.cyan, fontFace: 'Calibri'
});
slide.addText('Test different scenarios:', {
  x: 1, y: 1.8, w: 8, h: 0.25,
  fontSize: 13, bold: true, color: colors.muted, fontFace: 'Calibri'
});
slide.addText('✓ Weight Loss - Fitness Plan\n✓ High Stress - Work Pressure\n✓ Better Sleep - 8+ Hours\n✓ New Medication - Treatment effects', {
  x: 1, y: 2.2, w: 4.5, h: 2,
  fontSize: 12, color: colors.text, fontFace: 'Calibri'
});
slide.addText('See predicted changes:', {
  x: 5.7, y: 2.2, w: 3.3, h: 0.25,
  fontSize: 12, bold: true, color: colors.muted, fontFace: 'Calibri'
});
slide.addText('✓ Energy levels\n✓ Immunity boost\n✓ Heart health\n✓ Mental clarity', {
  x: 5.7, y: 2.6, w: 3.3, h: 1.5,
  fontSize: 11, color: colors.text, fontFace: 'Calibri'
});

// Slide 12: AI Diagnosis
slide = prs.addSlide();
slide.background = { color: colors.dark };
slide.addText('Step 11: AI Diagnosis Engine', {
  x: 0.5, y: 0.3, w: 9, h: 0.5,
  fontSize: 32, bold: true, color: colors.text, fontFace: 'Calibri'
});
slide.addShape(prs.ShapeType.rect, {
  x: 0.5, y: 1, w: 9, h: 4.2,
  fill: { color: colors.surface },
  line: { color: colors.border, width: 1 }
});
slide.addText('AI-Powered Symptom Analysis', {
  x: 1, y: 1.3, w: 8, h: 0.3,
  fontSize: 16, bold: true, color: colors.cyan, fontFace: 'Calibri'
});
slide.addText('Complete diagnosis workflow:', {
  x: 1, y: 1.8, w: 8, h: 0.25,
  fontSize: 13, bold: true, color: colors.muted, fontFace: 'Calibri'
});
slide.addText('✓ Symptom Analysis (Completed)\n✓ AI Processing (Completed)\n✓ Deep Scan (In Progress)\n✓ Cross-Check (Pending)', {
  x: 1, y: 2.2, w: 4, h: 1.8,
  fontSize: 12, color: colors.text, fontFace: 'Calibri'
});
slide.addText('Top Findings:', {
  x: 5.5, y: 2.2, w: 3.5, h: 0.25,
  fontSize: 12, bold: true, color: colors.cyan, fontFace: 'Calibri'
});
slide.addText('• Viral Pneumonia: 86%\n• Bronchitis: 45%\n• Cold/Flu: 23%\n\n+ View full report', {
  x: 5.5, y: 2.6, w: 3.5, h: 1.8,
  fontSize: 11, color: colors.text, fontFace: 'Calibri'
});

// Slide 13: Medication Reminders
slide = prs.addSlide();
slide.background = { color: colors.dark };
slide.addText('Step 12: Medication Reminders', {
  x: 0.5, y: 0.3, w: 9, h: 0.5,
  fontSize: 32, bold: true, color: colors.text, fontFace: 'Calibri'
});
slide.addShape(prs.ShapeType.rect, {
  x: 0.5, y: 1, w: 9, h: 4.2,
  fill: { color: colors.surface },
  line: { color: colors.border, width: 1 }
});
slide.addText('Never Miss a Medication', {
  x: 1, y: 1.3, w: 8, h: 0.3,
  fontSize: 16, bold: true, color: colors.cyan, fontFace: 'Calibri'
});
slide.addText('Features:', {
  x: 1, y: 1.8, w: 4, h: 0.25,
  fontSize: 13, bold: true, color: colors.muted, fontFace: 'Calibri'
});
slide.addText('✓ Add medications\n✓ Set reminder times\n✓ Dosage tracking\n✓ Browser notifications\n✓ Voice reminders', {
  x: 1, y: 2.1, w: 4, h: 2.7,
  fontSize: 12, color: colors.text, fontFace: 'Calibri'
});
slide.addText('Notifications:', {
  x: 5.5, y: 1.8, w: 3.5, h: 0.25,
  fontSize: 13, bold: true, color: colors.muted, fontFace: 'Calibri'
});
slide.addText('✓ Alert 5 min before\n✓ Text-to-speech\n✓ Visual indicators\n✓ Upcoming list\n✓ Mark as taken', {
  x: 5.5, y: 2.1, w: 3.5, h: 2.7,
  fontSize: 12, color: colors.text, fontFace: 'Calibri'
});

// Slide 14: User Settings
slide = prs.addSlide();
slide.background = { color: colors.dark };
slide.addText('Step 13: User Settings & Controls', {
  x: 0.5, y: 0.3, w: 9, h: 0.5,
  fontSize: 32, bold: true, color: colors.text, fontFace: 'Calibri'
});
slide.addShape(prs.ShapeType.rect, {
  x: 0.5, y: 1, w: 9, h: 4.2,
  fill: { color: colors.surface },
  line: { color: colors.border, width: 1 }
});
slide.addText('Personalize Your Experience', {
  x: 1, y: 1.3, w: 8, h: 0.3,
  fontSize: 16, bold: true, color: colors.cyan, fontFace: 'Calibri'
});
slide.addText('Control:', {
  x: 1, y: 1.8, w: 4, h: 0.25,
  fontSize: 13, bold: true, color: colors.muted, fontFace: 'Calibri'
});
slide.addText('✓ Notification preferences\n✓ Voice reminder toggle\n✓ Privacy settings\n✓ Data preferences', {
  x: 1, y: 2.1, w: 4, h: 2,
  fontSize: 12, color: colors.text, fontFace: 'Calibri'
});
slide.addText('Data Management:', {
  x: 5.5, y: 1.8, w: 3.5, h: 0.25,
  fontSize: 13, bold: true, color: colors.muted, fontFace: 'Calibri'
});
slide.addText('✓ Export health data\n✓ View statistics\n✓ Download as JSON\n✓ Clear data option', {
  x: 5.5, y: 2.1, w: 3.5, h: 2,
  fontSize: 12, color: colors.text, fontFace: 'Calibri'
});

// Slide 15: Key Features Summary
slide = prs.addSlide();
slide.background = { color: colors.dark };
slide.addText('Complete Feature Set', {
  x: 0.5, y: 0.3, w: 9, h: 0.5,
  fontSize: 32, bold: true, color: colors.text, fontFace: 'Calibri'
});

const features = [
  '✓ Professional Authentication System',
  '✓ Real-time Health Dashboard',
  '✓ Vitals & Weight Tracking',
  '✓ AI-Powered Diagnostics',
  '✓ Treatment Simulator with Predictions',
  '✓ Drug Interaction Checker',
  '✓ Digital Twin Simulations',
  '✓ Appointment Calendar',
  '✓ Medication Reminders with Notifications',
  '✓ Progress Analytics with Charts',
  '✓ Symptom Tracking',
  '✓ User Profile Management'
];

slide.addText(features.join('\n'), {
  x: 0.7, y: 1.1, w: 8.6, h: 4.2,
  fontSize: 14, color: colors.text, fontFace: 'Calibri',
  valign: 'top'
});

// Slide 16: Technology Stack
slide = prs.addSlide();
slide.background = { color: colors.dark };
slide.addText('Technology Stack', {
  x: 0.5, y: 0.3, w: 9, h: 0.5,
  fontSize: 32, bold: true, color: colors.text, fontFace: 'Calibri'
});
slide.addShape(prs.ShapeType.rect, {
  x: 0.5, y: 1, w: 4.3, h: 4.2,
  fill: { color: colors.surface },
  line: { color: colors.border, width: 1 }
});
slide.addText('Frontend', {
  x: 0.7, y: 1.2, w: 3.9, h: 0.3,
  fontSize: 14, bold: true, color: colors.cyan, fontFace: 'Calibri'
});
slide.addText('• React 18\n• Vite\n• Recharts\n• Lucide Icons\n• localStorage\n• Responsive CSS', {
  x: 0.7, y: 1.7, w: 3.9, h: 3.3,
  fontSize: 11, color: colors.text, fontFace: 'Calibri'
});

slide.addShape(prs.ShapeType.rect, {
  x: 5.2, y: 1, w: 4.3, h: 4.2,
  fill: { color: colors.surface },
  line: { color: colors.border, width: 1 }
});
slide.addText('Backend & AI', {
  x: 5.4, y: 1.2, w: 3.9, h: 0.3,
  fontSize: 14, bold: true, color: colors.cyan, fontFace: 'Calibri'
});
slide.addText('• Express.js\n• Ollama (Local AI)\n• Phi3, Mistral, Llama3\n• CORS enabled\n• REST API\n• Real-time Processing', {
  x: 5.4, y: 1.7, w: 3.9, h: 3.3,
  fontSize: 11, color: colors.text, fontFace: 'Calibri'
});

// Slide 17: Final Slide
slide = prs.addSlide();
slide.background = { color: colors.dark };
slide.addShape(prs.ShapeType.rect, {
  x: 0, y: 0, w: 10, h: 5.625,
  fill: { color: colors.dark }
});
slide.addText('Ready to Use', {
  x: 0.5, y: 1.8, w: 9, h: 1,
  fontSize: 56, bold: true, color: colors.cyan,
  align: 'center', fontFace: 'Calibri'
});
slide.addText('VitaTwin AI - Complete Health Platform', {
  x: 0.5, y: 3, w: 9, h: 0.5,
  fontSize: 20, color: colors.text,
  align: 'center', fontFace: 'Calibri'
});
slide.addText('Deploy now or add more features', {
  x: 0.5, y: 3.8, w: 9, h: 0.4,
  fontSize: 14, color: colors.muted,
  align: 'center', fontFace: 'Calibri'
});

prs.save({ path: '/mnt/vitatwin-complete/VitaTwin_AI_Complete_Walkthrough.pptx' });
console.log('Presentation created successfully!');
