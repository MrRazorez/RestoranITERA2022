function print(report, data) {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  var today = new Date();
  today =
    String(today.getDate()).padStart(2, "0") +
    " " +
    String(months[today.getMonth()]).padStart(2, "0") +
    " " +
    today.getFullYear();

  var printWindow = window.open();
  printWindow.document.write(
    `
          <html>
                  <head>
                      <title> Print to PDF</title>
                  </head>
              <body>
                <center>
                <h2 style="margin-bottom: 3rem;" >Laporan Penjualan</h2>
                                    
                <table>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>ID</th>
                      <th>Tanggal</th>
                      <th>Pelanggan</th>
                      <th>Total Harga</th>
                      <th>Bayar</th>
                      <th>Kembali</th>
                    </tr>
                  </thead>
                  <tbody>          
      `
  );

  console.log(data);

  report.forEach((e, i) => {
    printWindow.document.write(
      `
      <tr>
        <td>` +
        (i + 1) +
        `</td>
        <td>` +
        e +
        `</td>
        <td>` +
        data[e].date +
        `</td>
        <td>` +
        data[e].customer +
        `</td>
        <td>` +
        data[e].total +
        `</td>
        <td>` +
        data[e].pay +
        `</td>
        <td>` +
        data[e].charge +
        `</td>
      </tr>

      `
    );
  });

  printWindow.document.write(
    `
                </tbody>
                </table>
                </center>

                <div style="display: flex; margin-top: 3rem;" >
                    <div style="margin-left: auto; margin-right: 2rem;" >
                        <div style="margin-bottom: 5rem;" >
                            Bandar Lampung, ` +
      today +
      `
                        </div>
                        <div style="text-align: center;" >
                            (Pemilik Restoran)
                        </div>
                    </div>
                </div>

              </body>
              </html>
              <style>
                    body{
                        padding: 0;
                        margin: 0;
                        padding-inline: 3em;
                    }
                    center{
                        padding-block: 2em;
                    }
                    table, th, td {
                        border:1px solid;
                        border-collapse:collapse;
                        padding:0.3em;
                        text-align: center;
                    }
                    body {
                        align-self:center;
                    }

                    @page {
                        padding: 0;
                        margin: 0;
                    }
                    @print {
                      padding: 0;
                      margin: 0;
                    }
                </style>
          `
  );
  printWindow.document.close();
  printWindow.print();
}

export default print;
