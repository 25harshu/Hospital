const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
const imgs = [
    'assets/indian_doctor_clinic_1775205719633.png',
    'assets/indian_doctor_team_1775205794199.png',
    'assets/indian_doctor_hero_1775205684985.png'
];
let i = 0;
html = html.replace(/https:\/\/images\.pexels\.com\/[^\s"']+/g, () => imgs[i++ % imgs.length]);
fs.writeFileSync('index.html', html);
console.log('Replaced successfully');
