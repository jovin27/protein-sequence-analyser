function analyzeProtein(){

let seq =
document.getElementById("sequence")
.value
.toUpperCase();

seq = seq.replace(/^>.*$/gm,'');
seq = seq.replace(/\s/g,'');

if(seq.length===0){

document.getElementById("results").innerHTML=
"<h2>Please enter a sequence.</h2>";

return;
}

document.getElementById("results").innerHTML=
`
<h2>Analysis Results</h2>

<div class="result-card">
<b>Sequence Length:</b> ${seq.length}
</div>

<div class="result-card">
<b>Sequence:</b><br>
${seq}
</div>
`;
}
