import mongoose from "mongoose";

const pengajuanKlaim = mongoose.model("Onprosses_pengajuan_klaim", {
  no_polis: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  no_klaim: {
    type: String,
    required: true,
    unique: true,
  },
  sob: {
    type: String,
    required: true,
  },
  plat_nomor: {
    type: String,
    required: true,
  },
  tsi: {
    type: String,
    required: true,
  },
  dol: {
    type: Date,
    required: true,
  },
  estimasi_awal: {
    type: String,
    required: false,
  },
  reserve_amt: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  keterangan: {
    type: String,
    required: false,
  },
});

const claimClosed = mongoose.model("Onprosses_claim_closed", {
  no_polis: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  no_klaim: {
    type: String,
    required: true,
    unique: true,
  },
  sob: {
    type: String,
    required: true,
  },
  plat_nomor: {
    type: String,
    required: true,
  },
  tsi: {
    type: String,
    required: true,
  },
  dol: {
    type: Date,
    required: true,
  },
  estimasi_awal: {
    type: String,
    required: false,
  },
  reserve_amt: {
    type: String,
    required: true,
  },
  status: {
    type: [String],
    required: true,
  },
  keterangan: {
    type: String,
    required: false,
  },
  keterangan_claimclosed: {
    type: String,
    required: true,
  },
  investigator: {
    type: String,
  },
  branch: {
    type: String,
  },
  tanggal_kirim_surat: {
    type: Date,
  },
  nomor_kirim_surat: {
    type: String,
  },
  aging: {
    type: String,
  },
});

const investigasi = mongoose.model("investigasi", {
  no_polis: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  no_klaim: {
    type: String,
    required: true,
    unique: true,
  },
  sob: {
    type: String,
  },
  plat_nomor: {
    type: String,
    required: true,
  },
  tsi: {
    type: String,
    required: true,
  },
  dol: {
    type: Date,
    required: true,
  },
  estimasi_awal: {
    type: String,
    required: false,
  },
  reserve_amt: {
    type: String,
    required: true,
  },
  investigator: {
    type: String,
    required: true,
  },
  tanggal_kirim_surat: {
    type: Date,
    required: true,
  },
  nomor_kirim_surat: {
    type: String,
    required: true,
  },
  follow_up_1: {
    type: Date,
    required: false,
  },
  follow_up_2: {
    type: Date,
    required: false,
  },
  follow_up_3: {
    type: Date,
    required: false,
  },
  follow_up_4: {
    type: Date,
    required: false,
  },
  keterangan: {
    type: String,
    required: false,
  },
  aging: {
    type: Number,
  },
  status: {
    type: [String],
    require: true,
  },
});

const hasilInvestigasi = mongoose.model("hasil_investigasi", {
  no_polis: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  no_klaim: {
    type: String,
    required: true,
    unique: true,
  },
  sob: {
    type: String,
  },
  plat_nomor: {
    type: String,
    required: true,
  },
  tsi: {
    type: String,
    required: true,
  },
  dol: {
    type: Date,
    required: true,
  },
  estimasi_awal: {
    type: String,
    required: false,
  },
  reserve_amt: {
    type: String,
    required: true,
  },
  investigator: {
    type: String,
    required: true,
  },
  tanggal_kirim_surat: {
    type: Date,
    required: true,
  },
  nomor_kirim_surat: {
    type: String,
    required: true,
  },
  follow_up_1: {
    type: Date,
    required: false,
  },
  follow_up_2: {
    type: Date,
    required: false,
  },
  follow_up_3: {
    type: Date,
    required: false,
  },
  follow_up_4: {
    type: Date,
    required: false,
  },
  tanggal_terima_lhs: {
    type: Date,
    required: true,
  },
  tanggal_terima_invoice: {
    type: Date,
    required: false,
  },
  hasil_investigasi: {
    type: String,
    required: true,
  },
  status_claim: {
    type: String,
    required: false,
  },
  biaya_akomodasi: {
    type: String,
    required: false,
  },
  success_fee: {
    type: String,
    required: false,
  },
  total_tagihan: {
    type: String,
    required: false,
  },
  status_payment: {
    type: String,
    required: false,
  },
  tanggal_payment: {
    type: Date,
    required: false,
  },
  pdv: {
    type: String,
    required: false,
  },
  keterangan: {
    type: String,
    required: false,
  },
  aging_investigasi: {
    type: Number,
  },
  aging_payment: {
    type: Number,
  },
  status: {
    type: [String],
    require: true,
  },
});

