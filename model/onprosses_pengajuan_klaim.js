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
  keterangan: {
    type: String,
    required: true,
  },
  aging: {
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
  nett_klaim: {
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
  keterangan: {
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

export { pengajuanKlaim, claimClosed, investigasi, pengajuanSPK, doneSuratTolak, pengajuanSPKPartial, pengajuanSPKCtl, spgrlod, pengajuanSPKAtl, doneSpgrPayment };
