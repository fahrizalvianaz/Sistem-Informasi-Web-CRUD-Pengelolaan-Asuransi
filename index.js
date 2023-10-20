import express from "express";
import bodyParser from "body-parser";
import expressEjsLayouts from "express-ejs-layouts";
import "./utils/db.js";
import { pengajuanKlaim, claimClosed, investigasi, pengajuanSPK, doneSuratTolak, pengajuanSPKPartial, pengajuanSPKCtl, pengajuanSPKAtl, spgrlod, doneSpgrPayment, finalClosed, hasilInvestigasi } from "./model/onprosses_pengajuan_klaim.js";
import { body, validationResult } from "express-validator";
import methodOverride from "method-override";
import session from "express-session";
import cookieParser from "cookie-parser";
import flash from "connect-flash";
import cron from "node-cron";
import { WebSocketServer } from "ws";
import http from "http";
import { Server } from "socket.io";

const app = express();
const port = 3000;
const server = http.createServer(app);
const io = new Server(server);

app.set("view engine", "ejs");
app.use(expressEjsLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser("secret"));
app.use(methodOverride("_method"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

// GET
// Halaman Klaim
app.get("/klaim", async (req, res) => {
  const pengajuanklaim = await pengajuanKlaim.find();
  const count = await pengajuanKlaim.countDocuments();
  res.render("klaim/klaim", {
    layout: "layouts/main_layout",
    pengajuanklaim,
    count,
    msg: req.flash("msg"),
  });
});
app.get("/onprosses-claimclosed", async (req, res) => {
  const claimclosed = await claimClosed.find();
  const count = await claimClosed.countDocuments();
  res.render("claim_closed/onprosses_claim_closed", {
    layout: "layouts/main_layout",
    claimclosed,
    count,
    msg: req.flash("msg"),
  });
});
app.get("/final-closed", async (req, res) => {
  const dueDateClosed = await finalClosed.distinct("ddc");
  // res.send(dueDateClosed);
  const data = await finalClosed.find();
  const count = await finalClosed.countDocuments();
  res.render("claim_closed/final_closed", {
    layout: "layouts/main_layout",
    data,
    count,
    dueDateClosed,
    msg: req.flash("msg"),
  });
});
app.get("/onprosses-investigasi", async (req, res) => {
  // const investigator = await investigasi.find();
  const investigatorNames = await investigasi.distinct("investigator");
  const data = await investigasi.find();
  for (const document of data) {
    const tglsebelumValue = new Date(document.tanggal_kirim_surat);
    const tglsekarangValue = new Date();

    const selisihMilidetik = tglsekarangValue - tglsebelumValue;
    const selisihDetik = selisihMilidetik / 1000;
    const selisihMenit = selisihDetik / 60;
    const selisihJam = selisihMenit / 60;
    const selisihHari = selisihJam / 24;
    document.aging = parseInt(selisihHari);
    // document.aging = document.aging +  1;
    await document.save();
  }
  // res.send(data);
  const count = await investigasi.countDocuments();
  res.render("investigasi/onprosses_investigasi", {
    layout: "layouts/main_layout",
    investigatorNames,
    data,
    count,
    msg: req.flash("msg"),
  });
});

app.get("/hasil-investigasi", async (req, res) => {
  // const investigator = await investigasi.find();
  const investigatorNames = await hasilInvestigasi.distinct("investigator");
  const data = await hasilInvestigasi.find();
  // for (const document of data) {
  //   const tglsebelumValue = new Date(document.tanggal_kirim_surat);
  //   const tglsekarangValue = new Date();

  //   const selisihMilidetik = tglsekarangValue - tglsebelumValue;
  //   const selisihDetik = selisihMilidetik / 1000;
  //   const selisihMenit = selisihDetik / 60;
  //   const selisihJam = selisihMenit / 60;
  //   const selisihHari = selisihJam / 24;
  //   document.aging = parseInt(selisihHari);
  //   // document.aging = document.aging +  1;
  //   await document.save();
  // }
  // res.send(data);
  const count = await hasilInvestigasi.countDocuments();
  res.render("investigasi/investigasi_selesei", {
    layout: "layouts/main_layout",
    investigatorNames,
    data,
    count,
    msg: req.flash("msg"),
  });
});

// Halaman Add klaim
app.get("/klaim/tambah-klaim", (req, res) => {
  res.render("klaim/add_klaim", {
    layout: "layouts/second_layout",
  });
});

// Halaman Pengajuan SPK
app.get("/klaim/pengajuan-spk", async (req, res) => {
  const spk = await pengajuanSPK.find();
  const count = await pengajuanSPK.countDocuments();
  res.render("spk/onprosses_pengajuan_spk", {
    layout: "layouts/main_layout",
    spk,
    count,
    msg: req.flash("msg"),
  });
});

// Halaman Pengajuan SPK Partial
app.get("/klaim/spk-partial", async (req, res) => {
  const spkPartial = await pengajuanSPKPartial.find();
  const count = await pengajuanSPKPartial.countDocuments();
  res.render("spk/spk_partial/spk_partial", {
    layout: "layouts/main_layout",
    spkPartial,
    count,
    msg: req.flash("msg"),
  });
});

// Halaman Pengajuan SPK CTL
app.get("/klaim/spk-ctl", async (req, res) => {
  const spkCtl = await pengajuanSPKCtl.find();
  const count = await pengajuanSPKCtl.countDocuments();
  res.render("spk/spk_ctl/spk_ctl", {
    layout: "layouts/main_layout",
    spkCtl,
    count,
    msg: req.flash("msg"),
  });
});

// Halaman Pengajuan SPK ATL
app.get("/klaim/spk-atl", async (req, res) => {
  const spkAtl = await pengajuanSPKAtl.find();
  const count = await pengajuanSPKAtl.countDocuments();
  res.render("spk/spk_atl/spk_atl", {
    layout: "layouts/main_layout",
    spkAtl,
    count,
    msg: req.flash("msg"),
  });
});

// Halaman Pengajuan Done Surat Tolak
app.get("/done-surat-tolak", async (req, res) => {
  const data = await doneSuratTolak.find();
  const count = await doneSuratTolak.countDocuments();
  res.render("claim_closed/done_surat_tolak", {
    layout: "layouts/main_layout",
    data,
    count,
    msg: req.flash("msg"),
  });
});

// Halaman onprosses spgrlod
app.get("/spgrlod/onprosses", async (req, res) => {
  const data = await spgrlod.find();
  const count = await spgrlod.countDocuments();
  res.render("spgrlod/onprosses_spgrlod", {
    layout: "layouts/main_layout",
    data,
    count,
    msg: req.flash("msg"),
  });
});

// Halaman Update Estimasi Klaim
app.get("/klaim/update-estimasi/:_id", async (req, res) => {
  const data = await pengajuanKlaim.findOne({ _id: req.params._id });
  res.render("klaim/update_estimasi_klaim", {
    layout: "layouts/second_layout",
    data,
  });
});

// Halaman Update Estimasi SPK
app.get("/spk/update-estimasi/:_id", async (req, res) => {
  const data = await pengajuanSPK.findOne({ _id: req.params._id });
  // res.send(req.body);
  res.render("spk/update_estimasi_spk", {
    layout: "layouts/second_layout",
    data,
  });
});

// Halaman Update Estimasi Claim Rejecitons
app.get("/claim-rejection/update-estimasi/:_id", async (req, res) => {
  const data = await claimClosed.findOne({ _id: req.params._id });
  // res.send(req.body);
  res.render("claim_closed/update_estimasi_claimrejection", {
    layout: "layouts/second_layout",
    data,
  });
});

// Halaman onprosses pengajuan klaim
app.get("/klaim/:_id", async (req, res) => {
  const klaim = await pengajuanKlaim.findOne({ _id: req.params._id });
  res.render("klaim/onprosses_pengajuan_klaim", {
    layout: "layouts/third_layout",
    klaim,
  });
});

// Halaman pengajuan spk
app.get("/spk/:_id", async (req, res) => {
  const spk = await pengajuanSPK.findOne({ _id: req.params._id });
  res.render("spk/pengajuan_spk", {
    layout: "layouts/third_layout",
    spk,
  });
});

// Halaman onprosses spgrlod
app.get("/spgrlod/done", async (req, res) => {
  const data = await doneSpgrPayment.find();
  const count = await doneSpgrPayment.countDocuments();
  res.render("spgrlod/done_spgrlod_payment", {
    layout: "layouts/main_layout",
    data,
    count,
    msg: req.flash("msg"),
  });
});

// Update klaim
app.put("/update-estimasi-klaim", async (req, res) => {
  await pengajuanKlaim
    .updateOne(
      {
        _id: req.body._id,
      },
      {
        $set: {
          estimasi_awal: req.body.estimasi_awal,
        },
      }
    )
    .then((result) => {
      req.flash("msg", "Data berhasil diubah !");
      res.redirect("/klaim");
    });
});

app.put("/update-keterangan-klaim", async (req, res) => {
  await pengajuanKlaim
    .updateOne(
      {
        _id: req.body._id,
      },
      {
        $set: {
          keterangan: req.body.keterangan,
        },
      }
    )
    .then((result) => {
      req.flash("msg", "Data berhasil diubah !");
      res.redirect("/klaim");
    });
});

// Update estimasi spk
app.put("/update-estimasi-spk", async (req, res) => {
  await pengajuanSPK
    .updateOne(
      {
        _id: req.body._id,
      },
      {
        $set: {
          estimasi_awal: req.body.estimasi_awal,
        },
      }
    )
    .then((result) => {
      req.flash("msg", "Data berhasil diubah !");
      res.redirect("klaim/pengajuan-spk");
    });
});

app.put("/update-keterangan-spk", async (req, res) => {
  await pengajuanSPK
    .updateOne(
      {
        _id: req.body._id,
      },
      {
        $set: {
          keterangan: req.body.keterangan,
        },
      }
    )
    .then((result) => {
      req.flash("msg", "Data berhasil diubah !");
      res.redirect("klaim/pengajuan-spk");
    });
});

// Update estimasi spk partial
app.put("/update-estimasi-spk-partial", async (req, res) => {
  await pengajuanSPKPartial
    .updateOne(
      {
        _id: req.body._id,
      },
      {
        $set: {
          estimasi_awal: req.body.estimasi_awal,
        },
      }
    )
    .then((result) => {
      req.flash("msg", "Data estimasi berhasil diubah !");
      res.redirect("klaim/spk-partial");
    });
});

// Update nett klaim spk partial
app.put("/update-nettklaim-spk-partial", async (req, res) => {
  // res.send(typeof req.body.nett_klaim);
  await pengajuanSPKPartial
    .updateOne(
      {
        _id: req.body._id,
      },
      {
        $set: {
          nett_klaim: req.body.nett_klaim,
        },
      }
    )
    .then((result) => {
      req.flash("msg", "Data net klaim berhasil diubah !");
      res.redirect("klaim/spk-partial");
    });
});

// Update keterangan spk partial
app.put("/update-keterangan-spk-partial", async (req, res) => {
  // res.send(typeof req.body.nett_klaim);
  await pengajuanSPKPartial
    .updateOne(
      {
        _id: req.body._id,
      },
      {
        $set: {
          keterangan: req.body.keterangan,
        },
      }
    )
    .then((result) => {
      req.flash("msg", "Data keterangan berhasil diubah !");
      res.redirect("klaim/spk-partial");
    });
});

// Update estimasi claim rejections
app.put("/update-estimasi-claim-rejection", async (req, res) => {
  await claimClosed
    .updateOne(
      {
        _id: req.body._id,
      },
      {
        $set: {
          estimasi_awal: req.body.estimasi_awal,
        },
      }
    )
    .then((result) => {
      req.flash("msg", "Data berhasil diubah !");
      res.redirect("/onprosses-claimclosed");
    });
});

// Update keterangan claim rejections
app.put("/update-keterangan-claim-rejection", async (req, res) => {
  await claimClosed
    .updateOne(
      {
        _id: req.body._id,
      },
      {
        $set: {
          keterangan_claimclosed: req.body.keterangan_claimclosed,
        },
      }
    )
    .then((result) => {
      req.flash("msg", "Data berhasil diubah !");
      res.redirect("/onprosses-claimclosed");
    });
});

// Update keterangan done surat tolak
app.put("/update-keterangan-done-surat-tolak", async (req, res) => {
  await doneSuratTolak
    .updateOne(
      {
        _id: req.body._id,
      },
      {
        $set: {
          keterangan_claimclosed: req.body.keterangan_claimclosed,
        },
      }
    )
    .then((result) => {
      req.flash("msg", "Data berhasil diubah !");
      res.redirect("/done-surat-tolak");
    });
});

// Update keterangan done surat tolak
app.put("/update-status-done-surat-tolak", async (req, res) => {
  await doneSuratTolak
    .updateOne(
      {
        _id: req.body._id,
      },
      {
        $set: {
          status_done_surat_tolak: req.body.status_done_surat_tolak,
        },
      }
    )
    .then((result) => {
      req.flash("msg", "Data berhasil diubah !");
      res.redirect("/done-surat-tolak");
    });
});

// Update estimasi investigasi
app.put("/update-estimasi-investigasi", async (req, res) => {
  await investigasi
    .updateOne(
      {
        _id: req.body._id,
      },
      {
        $set: {
          estimasi_awal: req.body.estimasi_awal,
        },
      }
    )
    .then((result) => {
      req.flash("msg", "Data berhasil diubah !");
      res.redirect("/onprosses-investigasi");
    });
});

// Update keterangan investigasi
app.put("/update-keterangan-investigasi", async (req, res) => {
  await investigasi
    .updateOne(
      {
        _id: req.body._id,
      },
      {
        $set: {
          keterangan: req.body.keterangan,
        },
      }
    )
    .then((result) => {
      req.flash("msg", "Data berhasil diubah !");
      res.redirect("/onprosses-investigasi");
    });
});

// Update folloup1 investigasi
app.put("/update-followup1-investigasi", async (req, res) => {
  await investigasi
    .updateOne(
      {
        _id: req.body._id,
      },
      {
        $set: {
          follow_up_1: req.body.follow_up_1,
        },
      }
    )
    .then((result) => {
      req.flash("msg", "Data berhasil diubah !");
      res.redirect("/onprosses-investigasi");
    });
});

// Update folloup2 investigasi
app.put("/update-followup2-investigasi", async (req, res) => {
  await investigasi
    .updateOne(
      {
        _id: req.body._id,
      },
      {
        $set: {
          follow_up_2: req.body.follow_up_2,
        },
      }
    )
    .then((result) => {
      req.flash("msg", "Data berhasil diubah !");
      res.redirect("/onprosses-investigasi");
    });
});

// Update folloup2 investigasi
app.put("/update-followup3-investigasi", async (req, res) => {
  await investigasi
    .updateOne(
      {
        _id: req.body._id,
      },
      {
        $set: {
          follow_up_3: req.body.follow_up_3,
        },
      }
    )
    .then((result) => {
      req.flash("msg", "Data berhasil diubah !");
      res.redirect("/onprosses-investigasi");
    });
});

// Update folloup2 investigasi
app.put("/update-followup4-investigasi", async (req, res) => {
  await investigasi
    .updateOne(
      {
        _id: req.body._id,
      },
      {
        $set: {
          follow_up_4: req.body.follow_up_4,
        },
      }
    )
    .then((result) => {
      req.flash("msg", "Data berhasil diubah !");
      res.redirect("/onprosses-investigasi");
    });
});

// Update nilai estimasi spk ctl
app.put("/update-estimasi-spk-ctl", async (req, res) => {
  await spgrlod
    .updateOne(
      {
        no_klaim: req.body.no_klaim,
      },
      {
        $set: {
          estimasi_awal: req.body.estimasi_awal,
        },
      }
    )
    .then(function () {
      pengajuanSPKCtl
        .updateOne(
          {
            no_klaim: req.body.no_klaim,
          },
          {
            $set: {
              estimasi_awal: req.body.estimasi_awal,
            },
          }
        )
        .then((result) => {
          req.flash("msg", "Data berhasil diubah !");
          res.redirect("/klaim/spk-ctl");
        });
    });
});

// Update nilai penggantian spk ctl
app.put("/update-penggantian-spk-ctl", async (req, res) => {
  const nettklaim = parseInt(req.body.nilai_penggantian.replace(/[^0-9]/g, "")) - parseInt(req.body.nilai_salvage.replace(/[^0-9]/g, ""));
  await spgrlod
    .updateOne(
      {
        no_klaim: req.body.no_klaim,
      },
      {
        $set: {
          nilai_penggantian: req.body.nilai_penggantian,
          nett_klaim: nettklaim.toLocaleString(),
        },
      }
    )
    .then(function () {
      pengajuanSPKCtl
        .updateOne(
          {
            no_klaim: req.body.no_klaim,
          },
          {
            $set: {
              nilai_penggantian: req.body.nilai_penggantian,
              nett_klaim: nettklaim.toLocaleString(),
            },
          }
        )
        .then((result) => {
          req.flash("msg", "Data berhasil diubah !");
          res.redirect("/klaim/spk-ctl");
        });
    });
});

// Update nilai salvage spk ctl
app.put("/update-salvage-spk-ctl", async (req, res) => {
  const nettklaim = parseInt(req.body.nilai_penggantian.replace(/[^0-9]/g, "")) - parseInt(req.body.nilai_salvage.replace(/[^0-9]/g, ""));
  await spgrlod
    .updateOne(
      {
        no_klaim: req.body.no_klaim,
      },
      {
        $set: {
          nilai_salvage: req.body.nilai_salvage,
          nett_klaim: nettklaim.toLocaleString(),
        },
      }
    )
    .then(function () {
      pengajuanSPKCtl
        .updateOne(
          {
            no_klaim: req.body.no_klaim,
          },
          {
            $set: {
              nilai_salvage: req.body.nilai_salvage,
              nett_klaim: nettklaim.toLocaleString(),
            },
          }
        )
        .then((result) => {
          req.flash("msg", "Data berhasil diubah !");
          res.redirect("/klaim/spk-ctl");
        });
    });
});

// Update nilai estimasi spk atl
app.put("/update-estimasi-spk-atl", async (req, res) => {
  await spgrlod
    .updateOne(
      {
        no_klaim: req.body.no_klaim,
      },
      {
        $set: {
          estimasi_awal: req.body.estimasi_awal,
        },
      }
    )
    .then(function () {
      pengajuanSPKAtl
        .updateOne(
          {
            no_klaim: req.body.no_klaim,
          },
          {
            $set: {
              estimasi_awal: req.body.estimasi_awal,
            },
          }
        )
        .then((result) => {
          req.flash("msg", "Data berhasil diubah !");
          res.redirect("/klaim/spk-atl");
        });
    });
});

// Update nilai penggantian spk atl
app.put("/update-penggantian-spk-atl", async (req, res) => {
  await spgrlod
    .updateOne(
      {
        no_klaim: req.body.no_klaim,
      },
      {
        $set: {
          nilai_penggantian: req.body.nilai_penggantian,
        },
      }
    )
    .then(function () {
      pengajuanSPKAtl
        .updateOne(
          {
            no_klaim: req.body.no_klaim,
          },
          {
            $set: {
              nilai_penggantian: req.body.nilai_penggantian,
            },
          }
        )
        .then((result) => {
          req.flash("msg", "Data berhasil diubah !");
          res.redirect("/klaim/spk-atl");
        });
    });
});

// Update keterangan spgrlod
app.put("/update-keterangan-spgrlod", async (req, res) => {
  if (req.body.status === "Pengajuan SPK CTL") {
    await spgrlod
      .updateOne(
        {
          no_klaim: req.body.no_klaim,
        },
        {
          $set: {
            keterangan: req.body.keterangan,
          },
        }
      )
      .then(function () {
        pengajuanSPKCtl
          .updateOne(
            {
              no_klaim: req.body.no_klaim,
            },
            {
              $set: {
                keterangan: req.body.keterangan,
              },
            }
          )
          .then((result) => {
            req.flash("msg", "Data berhasil diubah !");
            res.redirect("/spgrlod/onprosses");
          });
      });
  } else {
    await spgrlod
      .updateOne(
        {
          no_klaim: req.body.no_klaim,
        },
        {
          $set: {
            keterangan: req.body.keterangan,
          },
        }
      )
      .then(function () {
        pengajuanSPKAtl
          .updateOne(
            {
              no_klaim: req.body.no_klaim,
            },
            {
              $set: {
                keterangan: req.body.keterangan,
              },
            }
          )
          .then((result) => {
            req.flash("msg", "Data berhasil diubah !");
            res.redirect("/spgrlod/onprosses");
          });
      });
  }
});

// Update tanggal feedback done spgrlod
app.put("/update-tglfeedback-done-spgrlod", async (req, res) => {
  if (req.body.status === "Pengajuan SPK CTL") {
    doneSpgrPayment
      .updateOne(
        {
          no_klaim: req.body.no_klaim,
        },
        {
          $set: {
            tanggal_feedback: req.body.tanggal_feedback,
          },
        }
      )
      .then((result) => {
        req.flash("msg", "Data berhasil diubah !");
        res.redirect("/spgrlod/done");
      });
  } else {
    doneSpgrPayment
      .updateOne(
        {
          no_klaim: req.body.no_klaim,
        },
        {
          $set: {
            tanggal_feedback: req.body.tanggal_feedback,
          },
        }
      )
      .then((result) => {
        req.flash("msg", "Data berhasil diubah !");
        res.redirect("/spgrlod/done");
      });
  }
});

// Update tanggal payment done spgrlod
app.put("/update-tglpayment-done-spgrlod", async (req, res) => {
  if (req.body.status === "Pengajuan SPK CTL") {
    doneSpgrPayment
      .updateOne(
        {
          no_klaim: req.body.no_klaim,
        },
        {
          $set: {
            tanggal_payment: req.body.tanggal_payment,
          },
        }
      )
      .then((result) => {
        req.flash("msg", "Data berhasil diubah !");
        res.redirect("/spgrlod/done");
      });
  } else {
    doneSpgrPayment
      .updateOne(
        {
          no_klaim: req.body.no_klaim,
        },
        {
          $set: {
            tanggal_payment: req.body.tanggal_payment,
          },
        }
      )
      .then((result) => {
        req.flash("msg", "Data berhasil diubah !");
        res.redirect("/spgrlod/done");
      });
  }
});

// Update pdv done spgrlod
app.put("/update-pdv-done-spgrlod", async (req, res) => {
  if (req.body.status === "Pengajuan SPK CTL") {
    doneSpgrPayment
      .updateOne(
        {
          no_klaim: req.body.no_klaim,
        },
        {
          $set: {
            pdv: req.body.pdv,
          },
        }
      )
      .then((result) => {
        req.flash("msg", "Data berhasil diubah !");
        res.redirect("/spgrlod/done");
      });
  } else {
    doneSpgrPayment
      .updateOne(
        {
          no_klaim: req.body.no_klaim,
        },
        {
          $set: {
            pdv: req.body.pdv,
          },
        }
      )
      .then((result) => {
        req.flash("msg", "Data berhasil diubah !");
        res.redirect("/spgrlod/done");
      });
  }
});

// Update status payment done spgrlod
app.put("/update-statuspayment-done-spgrlod", async (req, res) => {
  if (req.body.status === "Pengajuan SPK CTL") {
    doneSpgrPayment
      .updateOne(
        {
          no_klaim: req.body.no_klaim,
        },
        {
          $set: {
            status_payment: req.body.status_payment,
          },
        }
      )
      .then((result) => {
        req.flash("msg", "Data berhasil diubah !");
        res.redirect("/spgrlod/done");
      });
  } else {
    doneSpgrPayment
      .updateOne(
        {
          no_klaim: req.body.no_klaim,
        },
        {
          $set: {
            status_payment: req.body.status_payment,
          },
        }
      )
      .then((result) => {
        req.flash("msg", "Data berhasil diubah !");
        res.redirect("/spgrlod/done");
      });
  }
});

// POST
app.post(
  "/tambah",
  [
    body("no_klaim").custom(async (value) => {
      const duplikat1 = await pengajuanKlaim.findOne({ no_klaim: value });
      const duplikat2 = await claimClosed.findOne({ no_klaim: value });
      const duplikat3 = await investigasi.findOne({ no_klaim: value });
      const duplikat4 = await pengajuanSPK.findOne({ no_klaim: value });
      const duplikat5 = await pengajuanSPKPartial.findOne({ no_klaim: value });
      const duplikat6 = await pengajuanSPKCtl.findOne({ no_klaim: value });
      const duplikat7 = await pengajuanSPKAtl.findOne({ no_klaim: value });
      const duplikat8 = await finalClosed.findOne({ no_klaim: value });
      const duplikat9 = await doneSuratTolak.findOne({ no_klaim: value });
      const duplikat10 = await spgrlod.findOne({ no_klaim: value });
      const duplikat11 = await doneSpgrPayment.findOne({ no_klaim: value });

      if (duplikat1 || duplikat2 || duplikat3 || duplikat4 || duplikat5 || duplikat6 || duplikat7 || duplikat8 || duplikat9 || duplikat10 || duplikat11) {
        throw new Error("No klaim sudah digunakan ");
      } else if (value.length < 15) {
        throw new Error("No klaim kurang dari 14 karakter");
      }
      return true;
    }),
    body("no_polis").custom((value) => {
      if (value.length < 20) {
        throw new Error("Nomor Polis harus terdiri dari  19 karakter");
      }
      return true;
    }),
    body("tsi").custom((value) => {
      const numericValue = parseInt(value.replace("Rp", ""), 10);
      if (isNaN(numericValue)) {
        throw new Error("Mohon isi TSI dengan benar!");
      }
      return true;
    }),
    body("reserve_amt").custom((value) => {
      const numericValue = parseInt(value.replace("Rp", ""), 10);
      if (isNaN(numericValue)) {
        throw new Error("Mohon isi Reserve Amt dengan benar!");
      }
      return true;
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    const value = req.body;

    if (!errors.isEmpty()) {
      res.render("klaim/add_klaim", {
        layout: "layouts/second_layout",
        errors: errors.array(),
        value,
      });
    } else {
      pengajuanKlaim
        .insertMany(req.body)
        .then(function () {
          req.flash("msg", "Data berhasil ditambahkan ke pengajuan klaim !");
          res.redirect("/klaim");
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  }
);

// onprosses claim closed
app.post("/tambah-claim-closed", async (req, res) => {
  // res.send(req.body);
  claimClosed
    .insertMany(req.body)
    .then(function () {
      pengajuanKlaim.deleteOne({ no_klaim: req.body.no_klaim }).then((result) => {
        req.flash("msg", "Data berhasil ditambahkan ke claim closed !");
        res.redirect("/onprosses-claimclosed");
      });
    })
    .catch(function (err) {
      console.log(err);
    });
});

// Investigasi
app.post("/tambah-investigasi", async (req, res) => {
  // res.send(req.body);
  investigasi
    .insertMany(req.body)
    .then(function () {
      pengajuanKlaim.deleteOne({ no_klaim: req.body.no_klaim }).then((result) => {
        req.flash("msg", "Data berhasil ditambahkan ke investigasi !");
        res.redirect("/klaim");
      });
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.post("/tambah-spk", async (req, res) => {
  // res.send(req.body);
  pengajuanSPK
    .insertMany(req.body)
    .then(function () {
      pengajuanKlaim.deleteOne({ no_klaim: req.body.no_klaim }).then((result) => {
        req.flash("msg", "Data berhasil ditambahkan ke pengajuan spk !");
        res.redirect("/klaim/pengajuan-spk");
      });
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.post("/tambah-spk-partial", async (req, res) => {
  // res.send(req.body);
  pengajuanSPKPartial
    .insertMany(req.body)
    .then(function () {
      pengajuanSPK.deleteOne({ no_klaim: req.body.no_klaim }).then((result) => {
        req.flash("msg", "Data berhasil ditambahkan ke pengajuan spk partial !");
        res.redirect("/klaim/spk-partial");
      });
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.post("/tambah-spk-ctl", async (req, res) => {
  // res.send(req.body);
  pengajuanSPKCtl
    .insertMany(req.body)
    .then(function () {
      spgrlod.insertMany(req.body).then(() => {
        pengajuanSPK.deleteOne({ no_klaim: req.body.no_klaim }).then((result) => {
          req.flash("msg", "Data berhasil ditambahkan ke pengajuan spk ctl !");
          res.redirect("/klaim/spk-ctl");
        });
      });
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.post("/tambah-spk-atl", async (req, res) => {
  // res.send(req.body);
  pengajuanSPKAtl
    .insertMany(req.body)
    .then(function () {
      spgrlod.insertMany(req.body).then(() => {
        pengajuanSPK.deleteOne({ no_klaim: req.body.no_klaim }).then((result) => {
          req.flash("msg", "Data berhasil ditambahkan ke pengajuan spk atl !");
          res.redirect("/klaim/spk-ctl");
        });
      });
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.post("/done-surat-tolak", async (req, res) => {
  // res.send(req.body);
  doneSuratTolak
    .insertMany(req.body)
    .then(function () {
      claimClosed.deleteOne({ no_klaim: req.body.no_klaim }).then((result) => {
        req.flash("msg", "Data berhasil ditambahkan ke pengajuan spk !");
        res.redirect("/done-surat-tolak");
      });
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.post("/final-closed", async (req, res) => {
  // res.send(req.body);
  finalClosed
    .insertMany(req.body)
    .then(function () {
      doneSuratTolak.deleteOne({ no_klaim: req.body.no_klaim }).then((result) => {
        req.flash("msg", "Data berhasil ditambahkan ke final closed !");
        res.redirect("/final-closed");
      });
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.post("/claim-rejection/done-surat-tolak/spk", async (req, res) => {
  // res.send(req.body);
  pengajuanSPK
    .insertMany(req.body)
    .then(function () {
      doneSuratTolak.deleteOne({ no_klaim: req.body.no_klaim }).then((result) => {
        req.flash("msg", "Data berhasil ditambahkan ke pengajuan SPK !");
        res.redirect("/klaim/pengajuan-spk");
      });
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.post("/tambah-done-spgrlod", async (req, res) => {
  // res.send(req.body);
  doneSpgrPayment
    .insertMany(req.body)
    .then(function () {
      spgrlod.deleteOne({ no_klaim: req.body.no_klaim }).then((result) => {
        req.flash("msg", "Data berhasil ditambahkan ke pengajuan done SPGR !");
        res.redirect("/spgrlod/done");
      });
    })
    .catch(function (err) {
      console.log(err);
    });
});

// Batal CTL
app.post("/batal-ctl", async (req, res) => {
  // res.send(req.body);
  pengajuanSPK
    .insertMany(req.body)
    .then(function () {
      pengajuanSPKCtl.deleteOne({ no_klaim: req.body.no_klaim }).then((result) => {
        spgrlod.deleteOne({ no_klaim: req.body.no_klaim }).then((result) => {
          doneSpgrPayment.deleteOne({ no_klaim: req.body.no_klaim }).then((result) => {
            req.flash("msg", "Data berhasil ditambahkan ke pengajuan spk !");
            res.redirect("/klaim/pengajuan-spk");
          });
        });
      });
    })
    .catch(function (err) {
      console.log(err);
    });
});

// Delete
app.delete("/delete-klaim", (req, res) => {
  pengajuanKlaim.deleteOne({ no_klaim: req.body.no_klaim }).then((result) => {
    res.redirect("/klaim");
  });
});

// Jadwalkan pembaruan data setiap hari
io.on("connection", async (socket) => {
  const data = await investigasi.find();
  let i = 0;
  cron.schedule("0 0 * * *", async () => {
    for (const document of data) {
      const tglsebelumValue = new Date(document.tanggal_kirim_surat);
      const tglsekarangValue = new Date();

      const selisihMilidetik = tglsekarangValue - tglsebelumValue;
      const selisihDetik = selisihMilidetik / 1000;
      const selisihMenit = selisihDetik / 60;
      const selisihJam = selisihMenit / 60;
      const selisihHari = selisihJam / 24;
      document.aging = parseInt(selisihHari);
      // document.aging = document.aging +  1;
      await document.save();
      console.log("aging : ", document.aging);
    }
    const count = await investigasi.countDocuments();
    console.log(`data dari client${i}`, "jumlah :", count);
    socket.broadcast.emit("message", data, count);
    i++;
  });
  socket.on("error", (err) => {
    console.error("Kesalahan koneksi:", err.message);
  });
});

server.listen(port, () => {
  console.log("Server running on port 3000");
});