const pengajuanSPK = mongoose.model("pengajuanSPK", {
  no_polis: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  no_klaim: {
    type: String,
    required: true,
    unique: true,
  },
  sob: {
    type: String,
    required: true,
  },
  plat_nomor: {
    type: String,
    required: true,
  },
  tsi: {
    type: String,
    required: true,
  },
  dol: {
    type: Date,
    required: true,
  },
  estimasi_awal: {
    type: String,
    required: false,
  },
  reserve_amt: {
    type: String,
    required: true,
  },
  tanggal_kirim_spk: {
    type: Date,
    required: false,
  },
  status: {
    type: [String],
    require: true,
  },
  keterangan: {
    type: String,
    required: false,
  },
});

const pengajuanSPKCtl = mongoose.model("pengajuanSPKCtl", {
  no_polis: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  no_klaim: {
    type: String,
    required: true,
    unique: true,
  },
  sob: {
    type: String,
    required: true,
  },
  plat_nomor: {
    type: String,
    required: true,
  },
  tsi: {
    type: String,
    required: true,
  },
  dol: {
    type: Date,
    required: true,
  },
  estimasi_awal: {
    type: String,
    required: false,
  },
  reserve_amt: {
    type: String,
    required: true,
  },
  tanggal_kirim_spk: {
    type: Date,
    required: true,
  },
  tanggal_kirim_spk_ctl: {
    type: Date,
    required: true,
  },
  nilai_penggantian: {
    type: String,
    required: false,
  },
  nilai_salvage: {
    type: String,
    required: false,
  },
  nett_klaim: {
    type: String,
    required: false,
  },
  status: {
    type: [String],
    require: true,
  },
  keterangan: {
    type: String,
    required: false,
  },
});

const pengajuanSPKAtl = mongoose.model("pengajuanSPKAtl", {
  no_polis: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  no_klaim: {
    type: String,
    required: true,
    unique: true,
  },
  sob: {
    type: String,
    required: true,
  },
  plat_nomor: {
    type: String,
    required: true,
  },
  tsi: {
    type: String,
    required: true,
  },
  dol: {
    type: Date,
    required: true,
  },
  estimasi_awal: {
    type: String,
    required: false,
  },
  reserve_amt: {
    type: String,
    required: true,
  },
  tanggal_kirim_spk: {
    type: Date,
    required: true,
  },
  tanggal_kirim_spk_atl: {
    type: Date,
    required: true,
  },
  nilai_penggantian: {
    type: String,
    required: false,
  },
  status: {
    type: [String],
    require: true,
  },
  keterangan: {
    type: String,
    required: false,
  },
});

const pengajuanSPKPartial = mongoose.model("pengajuanSPKPartial", {
  no_polis: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  no_klaim: {
    type: String,
    required: true,
    unique: true,
  },
  sob: {
    type: String,
    required: true,
  },
  plat_nomor: {
    type: String,
    required: true,
  },
  tsi: {
    type: String,
    required: true,
  },
  dol: {
    type: Date,
    required: true,
  },
  estimasi_awal: {
    type: String,
    required: false,
  },
  reserve_amt: {
    type: String,
    required: true,
  },
  tanggal_kirim_spk: {
    type: Date,
    required: true,
  },
  tanggal_kirim_spk_partial: {
    type: Date,
    required: true,
  },
  status: {
    type: [String],
    require: true,
  },
  keterangan: {
    type: String,
    required: false,
  },
  nilai_spk: {
    type: String,
    required: false,
  },
  amount: {
    type: String,
    required: false,
  },
  presentase: {
    type: String,
    required: false,
  },
});

