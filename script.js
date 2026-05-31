function analyzeProtein() {

    // Get sequence from textarea
    let seq = document.getElementById("sequence").value.toUpperCase();

    // Remove FASTA headers
    seq = seq.replace(/^>.*$/gm, '');

    // Remove spaces, tabs and line breaks
    seq = seq.replace(/\s/g, '');

    // Check if empty
    if (seq.length === 0) {
        document.getElementById("results").innerHTML =
            "<p style='color:red;'>Please enter a protein sequence.</p>";
        return;
    }

    // Validate protein sequence
    if (!/^[ARNDCQEGHILKMFPSTWYV]+$/.test(seq)) {
        document.getElementById("results").innerHTML =
            "<p style='color:red;'>Invalid protein sequence detected.</p>";
        return;
    }

    // Amino acid molecular weights
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

    // Initialize composition counts
    let composition = {};

    for (let aa in aaWeights) {
        composition[aa] = 0;
    }

    let molecularWeight = 0;

    // Calculate composition and MW
    for (let aa of seq) {

        molecularWeight += aaWeights[aa];

        composition[aa]++;
    }

    let length = seq.length;

    // Hydrophobic residues
    let hydrophobic =
        composition["A"] +
        composition["V"] +
        composition["I"] +
        composition["L"] +
        composition["M"] +
        composition["F"] +
        composition["W"];

    // Aromatic residues
    let aromatic =
        composition["F"] +
        composition["W"] +
        composition["Y"];

    // Create output
    let html = "";

    html += "<h2>Protein Analysis Results</h2>";

    html += "<p><b>Sequence Length:</b> " +
        length + "</p>";

    html += "<p><b>Molecular Weight:</b> " +
        molecularWeight.toFixed(2) +
        " Da</p>";

    html += "<p><b>Hydrophobic Residues:</b> " +
        hydrophobic + "</p>";

    html += "<p><b>Aromatic Residues:</b> " +
        aromatic + "</p>";

    html += "<h3>Amino Acid Composition</h3>";

    html += "<table border='1' cellpadding='6' cellspacing='0'>";

    html += "<tr>";
    html += "<th>Amino Acid</th>";
    html += "<th>Count</th>";
    html += "<th>Percentage (%)</th>";
    html += "</tr>";

    for (let aa in composition) {

        let percent =
            ((composition[aa] / length) * 100)
            .toFixed(2);

        html += "<tr>";
        html += "<td>" + aa + "</td>";
        html += "<td>" + composition[aa] + "</td>";
        html += "<td>" + percent + "%</td>";
        html += "</tr>";
    }

    html += "</table>";

    // Display output
    document.getElementById("results").innerHTML = html;
}