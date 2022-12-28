// Khai báo thư viện http
const http = require("http");
// Khai báo thư viện xử lý tập tin
const fs = require("fs");
// Khai báo cổng
const port = 8080;
// MongoDB
const mongo_db = require("mongodb");
const MongoClient = mongo_db.MongoClient;
const dbName = 'js279';
const uri = `mongodb+srv://hv:vominhduc123@cluster0.zssl6ez.mongodb.net/test`;

// Xây dựng Service
const dichvu = http.createServer((req, res) => {
    let method = req.method;
    let url = req.url;
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
            // let imagePath = `images/${url}`;
            // if (!fs.existsSync(imagePath)) {
            //     imagePath = `images/noImage.png`;
            // }
            // let fileStream = fs.createReadStream(imagePath);
            // res.writeHead(200, { "Content-Type": "image/png" });
            // fileStream.pipe(res);
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