const doneSuratTolak = mongoose.model("Done_surat_tolak", {
  no_polis: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  no_klaim: {
    type: String,
    required: true,
    unique: true,
  },
  sob: {
    type: String,
    required: true,
  },
  plat_nomor: {
    type: String,
    required: true,
  },
  tsi: {
    type: String,
    required: true,
  },
  dol: {
    type: Date,
    required: true,
  },
  estimasi_awal: {
    type: String,
    required: false,
  },
  reserve_amt: {
    type: String,
    required: true,
  },
  status: {
    type: [String],
    required: true,
  },
  status_done_surat_tolak: {
    type: String,
    required: true,
  },
  keterangan: {
    type: String,
    required: false,
  },
  keterangan_claimclosed: {
    type: String,
    required: true,
  },
  tanggal_terima_surat_tolak: {
    type: Date,
    required: true,
  },
  ddc: {
    type: Date,
    required: true,
  },
  investigator: {
    type: String,
  },
  branch: {
    type: String,
  },
  tanggal_kirim_surat: {
    type: Date,
  },
  nomor_kirim_surat: {
    type: String,
  },
  keterangan: {
    type: String,
  },
  aging: {
    type: String,
  },
  no_surat_tolak: {
    type: String,
  },
});

const finalClosed = mongoose.model("final_closed", {
  no_polis: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  no_klaim: {
    type: String,
    required: true,
    unique: true,
  },
  sob: {
    type: String,
    required: true,
  },
  plat_nomor: {
    type: String,
    required: true,
  },
  tsi: {
    type: String,
    required: true,
  },
  dol: {
    type: Date,
    required: true,
  },
  estimasi_awal: {
    type: String,
    required: false,
  },
  reserve_amt: {
    type: String,
    required: true,
  },
  status: {
    type: [String],
    required: true,
  },
  status_done_surat_tolak: {
    type: String,
    required: true,
  },
  keterangan: {
    type: String,
    required: false,
  },
  keterangan_claimclosed: {
    type: String,
    required: true,
  },
  tanggal_terima_surat_tolak: {
    type: Date,
    required: true,
  },
  ddc: {
    type: Date,
    required: true,
  },
  investigator: {
    type: String,
  },
  branch: {
    type: String,
  },
  tanggal_kirim_surat: {
    type: Date,
  },
  nomor_kirim_surat: {
    type: String,
  },
  keterangan: {
    type: String,
  },
  aging: {
    type: String,
  },
});

const spgrlod = mongoose.model("spgrlod", {
  no_polis: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  no_klaim: {
    type: String,
    required: true,
    unique: true,
  },
  sob: {
    type: String,
    required: true,
  },
  plat_nomor: {
    type: String,
    required: true,
  },
  tsi: {
    type: String,
    required: true,
  },
  dol: {
    type: Date,
    required: true,
  },
  estimasi_awal: {
    type: String,
    required: false,
  },
  reserve_amt: {
    type: String,
    required: true,
  },
  tanggal_kirim_spk: {
    type: Date,
    required: true,
  },
  tanggal_kirim_spk_ctl: {
    type: Date,
    required: false,
  },
  tanggal_kirim_spk_atl: {
    type: Date,
    required: false,
  },
  nilai_penggantian: {
    type: String,
    required: false,
  },
  nilai_salvage: {
    type: String,
    required: false,
  },
  nett_klaim: {
    type: String,
    required: false,
  },
  status: {
    type: [String],
    require: true,
  },
  keterangan: {
    type: String,
    required: false,
  },
});

const doneSpgrPayment = mongoose.model("doneSpgrPayment", {
  no_polis: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  no_klaim: {
    type: String,
    required: true,
    unique: true,
  },
  sob: {
    type: String,
    required: true,
  },
  plat_nomor: {
    type: String,
    required: true,
  },
  tsi: {
    type: String,
    required: true,
  },
  dol: {
    type: Date,
    required: true,
  },
  estimasi_awal: {
    type: String,
    required: false,
  },
  reserve_amt: {
    type: String,
    required: true,
  },
  tanggal_kirim_spk: {
    type: Date,
    required: true,
  },
  tanggal_kirim_spk_ctl: {
    type: Date,
    required: false,
  },
  tanggal_kirim_spk_atl: {
    type: Date,
    required: false,
  },
  tanggal_kirim_spgr: {
    type: Date,
    required: true,
  },
  no_surat_spgr: {
    type: String,
    required: true,
  },
  tanggal_feedback: {
    type: Date,
    required: false,
  },
  tanggal_payment: {
    type: Date,
    required: false,
  },
  pdv: {
    type: String,
    required: false,
  },
  status_payment: {
    type: String,
    required: false,
  },
  nilai_penggantian: {
    type: String,
    required: false,
  },
  nilai_salvage: {
    type: String,
    required: false,
  },
  nett_klaim: {
    type: String,
    required: false,
  },
  status: {
    type: [String],
    require: true,
  },
  keterangan: {
    type: String,
    required: false,
  },
});

