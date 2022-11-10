export const uangRupiah = (nilai) => {
    let formasi = Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    });

    return formasi.format(nilai);
}