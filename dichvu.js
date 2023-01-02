// Khai báo thư viện http
const http = require("http");
// Khai báo thư viện xử lý tập tin
const fs = require("fs");
const nodemailer = require('nodemailer');
// Khai báo cổng
const port = process.env.PORT || 8001;
// MongoDB
const mongo_db = require("mongodb");
const sendMail = require("./sendMail");
const MongoClient = mongo_db.MongoClient;
const dbName = 'js279';
const uri = `mongodb+srv://hv:vominhduc123@cluster0.zssl6ez.mongodb.net/test`;

// Xây dựng Service
const dichvu = http.createServer((req, res) => {
    let method = req.method;
    let url = req.url;
    console.log(url)
    let kq = `Server NodeJS - Method:${method} - Url:${url}`;
    // Cấp quyền
    res.setHeader("Access-Control-Allow-Origin", '*');
    if (method == "GET") {
        if (url == "/dsHocsinh") {
            MongoClient.connect(uri)
                .then(client => {
                    client.db(dbName).collection("dsHocsinh").find().toArray()
                        .then(result => {
                            kq = JSON.stringify(result);
                            client.close();
                            res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                            res.end(kq)
                        }).catch(err => {
                            console.log(err)
                        })
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else if (url == "/dsTivi") {
            MongoClient.connect(uri)
                .then(client => {
                    client.db(dbName).collection("Tivi").find().toArray()
                        .then(result => {
                            kq = JSON.stringify(result);
                            client.close();
                            res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                            res.end(kq);
                        }).catch(err => {
                            console.log(err)
                        })
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else if (url == "/dsDienthoai") {
            MongoClient.connect(uri)
                .then(client => {
                    client.db(dbName).collection("Dien_thoai").find().toArray()
                        .then(result => {
                            kq = JSON.stringify(result);
                            client.close();
                            res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                            res.end(kq)
                        }).catch(err => {
                            console.log(err)
                        })
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else if (url == "/dsMathang") {
            MongoClient.connect(uri)
                .then(client => {
                    client.db(dbName).collection("Mat_hang").find().toArray()
                        .then(result => {
                            kq = JSON.stringify(result);
                            client.close();
                            res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                            res.end(kq)
                        }).catch(err => {
                            console.log(err)
                        })
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else if (url == "/dsNguoidung") {
            MongoClient.connect(uri)
                .then(client => {
                    client.db(dbName).collection("Nguoi_dung").find().toArray()
                        .then(result => {
                            kq = JSON.stringify(result);
                            client.close();
                            res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                            res.end(kq)
                        }).catch(err => {
                            console.log(err)
                        })
                }).catch(err => {
                    console.log(err)
                })
        }
        else if (url == "/Cuahang") {
            console.log("hello")
            MongoClient.connect(uri)
                .then(client => {
                    client.db(dbName).collection("Cua_hang").findOne()
                        .then(result => {
                            kq = JSON.stringify(result);
                            client.close();
                            res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                            res.end(kq)
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }).catch(err => {
                    console.log(err)
                })
        }
        else if (url.match("\.png$")) {
            let imagePath = `images/${url}`;
            if (!fs.existsSync(imagePath)) {
                imagePath = `images/noImage.png`;
            }
            let fileStream = fs.createReadStream(imagePath);
            res.writeHead(200, { "Content-Type": "image/png" });
            fileStream.pipe(res);
        }
        else {
            kq = `Không tìm thấy ${url}`
            res.end(kq)
        }
    }
    else if (method == "POST") {
        let noi_dung_nhan = ``;
        // Nhận thông tin gởi gán vào biến noi_dung_nhan
        req.on("data", (data) => {
            noi_dung_nhan += data;
            console.log(noi_dung_nhan)
        })
        // Xử lý thông tin nhận và trả kết quả lại cho client
        if (url == "/ThemUser") {
            req.on("end", () => {
                let kq = noi_dung_nhan;
                res.end(kq);
            })
        }
        else if (url == "/Dangnhap") {
            req.on("end", () => {
                let kq = {
                    noi_dung: true
                };
                let user = JSON.parse(noi_dung_nhan);
                // Read File Nguoi_dung
                let strJSON = fs.readFileSync("./dulieu/Nguoi_dung.json");
                let arr = JSON.parse(strJSON);
                let vt = arr.findIndex(item => item.Ten_Dang_nhap == user.Ten_Dang_nhap && item.Mat_khau == user.Mat_khau);
                if (vt == -1) {
                    kq.noi_dung = false
                }
                res.end(JSON.stringify(kq));
            })
        }
        else if (url == "/sendMail") {
            // console.log(1)
            req.on("end", function () {
                let thongTin = JSON.parse(noi_dung_nhan);
                let Ket_qua = { "Noi_dung": true };
                let from = `ducvominh706@gmail.com`;
                let to = `${thongTin.email}`;
                let subject = "Cửa hàng thu trân";
                let body = thongTin.body
                sendMail.Goi_Thu_Lien_he(from, to, subject, body).then(result => {
                    // console.log(result);
                    res.end(JSON.stringify(Ket_qua));
                }).catch(err => {
                    // console.log(err);
                    Ket_qua.Noi_dung = false;
                    res.end(JSON.stringify(Ket_qua));
                })
            })
        } else if (url == "/contact") {
            req.on("end", function () {
                let thongTin = JSON.parse(noi_dung_nhan);
                let Ket_qua = { "Noi_dung": true };
                // let from = thongTin.email + "-" + thongTin.name;
                let from = "";
                let to = `ducvominh706@gmail.com`;
                let subject = thongTin.email + "-" + thongTin.title;
                let body = `<h1>${thongTin.name}</h1>` + '<br>' + thongTin.body
                sendMail.Goi_Thu_Lien_he(from, to, subject, body).then(result => {
                    // console.log(result);
                    res.end(JSON.stringify(Ket_qua));
                }).catch(err => {
                    // console.log(err);
                    Ket_qua.Noi_dung = false;
                    res.end(JSON.stringify(Ket_qua));
                })
            })
        }
        else {
            kq = `Method: ${method} - Chưa xét URL ${url}`
            res.end(kq)
        }

    }
    else {
        res.end(kq);
    }
})
// Dịch vụ lắng nghe tại cổng nào
dichvu.listen(port, () => {
    console.log(`Server Run.. http://localhost:${port}`)
})