const xol = mongoose.model("xol", {
  no_polis: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  no_klaim: {
    type: String,
    required: true,
    unique: true,
  },
  sob: {
    type: String,
    required: true,
  },
  plat_nomor: {
    type: String,
    required: true,
  },
  tsi: {
    type: String,
    required: true,
  },
  dol: {
    type: Date,
    required: true,
  },
  estimasi_awal: {
    type: String,
    required: false,
  },
  reserve_amt: {
    type: String,
    required: true,
  },
  status: {
    type: [String],
    required: true,
  },
  status_xol: {
    type: String,
    required: false,
  },
  keterangan: {
    type: String,
    required: false,
  },
  tanggal_kirim_reas: {
    type: Date,
    required: true,
  },
  our_share: {
    type: String,
    required: true,
  },
  nilai_salvage: {
    type: String,
    required: false,
  },
  nett_klaim: {
    type: String,
    required: false,
  },
  or: {
    type: String,
    required: false,
  },
  selisih: {
    type: Number,
    required: false,
  },
});
const fob = mongoose.model("fob", {
  no_polis: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  no_klaim: {
    type: String,
    required: true,
    unique: true,
  },
  sob: {
    type: String,
    required: true,
  },
  plat_nomor: {
    type: String,
    required: true,
  },
  tsi: {
    type: String,
    required: true,
  },
  dol: {
    type: Date,
    required: true,
  },
  estimasi_awal: {
    type: String,
    required: false,
  },
  reserve_amt: {
    type: String,
    required: true,
  },
  status: {
    type: [String],
    required: true,
  },
  status_fob: {
    type: String,
    required: false,
  },
  keterangan: {
    type: String,
    required: false,
  },
  tanggal_kirim_reas: {
    type: Date,
    required: true,
  },
  our_share: {
    type: String,
    required: true,
  },
  or: {
    type: String,
    required: false,
  },
  fob: {
    type: String,
    required: false,
  },
});

const coins = mongoose.model("coins", {
  no_polis: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  no_klaim: {
    type: String,
    required: true,
    unique: true,
  },
  sob: {
    type: String,
    required: true,
  },
  plat_nomor: {
    type: String,
    required: true,
  },
  tsi: {
    type: String,
    required: true,
  },
  dol: {
    type: Date,
    required: true,
  },
  estimasi_awal: {
    type: String,
    required: false,
  },
  reserve_amt: {
    type: String,
    required: true,
  },
  status: {
    type: [String],
    required: true,
  },
  status_coins: {
    type: String,
    required: false,
  },
  keterangan: {
    type: String,
    required: false,
  },
  tanggal_kirim_reas: {
    type: Date,
    required: true,
  },
  our_share: {
    type: String,
    required: true,
  },
  or: {
    type: String,
    required: false,
  },
  coins: {
    type: String,
    required: false,
  },
});

const deleteBucket = mongoose.model("delete_bucket", {
  no_klaim: {
    type: String,
    required: true,
    unique: true,
  },
  alasan: {
    type: String,
    required: true,
  },
});

const user = mongoose.model("user", {
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export { pengajuanKlaim, claimClosed, investigasi, pengajuanSPK, doneSuratTolak, pengajuanSPKPartial, pengajuanSPKCtl, spgrlod, pengajuanSPKAtl, doneSpgrPayment, finalClosed, hasilInvestigasi, xol, fob, coins, deleteBucket, user };
