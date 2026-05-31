function analyzeProtein(){

let seq =
document.getElementById("sequence")
.value
.toUpperCase()
.replace(/\s/g,'');

const aaWeights = {

A:89.09,
R:174.20,
N:132.12,
D:133.10,
C:121.15,
Q:146.15,
E:147.13,
G:75.07,
H:155.16,
I:131.17,
L:131.17,
K:146.19,
M:149.21,
F:165.19,
P:115.13,
S:105.09,
T:119.12,
W:204.23,
Y:181.19,
V:117.15
};

let length = seq.length;

let molecularWeight = 0;

let composition = {};

for(let aa in aaWeights){
composition[aa]=0;
}

for(let char of seq){

if(aaWeights[char]){

molecularWeight += aaWeights[char];

composition[char]++;
}
}

let hydrophobic =
composition['A']
+composition['V']
+composition['I']
+composition['L']
+composition['M']
+composition['F']
+composition['W'];

let aromatic =
composition['F']
+composition['W']
+composition['Y'];

let html = "";

html += "<h2>Results</h2>";

html += "<p><b>Length:</b> "
+ length + "</p>";

html += "<p><b>Molecular Weight:</b> "
+ molecularWeight.toFixed(2)
+ " Da</p>";

html += "<p><b>Hydrophobic Residues:</b> "
+ hydrophobic + "</p>";

html += "<p><b>Aromatic Residues:</b> "
+ aromatic + "</p>";

html += "<h3>Amino Acid Composition</h3>";

html += "<table border='1' cellpadding='5'>";

html += "<tr><th>AA</th><th>Count</th><th>%</th></tr>";

for(let aa in composition){

let percent =
((composition[aa]/length)*100)
.toFixed(2);

html +=
`<tr>
<td>${aa}</td>
<td>${composition[aa]}</td>
<td>${percent}</td>
</tr>`;
}

html += "</table>";

document.getElementById("results")
.innerHTML = html;
}