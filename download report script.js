function downloadReport()
{
let text =
document.getElementById("results")
.innerText;

let blob =
new Blob([text],
{type:"text/plain"});

let a =
document.createElement("a");

a.href =
URL.createObjectURL(blob);

a.download =
"Protein_Report.txt";

a.click();
}