function analyzeProtein() {

    let seq = document.getElementById("sequence")
        .value
        .toUpperCase();

    // Remove FASTA header lines
    seq = seq.replace(/^>.*$/gm, '');

    // Remove spaces and line breaks
    seq = seq.replace(/\s/g, '');

    // Validate sequence
    if (!/^[ARNDCQEGHILKMFPSTWYV]+$/.test(seq)) {
        alert("Invalid Protein Sequence");
        return;
    }

    const aaWeights = {
        A: 89.09,
        R: 174.20,
        N: 132.12,
        D: 133.10,
        C: 121.15,
        Q: 146.15,
        E: 147.13,
        G: 75.07,
        H: 155.16,
        I: 131.17,
        L: 131.17,
        K: 146.19,
        M: 149.21,
        F: 165.19,
        P: 115.13,
        S: 105.09,
        T: 119.12,
        W: 204.23,
        Y: 181.19,
        V: 117.15
    };

    let length = seq.length;
    let molecularWeight = 0;

    let composition = {};

    for (let aa in aaWeights) {
        composition[aa] = 0;
    }

    for (let aa of seq) {
        molecularWeight += aaWeights[aa];
        composition[aa]++;
    }

    let hydrophobic =
        composition["A"] +
        composition["V"] +
        composition["I"] +
        composition["L"] +
        composition["M"] +
        composition["F"] +
        composition["W"];

    let aromatic =
        composition["F"] +
        composition["W"] +
        composition["Y"];

    let html = `
        <h2>Analysis Results</h2>
        <p><strong>Sequence Length:</strong> ${length}</p>
        <p><strong>Molecular Weight:</strong> ${molecularWeight.toFixed(2)} Da</p>
        <p><strong>Hydrophobic Residues:</strong> ${hydrophobic}</p>
        <p><strong>Aromatic Residues:</strong> ${aromatic}</p>

        <h3>Amino Acid Composition</h3>
        <table border="1" cellpadding="5">
        <tr>
            <th>Amino Acid</th>
            <th>Count</th>
            <th>Percentage</th>
        </tr>
    `;

    for (let aa in composition) {
        let percent =
            ((composition[aa] / length) * 100).toFixed(2);

        html += `
            <tr>
                <td>${aa}</td>
                <td>${composition[aa]}</td>
                <td>${percent}%</td>
            </tr>
        `;
    }

    html += "</table>";

    document.getElementById("results").innerHTML = html;
}
